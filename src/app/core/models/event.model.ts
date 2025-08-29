export interface Guest {
  count: number;
  name: string;
  isCancelled: boolean;
}

export interface CalendarEvent {
  id: string;
  summary: string;
  description?: string;
  start: {
    dateTime: string;
    timeZone?: string;
  };
  end: {
    dateTime: string;
    timeZone?: string;
  };
  htmlLink?: string;
}

export interface ProcessedEvent extends CalendarEvent {
  activityInfo?: ActivityInfo;
  guests?: GuestInfo;
  status?: EventStatus;
  currentCapacity?: number;
  maxCapacity?: number;
}

export interface ActivityInfo {
  category: string;
  filterName: string;
  specificName: string;
  displayName: string;
  color: string;
}

export interface GuestInfo {
  guests: Guest[];
  total: number;
  active: number;
}

export type EventStatus = 'Upcoming' | 'In Progress' | 'Completed';

export interface DayStats {
  totalGuests: number;
  activeNow: number;
  capacityIssues: number;
  cancellations: number;
  overbookedEvents: ProcessedEvent[];
  cancelledEvents: ProcessedEvent[];
}