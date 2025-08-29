import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatePicker, DateRange } from '../date-picker/date-picker';
import { NotificationToggleComponent } from '../notifications/notification-toggle.component';

interface GlobalFilters {
  type: string;
  status: string;
}

export interface SidebarFilter {
  globalFilters: GlobalFilters;
  availableTypes: string[];
  availableStatuses: string[];
  showAdvancedFilters: boolean;
  currentDateRange: { startDate: Date; endDate: Date } | null;
  selectedQuickFilter: string;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, DatePicker, NotificationToggleComponent],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  @Input() isOpen = false;
  @Input() filters!: SidebarFilter;
  @Output() closeSidebar = new EventEmitter<void>();
  @Output() filterChange = new EventEmitter<{ day: string; type: string; value: string }>();
  @Output() dateRangeChange = new EventEmitter<DateRange>();
  @Output() quickFilterChange = new EventEmitter<string>();
  @Output() toggleAdvancedFilters = new EventEmitter<void>();

  onFilterChange(dayKey: string, filterType: string, value: string) {
    this.filterChange.emit({ day: dayKey, type: filterType, value });
  }

  onDateRangeChange(dateRange: DateRange) {
    this.dateRangeChange.emit(dateRange);
  }

  onQuickFilterChange(filterValue: string) {
    this.quickFilterChange.emit(filterValue);
  }

  onToggleAdvanced() {
    this.toggleAdvancedFilters.emit();
  }

  onOverlayClick(event: Event) {
    if (event.target === event.currentTarget) {
      this.closeSidebar.emit();
    }
  }
}