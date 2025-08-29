import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProcessedEvent } from '../../core/models/event.model';

@Component({
  selector: 'app-activity-detail-drawer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './activity-detail-drawer.html',
  styleUrl: './activity-detail-drawer.scss'
})
export class ActivityDetailDrawer {
  @Input() isOpen = false;
  @Input() selectedActivity: ProcessedEvent | null = null;
  @Output() closeDrawer = new EventEmitter<void>();

  getFormattedDate(): string {
    if (!this.selectedActivity) return '';
    const date = new Date(this.selectedActivity.start.dateTime);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  getFormattedTimeRange(): string {
    if (!this.selectedActivity) return '';
    const startTime = new Date(this.selectedActivity.start.dateTime);
    const endTime = new Date(this.selectedActivity.end.dateTime);
    
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

  getCapacityAndSchedule(): string {
    if (!this.selectedActivity) return '';
    const startTime = new Date(this.selectedActivity.start.dateTime);
    const currentCapacity = this.selectedActivity.currentCapacity || 0;
    const maxCapacity = this.selectedActivity.maxCapacity || 0;
    
    const formattedTime = startTime.toLocaleString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
      timeZone: 'America/Los_Angeles'
    });
    
    return `${currentCapacity}/${maxCapacity} at ${formattedTime}`;
  }


  getStatusClass(): string {
    if (!this.selectedActivity) return '';
    switch (this.selectedActivity.status) {
      case 'In Progress': return 'in-progress';
      case 'Completed': return 'completed';
      case 'Upcoming': return 'upcoming';
      default: return '';
    }
  }

  getCapacityPercentage(): number {
    if (!this.selectedActivity?.currentCapacity || !this.selectedActivity?.maxCapacity) return 0;
    return Math.round((this.selectedActivity.currentCapacity / this.selectedActivity.maxCapacity) * 100);
  }

  getCapacityStatus(): string {
    const percentage = this.getCapacityPercentage();
    if (percentage >= 100) return 'full';
    if (percentage >= 80) return 'high';
    if (percentage >= 50) return 'medium';
    return 'low';
  }

  isOverbooked(): boolean {
    return !!(this.selectedActivity?.currentCapacity && 
             this.selectedActivity?.maxCapacity && 
             this.selectedActivity.currentCapacity > this.selectedActivity.maxCapacity);
  }


  onOverlayClick(event: Event) {
    if (event.target === event.currentTarget) {
      this.closeDrawer.emit();
    }
  }
}
