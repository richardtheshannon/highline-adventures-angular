import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProcessedEvent } from '../../core/models/event.model';

@Component({
  selector: 'app-activity-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './activity-card.component.html',
  styleUrls: ['./activity-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActivityCardComponent {
  @Input() event!: ProcessedEvent;
  @Output() activityClick = new EventEmitter<ProcessedEvent>();
  
  showTooltip = false;
  guestDetailsLoaded = false;
  detailedGuestInfo: any = null;
  
  toggleTooltip() {
    this.showTooltip = !this.showTooltip;
    
    // Lazy load guest details when tooltip is opened for the first time
    if (this.showTooltip && !this.guestDetailsLoaded) {
      this.loadGuestDetails();
    }
  }

  private loadGuestDetails() {
    // Simulate processing detailed guest information only when needed
    if (this.event.guests) {
      this.detailedGuestInfo = {
        ...this.event.guests,
        processedGuests: this.event.guests.guests.map(guest => ({
          ...guest,
          formattedName: this.formatGuestName(guest.name),
          statusClass: guest.isCancelled ? 'cancelled' : 'active'
        }))
      };
    }
    this.guestDetailsLoaded = true;
  }

  private formatGuestName(name: string): string {
    // Only format names when actually displaying them
    return name.trim().replace(/\s+/g, ' ');
  }
  
  getStatusClass(): string {
    switch (this.event.status) {
      case 'In Progress': return 'in-progress';
      case 'Completed': return 'completed';
      case 'Upcoming': return 'upcoming';
      default: return '';
    }
  }
  
  getActivityColor(): string {
    return this.event.activityInfo?.color || '#8b949e';
  }
  
  getFormattedTime(): string {
    const startTime = new Date(this.event.start.dateTime);
    const endTime = new Date(this.event.end.dateTime);
    
    const formatTime = (date: Date) => {
      return date.toLocaleString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
        timeZone: 'America/Los_Angeles'
      });
    };
    
    return `${formatTime(startTime)} - ${formatTime(endTime)}`;
  }
  
  getTimeRange(): string {
    const startTime = new Date(this.event.start.dateTime);
    const endTime = new Date(this.event.end.dateTime);
    
    const formatTime = (date: Date) => {
      return date.toLocaleString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
        timeZone: 'America/Los_Angeles'
      }).replace(' ', '');
    };
    
    return `${formatTime(startTime)} - ${formatTime(endTime)}`;
  }
  
  isOverbooked(): boolean {
    return !!(this.event.currentCapacity && 
             this.event.maxCapacity && 
             this.event.currentCapacity > this.event.maxCapacity);
  }
  
  hasCancellations(): boolean {
    return !!(this.event.guests?.guests.some(g => g.isCancelled));
  }

  onActivityClick() {
    this.activityClick.emit(this.event);
  }
}