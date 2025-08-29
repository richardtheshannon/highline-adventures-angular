import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, timer, fromEvent, merge, EMPTY } from 'rxjs';
import { map, switchMap, catchError, startWith, debounceTime, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CalendarEvent, ProcessedEvent, ActivityInfo, GuestInfo, EventStatus } from '../models/event.model';

@Injectable({ providedIn: 'root' })
export class CalendarService {
  private http = inject(HttpClient);
  private apiUrl = 'https://www.googleapis.com/calendar/v3/calendars';
  private lastActivity = Date.now();
  private readonly ACTIVE_POLLING_INTERVAL = 30000; // 30 seconds when active
  private readonly INACTIVE_POLLING_INTERVAL = 300000; // 5 minutes when inactive
  private readonly INACTIVE_THRESHOLD = 300000; // 5 minutes of no activity
  
  private activityRules = [
    { test: 'hike & fly', category: 'hike-fly', displayName: 'Hike & Fly', color: '#a78bfa' },
    { test: 'hike and fly', category: 'hike-fly', displayName: 'Hike & Fly', color: '#a78bfa' },
    { test: 'protea', category: 'protea-tour', displayName: 'Protea Tour', color: '#9333ea' },
    { test: 'adventure course', category: 'adventure-park', displayName: 'Adv. Course', color: '#f6ad55' },
    { test: 'adv. park', category: 'adventure-park', displayName: 'Adv. Park', color: '#f6ad55' },
    { test: 'adventure park', category: 'adventure-park', displayName: 'Adventure Park', color: '#f6ad55' },
    { test: 'skynet', category: 'skynet', displayName: 'SkyNet', color: '#4299e1' },
    { test: 'sky net', category: 'skynet', displayName: 'SkyNet', color: '#4299e1' },
    { test: 'zipline', category: 'zipline', displayName: 'Zipline', color: '#48bb78' },
    { test: 'zip line', category: 'zipline', displayName: 'Zipline', color: '#48bb78' },
    { test: 'ziplining', category: 'zipline', displayName: 'Zipline', color: '#48bb78' }
  ];
  
  getEvents(dateRange?: { startDate: Date, endDate: Date }): Observable<ProcessedEvent[]> {
    const timeMin = dateRange?.startDate || new Date();
    if (!dateRange) timeMin.setHours(0, 0, 0, 0);
    
    const timeMax = dateRange?.endDate || new Date(timeMin.getTime() + 3 * 24 * 60 * 60 * 1000);
    if (dateRange && dateRange.endDate) {
      timeMax.setHours(23, 59, 59, 999);
    }
    
    const url = `${this.apiUrl}/${environment.googleCalendar.calendarId}/events`;
    const params = {
      key: environment.googleCalendar.apiKey,
      timeMin: timeMin.toISOString(),
      timeMax: timeMax.toISOString(),
      singleEvents: 'true',
      orderBy: 'startTime'
    };
    
    return this.http.get<{ items: CalendarEvent[] }>(url, { params }).pipe(
      map(response => (response.items || []).map(event => this.processEvent(event))),
      catchError(error => {
        console.error('Error fetching calendar events:', error);
        return of([]);
      })
    );
  }
  
  startPolling(dateRange?: { startDate: Date, endDate: Date }): Observable<ProcessedEvent[]> {
    // Set up user activity detection
    const userActivity$ = this.setupUserActivityDetection();
    
    return timer(0, this.ACTIVE_POLLING_INTERVAL).pipe(
      tap(() => {
        // Check if we should switch to inactive polling
        const timeSinceActivity = Date.now() - this.lastActivity;
        if (timeSinceActivity > this.INACTIVE_THRESHOLD) {
          // Note: In a real implementation, you'd want to dynamically adjust the timer
          // This simplified version starts with active polling
        }
      }),
      switchMap(() => this.getEvents(dateRange))
    );
  }

  private setupUserActivityDetection(): Observable<any> {
    if (typeof window === 'undefined') return EMPTY;
    
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'];
    const userActivity$ = merge(...events.map(event => fromEvent(window, event)));
    
    return userActivity$.pipe(
      debounceTime(1000),
      tap(() => {
        this.lastActivity = Date.now();
      })
    );
  }

  private getCurrentPollingInterval(): number {
    const timeSinceActivity = Date.now() - this.lastActivity;
    return timeSinceActivity > this.INACTIVE_THRESHOLD 
      ? this.INACTIVE_POLLING_INTERVAL 
      : this.ACTIVE_POLLING_INTERVAL;
  }
  
  private processEvent(event: CalendarEvent): ProcessedEvent {
    const processed: ProcessedEvent = { ...event };
    
    // Always try to extract activity info - if none found, create a default one
    processed.activityInfo = this.getActivityInfo(event.summary);
    
    // If no activity info was extracted, create a fallback
    if (!processed.activityInfo && event.summary && event.summary.trim()) {
      const cleanTitle = event.summary
        .replace(/\d+\s+of\s+\d+/gi, '')
        .replace(/\d{1,2}:\d{2}\s*(am|pm)?/gi, '')
        .trim();
      
      if (cleanTitle) {
        processed.activityInfo = {
          category: 'general-activity',
          filterName: cleanTitle,
          specificName: cleanTitle,
          displayName: cleanTitle,
          color: '#6b7280' // Gray for unrecognized activities
        };
      }
    }
    
    processed.guests = this.parseGuests(event.description);
    processed.status = this.getEventStatus(event.start.dateTime, event.end.dateTime);
    
    // Extract capacity from event title
    const capacityMatch = event.summary.match(/(\d+)\s+of\s+(\d+)/);
    if (capacityMatch) {
      processed.currentCapacity = parseInt(capacityMatch[1], 10);
      processed.maxCapacity = parseInt(capacityMatch[2], 10);
    }
    
    return processed;
  }
  
