import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription, interval } from 'rxjs';
import { CalendarService } from '../../core/services/calendar.service';
import { ProcessedEvent, DayStats } from '../../core/models/event.model';
import { ActivityCardComponent } from '../activity-card/activity-card.component';
import { DateRange } from '../date-picker/date-picker';
import { SidebarComponent, SidebarFilter } from '../sidebar/sidebar.component';
import { ActivityDetailDrawer } from '../activity-detail-drawer/activity-detail-drawer';
import { ThemeToggle } from '../theme-toggle/theme-toggle';

interface GlobalFilters {
  type: string;
  status: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, ActivityCardComponent, SidebarComponent, ActivityDetailDrawer, ThemeToggle],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  private calendarService = inject(CalendarService);
  private subscriptions = new Subscription();
  
  events: ProcessedEvent[] = [];
  currentTime = new Date();
  loading = true;
  error: string | null = null;
  
  todayEvents: ProcessedEvent[] = [];
  tomorrowEvents: ProcessedEvent[] = [];
  dayAfterEvents: ProcessedEvent[] = [];
  
  filteredTodayEvents: ProcessedEvent[] = [];
  filteredTomorrowEvents: ProcessedEvent[] = [];
  filteredDayAfterEvents: ProcessedEvent[] = [];
  
  todayStats: DayStats | null = null;
  tomorrowStats: DayStats | null = null;
  dayAfterStats: DayStats | null = null;
  
  globalFilters: GlobalFilters = {
    type: 'all',
    status: 'all'
  };
  
  availableTypes: string[] = ['All Types'];
  availableStatuses: string[] = ['All Statuses', 'Completed', 'In Progress', 'Upcoming'];
  
  // Advanced filtering
  currentDateRange: { startDate: Date; endDate: Date } | null = null;
  selectedQuickFilter = 'today';
  showAdvancedFilters = false;
  
  // Sidebar state
  sidebarOpen = false;
  
  // Activity detail drawer state
  activityDrawerOpen = false;
  selectedActivity: ProcessedEvent | null = null;
  
  get sidebarFilters(): SidebarFilter {
    return {
      globalFilters: this.globalFilters,
      availableTypes: this.availableTypes,
      availableStatuses: this.availableStatuses,
      showAdvancedFilters: this.showAdvancedFilters,
      currentDateRange: this.currentDateRange,
      selectedQuickFilter: this.selectedQuickFilter
    };
  }
  
  ngOnInit() {
    // Initialize with default date range (next 7 days)
    this.initializeDefaultDateRange();
    
    // Start polling for events
    this.startEventPolling();
    
    // Update time every second
    this.subscriptions.add(
      interval(1000).subscribe(() => {
        this.currentTime = new Date();
      })
    );
  }
  
  private initializeDefaultDateRange() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    this.currentDateRange = {
      startDate: new Date(today),
      endDate: new Date(today)
    };
  }
  
  private startEventPolling() {
    this.subscriptions.add(
      this.calendarService.startPolling(this.currentDateRange || undefined).subscribe({
        next: (events) => {
          this.events = events;
          this.groupEventsByDay();
          // Update available filters before applying them
          // This ensures we see all activity types in the current view
          this.updateAvailableFilters();
          this.applyFilters();
          this.calculateStats();
          this.loading = false;
          this.error = null;
        },
        error: (error) => {
          console.error('Error loading events:', error);
          this.error = 'Could not load calendar data';
          this.loading = false;
        }
      })
    );
  }
  
  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
  
  private groupEventsByDay() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000);
    const dayAfter = new Date(today.getTime() + 2 * 24 * 60 * 60 * 1000);
    
    this.todayEvents = [];
    this.tomorrowEvents = [];
    this.dayAfterEvents = [];
    
    this.events.forEach(event => {
      const eventDate = new Date(event.start.dateTime);
      eventDate.setHours(0, 0, 0, 0);
      
      if (eventDate.getTime() === today.getTime()) {
        this.todayEvents.push(event);
      } else if (eventDate.getTime() === tomorrow.getTime()) {
        this.tomorrowEvents.push(event);
      } else if (eventDate.getTime() === dayAfter.getTime()) {
        this.dayAfterEvents.push(event);
      }
    });
  }
  
  private calculateStats() {
    this.todayStats = this.calculateStatsForDay(this.filteredTodayEvents);
    this.tomorrowStats = this.calculateStatsForDay(this.filteredTomorrowEvents);
    this.dayAfterStats = this.calculateStatsForDay(this.filteredDayAfterEvents);
  }
  
  private updateAvailableFilters() {
    const typesSet = new Set(['All Types']);
    
    // Determine which events are relevant based on current view mode
    let relevantEvents: ProcessedEvent[] = [];
    
    if (this.currentDateRange && this.isCustomDateRange()) {
      // Custom date range selected - use all events in that range
      relevantEvents = this.events;
    } else {
      // Default 3-day view - only show activities from these days
      relevantEvents = [...this.todayEvents, ...this.tomorrowEvents, ...this.dayAfterEvents];
    }
    
    // Collect unique activity types from relevant events
    relevantEvents.forEach(event => {
      if (event.activityInfo?.displayName) {
        typesSet.add(event.activityInfo.displayName);
      }
    });
    
    // Sort alphabetically with "All Types" first
    this.availableTypes = Array.from(typesSet).sort((a, b) => {
      if (a === 'All Types') return -1;
      if (b === 'All Types') return 1;
      return a.localeCompare(b);
    });
    
    // Reset filter if selected type is no longer available
    if (!this.availableTypes.includes(this.globalFilters.type) && this.globalFilters.type !== 'all') {
      this.globalFilters.type = 'all';
      this.applyFilters();
      this.calculateStats();
    }
  }
  
  private isCustomDateRange(): boolean {
    // Check if we're using a custom date range (not the default 3-day view)
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const defaultEnd = new Date(today.getTime() + 2 * 24 * 60 * 60 * 1000);
    
    if (!this.currentDateRange) return false;
    
    return this.currentDateRange.startDate.getTime() !== today.getTime() ||
           this.currentDateRange.endDate.getTime() > defaultEnd.getTime();
  }
  
  private applyFilters() {
    this.filteredTodayEvents = this.filterEvents(this.todayEvents, this.globalFilters);
    this.filteredTomorrowEvents = this.filterEvents(this.tomorrowEvents, this.globalFilters);
    this.filteredDayAfterEvents = this.filterEvents(this.dayAfterEvents, this.globalFilters);
  }
  
  private filterEvents(events: ProcessedEvent[], filter: GlobalFilters): ProcessedEvent[] {
    return events.filter(event => {
      // Filter by type
      if (filter.type !== 'all' && filter.type !== 'All Types') {
        if (!event.activityInfo || event.activityInfo.displayName !== filter.type) {
          return false;
        }
      }
      
      // Filter by status
      if (filter.status !== 'all' && filter.status !== 'All Statuses') {
        if (event.status !== filter.status) {
          return false;
        }
      }
      
      return true;
    });
  }
  
  onGlobalFilterChange(filterType: 'type' | 'status', value: string) {
    const normalizedValue = value === 'All Types' || value === 'All Statuses' ? 'all' : value;
    this.globalFilters[filterType] = normalizedValue;
    this.applyFilters();
    this.calculateStats();
  }
  
  onSidebarFilterChange(filterData: { day: string; type: string; value: string }) {
    const filterType = filterData.type as 'type' | 'status';
    this.onGlobalFilterChange(filterType, filterData.value);
  }
  
  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }
  
  closeSidebar() {
    this.sidebarOpen = false;
  }

  onDateRangeChange(dateRange: DateRange) {
    if (dateRange.startDate && dateRange.endDate) {
      this.currentDateRange = {
        startDate: dateRange.startDate,
        endDate: dateRange.endDate
      };
      this.refreshEventsWithDateRange();
    }
  }

  onQuickFilterChange(filterValue: string) {
    this.selectedQuickFilter = filterValue;
  }

  toggleAdvancedFilters() {
    this.showAdvancedFilters = !this.showAdvancedFilters;
  }

  private refreshEventsWithDateRange() {
    this.loading = true;
    // Unsubscribe from current polling
    this.subscriptions.unsubscribe();
    this.subscriptions = new Subscription();
    
    // Start new polling with updated date range
    this.startEventPolling();
  }
  
  private calculateStatsForDay(events: ProcessedEvent[]): DayStats {
    const stats: DayStats = {
      totalGuests: 0,
      activeNow: 0,
      capacityIssues: 0,
      cancellations: 0,
      overbookedEvents: [],
      cancelledEvents: []
    };
    
    events.forEach(event => {
      if (event.guests) {
        stats.totalGuests += event.guests.total;
        
        if (event.status === 'In Progress') {
          stats.activeNow += event.guests.active;
        }
        
        if (event.guests.guests.some(g => g.isCancelled)) {
          stats.cancellations++;
          stats.cancelledEvents.push(event);
        }
      }
      
      if (event.currentCapacity && event.maxCapacity && 
          event.currentCapacity > event.maxCapacity) {
        stats.capacityIssues++;
        stats.overbookedEvents.push(event);
      }
    });
    
    return stats;
  }
  
  getFormattedTime(): string {
    return this.currentTime.toLocaleString('en-US', {
      weekday: 'short',
      month: 'numeric', 
      day: 'numeric',
      year: '2-digit',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
      timeZone: 'America/Los_Angeles'
    });
  }
  
  getDayName(dayOffset: number): string {
    const date = new Date();
    date.setDate(date.getDate() + dayOffset);
    
    const dayName = dayOffset === 0 ? 'Today' : 
                   dayOffset === 1 ? 'Tomorrow' : 
                   date.toLocaleDateString('en-US', { weekday: 'long' });
    
    const formattedDate = date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      month: 'long', 
      day: 'numeric' 
    });
    
    if (dayOffset === 0 || dayOffset === 1) {
      return `${dayName} - ${formattedDate}`;
    }
    
    return formattedDate;
  }

  shouldShowTodaySection(): boolean {
    if (!this.currentDateRange) return true;
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const startDate = new Date(this.currentDateRange.startDate);
    startDate.setHours(0, 0, 0, 0);
    
    const endDate = new Date(this.currentDateRange.endDate);
    endDate.setHours(23, 59, 59, 999);
    
    return today >= startDate && today <= endDate;
  }

  shouldShowTomorrowSection(): boolean {
    if (!this.currentDateRange) return true;
    
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    
    const startDate = new Date(this.currentDateRange.startDate);
    startDate.setHours(0, 0, 0, 0);
    
    const endDate = new Date(this.currentDateRange.endDate);
    endDate.setHours(23, 59, 59, 999);
    
    return tomorrow >= startDate && tomorrow <= endDate;
  }

  shouldShowDayAfterSection(): boolean {
    if (!this.currentDateRange) return true;
    
    const dayAfter = new Date();
    dayAfter.setDate(dayAfter.getDate() + 2);
    dayAfter.setHours(0, 0, 0, 0);
    
    const startDate = new Date(this.currentDateRange.startDate);
    startDate.setHours(0, 0, 0, 0);
    
    const endDate = new Date(this.currentDateRange.endDate);
    endDate.setHours(23, 59, 59, 999);
    
    return dayAfter >= startDate && dayAfter <= endDate;
  }

  // Activity drawer methods
  openActivityDrawer(activity: ProcessedEvent) {
    this.selectedActivity = activity;
    this.activityDrawerOpen = true;
    // Close sidebar if open to avoid conflicts
    if (this.sidebarOpen) {
      this.sidebarOpen = false;
    }
  }

  closeActivityDrawer() {
    this.activityDrawerOpen = false;
    this.selectedActivity = null;
  }
}