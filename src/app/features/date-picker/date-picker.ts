import { Component, Output, EventEmitter, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface DateRange {
  startDate: Date | null;
  endDate: Date | null;
}

@Component({
  selector: 'app-date-picker',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './date-picker.html',
  styleUrl: './date-picker.scss'
})
export class DatePicker {
  @Input() initialRange: DateRange = { startDate: null, endDate: null };
  @Output() dateRangeChange = new EventEmitter<DateRange>();
  @Output() quickFilterChange = new EventEmitter<string>();

  startDate: string = '';
  endDate: string = '';
  isOpen = false;

  quickFilters = [
    { label: 'Today', value: 'today' },
    { label: 'Tomorrow', value: 'tomorrow' },
    { label: 'This Week', value: 'week' },
    { label: 'Next 7 Days', value: 'next7' },
    { label: 'This Month', value: 'month' },
    { label: 'Custom Range', value: 'custom' }
  ];

  selectedQuickFilter = 'today'; // Default to today

  ngOnInit() {
    // Initialize with default range (today)
    this.applyQuickFilter('today');
  }

  togglePicker() {
    this.isOpen = !this.isOpen;
  }

  applyQuickFilter(filterValue: string) {
    this.selectedQuickFilter = filterValue;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    let startDate: Date;
    let endDate: Date;

    switch (filterValue) {
      case 'today':
        startDate = new Date(today);
        endDate = new Date(today);
        break;
      case 'tomorrow':
        startDate = new Date(today.getTime() + 24 * 60 * 60 * 1000);
        endDate = new Date(today.getTime() + 24 * 60 * 60 * 1000);
        break;
      case 'week':
        const dayOfWeek = today.getDay();
        const daysToMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
        startDate = new Date(today.getTime() - daysToMonday * 24 * 60 * 60 * 1000);
        endDate = new Date(startDate.getTime() + 6 * 24 * 60 * 60 * 1000);
        break;
      case 'next7':
        startDate = new Date(today);
        endDate = new Date(today.getTime() + 6 * 24 * 60 * 60 * 1000);
        break;
      case 'month':
        startDate = new Date(today.getFullYear(), today.getMonth(), 1);
        endDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);
        break;
      default:
        this.quickFilterChange.emit(filterValue);
        return;
    }

    this.startDate = this.formatDateForInput(startDate);
    this.endDate = this.formatDateForInput(endDate);
    
    const range: DateRange = { startDate, endDate };
    this.dateRangeChange.emit(range);
    this.quickFilterChange.emit(filterValue);
  }

  onDateChange() {
    if (this.startDate && this.endDate) {
      const range: DateRange = {
        startDate: new Date(this.startDate),
        endDate: new Date(this.endDate)
      };
      this.dateRangeChange.emit(range);
      this.selectedQuickFilter = 'custom';
      this.quickFilterChange.emit('custom');
    }
  }

  private formatDateForInput(date: Date): string {
    return date.toISOString().split('T')[0];
  }

  clearDates() {
    this.startDate = '';
    this.endDate = '';
    this.selectedQuickFilter = 'today';
    this.applyQuickFilter('today');
  }
}