  private getActivityInfo(summary: string): ActivityInfo | undefined {
    const lowerSummary = summary.toLowerCase();
    
    // First, check against predefined activity rules
    for (const rule of this.activityRules) {
      if (lowerSummary.includes(rule.test)) {
        return {
          category: rule.category,
          filterName: rule.displayName,
          specificName: rule.displayName,
          displayName: rule.displayName,
          color: rule.color
        };
      }
    }
    
    // If no predefined rule matches, extract activity name from the title
    // Remove capacity info (e.g., "5 of 10") and time patterns
    let activityName = summary
      .replace(/\d+\s+of\s+\d+/gi, '') // Remove "X of Y" patterns
      .replace(/\d{1,2}:\d{2}\s*(am|pm)?/gi, '') // Remove time patterns
      .replace(/\s*-\s*$/, '') // Remove trailing dashes
      .replace(/^\s*-\s*/, '') // Remove leading dashes
      .trim();
    
    // Check for common event patterns and extract meaningful activity names
    if (activityName) {
      // Handle special cases for better naming
      if (lowerSummary.includes('bike night')) {
        return {
          category: 'bike-night',
          filterName: 'Bike Night',
          specificName: 'Bike Night',
          displayName: 'Bike Night',
          color: '#10b981' // Green color for bike night
        };
      }
      
      if (lowerSummary.includes('private') && lowerSummary.includes('tour')) {
        return {
          category: 'private-tour',
          filterName: 'Private Tour',
          specificName: activityName,
          displayName: 'Private Tour',
          color: '#f56565'
        };
      }
      
      if (lowerSummary.includes('private event')) {
        return {
          category: 'private-event',
          filterName: 'Private Event',
          specificName: activityName,
          displayName: 'Private Event',
          color: '#ec4899' // Pink for private events
        };
      }
      
      if (lowerSummary.includes('group tour')) {
        return {
          category: 'group-tour',
          filterName: 'Group Tour',
          specificName: activityName,
          displayName: 'Group Tour',
          color: '#8b5cf6' // Purple for group tours
        };
      }
      
      if (lowerSummary.includes('birthday') || lowerSummary.includes('party')) {
        return {
          category: 'party',
          filterName: 'Party/Event',
          specificName: activityName,
          displayName: 'Party/Event',
          color: '#f59e0b' // Amber for parties
        };
      }
      
      if (lowerSummary.includes('corporate') || lowerSummary.includes('team building')) {
        return {
          category: 'corporate',
          filterName: 'Corporate Event',
          specificName: activityName,
          displayName: 'Corporate Event',
          color: '#6366f1' // Indigo for corporate
        };
      }
      
      // Default case: Use the cleaned activity name as-is
      // Generate a color based on the string hash for consistency
      const hashCode = activityName.split('').reduce((acc, char) => {
        return char.charCodeAt(0) + ((acc << 5) - acc);
      }, 0);
      
      const colors = [
        '#ef4444', '#f97316', '#f59e0b', '#eab308', '#84cc16',
        '#22c55e', '#10b981', '#14b8a6', '#06b6d4', '#0ea5e9',
        '#3b82f6', '#6366f1', '#8b5cf6', '#a855f7', '#d946ef',
        '#ec4899', '#f43f5e'
      ];
      
      const colorIndex = Math.abs(hashCode) % colors.length;
      
      // Create a properly formatted display name
      const displayName = activityName
        .split(/\s+/)
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
      
      return {
        category: activityName.toLowerCase().replace(/\s+/g, '-'),
        filterName: displayName,
        specificName: activityName,
        displayName: displayName,
        color: colors[colorIndex]
      };
    }
    
    return undefined;
  }
  
  private parseGuests(description?: string): GuestInfo {
    if (!description) return { guests: [], total: 0, active: 0 };
    
    const lines = description.split('\n');
    const guests: any[] = [];
    let total = 0;
    let active = 0;
    
    for (let line of lines) {
      line = line.trim();
      if (line.startsWith('===') || line === '') continue;
      
      const countMatch = line.match(/^(\d+)x\s+/);
      if (!countMatch) continue;
      
      const count = parseInt(countMatch[1], 10);
      const isCancelled = line.toUpperCase().includes('CANCELLED');
      let name = line.substring(countMatch[0].length).replace(/CANCELLED/ig, '').trim();
      
      const contactMatch = name.match(/\s*\([^)]+\)$/);
      if (contactMatch) {
        name = name.substring(0, contactMatch.index).trim();
      }
      
      if (name) {
        guests.push({ count, name, isCancelled });
        total += count;
        if (!isCancelled) active += count;
      }
    }
    
    return { guests, total, active };
  }
  
  private getEventStatus(startTime: string, endTime: string): EventStatus {
    const now = new Date();
    const start = new Date(startTime);
    const end = new Date(endTime);
    
    if (now < start) return 'Upcoming';
    if (now >= start && now <= end) return 'In Progress';
    return 'Completed';
  }
}