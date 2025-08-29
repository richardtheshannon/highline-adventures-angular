import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProcessedEvent, DayStats } from '../../core/models/event.model';
import { ExportService } from '../../core/services/export';

@Component({
  selector: 'app-export-dialog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './export-dialog.html',
  styleUrls: ['./export-dialog.scss']
})
export class ExportDialogComponent {
  @Input() isOpen = false;
  @Input() events: ProcessedEvent[] = [];
  @Input() stats: DayStats | null = null;
  @Input() dateRange: { startDate: Date, endDate: Date } | null = null;
  @Output() closeDialog = new EventEmitter<void>();

  private exportService = inject(ExportService);
  
  isExporting = false;
  exportMessage = '';
  exportOptions = [
    {
      id: 'pdf',
      title: 'PDF Manifest',
      description: 'Complete activity manifest with statistics and guest details',
      icon: '📄'
    },
    {
      id: 'csv',
      title: 'CSV Activities', 
      description: 'Spreadsheet format with all activity data',
      icon: '📊'
    },
    {
      id: 'guests',
      title: 'Guest List CSV',
      description: 'Detailed guest information for all activities',
      icon: '👥'
    },
    {
      id: 'manifest',
      title: 'JSON Manifest',
      description: 'Complete data export in JSON format',
      icon: '🔧'
    }
  ];

  async exportData(type: string) {
    if (!this.dateRange || !this.stats) {
      this.exportMessage = 'Error: Missing required data for export';
      return;
    }

    this.isExporting = true;
    this.exportMessage = '';

    try {
      const exportData = {
        events: this.events,
        stats: this.stats,
        dateRange: this.dateRange,
        exportType: type as 'pdf' | 'csv' | 'manifest'
      };

      switch (type) {
        case 'pdf':
          this.exportMessage = 'Generating PDF manifest...';
          await this.exportService.exportToPDF(exportData);
          this.exportMessage = 'PDF manifest downloaded successfully!';
          break;
          
        case 'csv':
          this.exportMessage = 'Generating CSV export...';
          this.exportService.exportToCSV(exportData);
          this.exportMessage = 'CSV export downloaded successfully!';
          break;
          
        case 'guests':
          this.exportMessage = 'Generating guest list...';
          await this.exportService.exportGuestList(this.events);
          this.exportMessage = 'Guest list downloaded successfully!';
          break;
          
        case 'manifest':
          this.exportMessage = 'Generating JSON manifest...';
          this.exportService.exportManifest(exportData);
          this.exportMessage = 'JSON manifest downloaded successfully!';
          break;
          
        default:
          throw new Error('Unknown export type');
      }
      
      // Auto-close message after 3 seconds
      setTimeout(() => {
        this.exportMessage = '';
      }, 3000);
      
    } catch (error) {
      console.error('Export error:', error);
      this.exportMessage = `Export failed: ${error instanceof Error ? error.message : 'Unknown error'}`;
      
      // Auto-clear error message after 5 seconds
      setTimeout(() => {
        this.exportMessage = '';
      }, 5000);
    } finally {
      this.isExporting = false;
    }
  }

  close() {
    this.closeDialog.emit();
  }

  getEventSummary() {
    return {
      totalEvents: this.events.length,
      dateRange: this.dateRange ? 
        `${this.dateRange.startDate.toLocaleDateString()} - ${this.dateRange.endDate.toLocaleDateString()}` : 
        'No date range',
      totalGuests: this.stats?.totalGuests || 0,
      activeGuests: this.stats?.activeNow || 0
    };
  }
}
