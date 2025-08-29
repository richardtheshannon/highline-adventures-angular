import { Injectable } from '@angular/core';
import { ProcessedEvent, DayStats } from '../models/event.model';

interface ExportData {
  events: ProcessedEvent[];
  stats: DayStats;
  dateRange: { startDate: Date, endDate: Date };
  exportType: 'pdf' | 'csv' | 'manifest';
}

@Injectable({
  providedIn: 'root'
})
export class ExportService {

  async exportToPDF(data: ExportData): Promise<void> {
    try {
      // Use jsPDF for PDF generation
      const { jsPDF } = await import('jspdf');
      const doc = new jsPDF();
      
      // Header
      doc.setFontSize(20);
      doc.text('Highline Adventures - Activity Manifest', 20, 30);
      
      // Date Range
      doc.setFontSize(12);
      const dateStr = `${data.dateRange.startDate.toLocaleDateString()} - ${data.dateRange.endDate.toLocaleDateString()}`;
      doc.text(`Date Range: ${dateStr}`, 20, 45);
      
      // Statistics
      let yPos = 60;
      doc.setFontSize(16);
      doc.text('Summary Statistics', 20, yPos);
      yPos += 15;
      
      doc.setFontSize(12);
      doc.text(`Total Guests: ${data.stats.totalGuests}`, 20, yPos);
      yPos += 10;
      doc.text(`Active Now: ${data.stats.activeNow}`, 20, yPos);
      yPos += 10;
      doc.text(`Capacity Issues: ${data.stats.capacityIssues}`, 20, yPos);
      yPos += 10;
      doc.text(`Cancellations: ${data.stats.cancellations}`, 20, yPos);
      yPos += 20;
      
      // Activities
      doc.setFontSize(16);
      doc.text('Activities', 20, yPos);
      yPos += 15;
      
      data.events.forEach((event, index) => {
        if (yPos > 250) {
          doc.addPage();
          yPos = 30;
        }
        
        doc.setFontSize(12);
        doc.text(`${index + 1}. ${event.summary}`, 20, yPos);
        yPos += 8;
        
        const startTime = new Date(event.start.dateTime).toLocaleString();
        doc.text(`   Time: ${startTime}`, 25, yPos);
        yPos += 8;
        
        if (event.guests) {
          doc.text(`   Guests: ${event.guests.total} (Active: ${event.guests.active})`, 25, yPos);
          yPos += 8;
        }
        
        if (event.currentCapacity && event.maxCapacity) {
          doc.text(`   Capacity: ${event.currentCapacity}/${event.maxCapacity}`, 25, yPos);
          yPos += 8;
        }
        
        doc.text(`   Status: ${event.status}`, 25, yPos);
        yPos += 12;
      });
      
      // Save the PDF
      const fileName = `highline-manifest-${new Date().toISOString().split('T')[0]}.pdf`;
      doc.save(fileName);
      
    } catch (error) {
      console.error('Error generating PDF:', error);
      throw new Error('Failed to generate PDF manifest');
    }
  }

  exportToCSV(data: ExportData): void {
    try {
      const csvHeaders = [
        'Activity Name',
        'Date',
        'Start Time',
        'End Time',
        'Activity Type',
        'Total Guests',
        'Active Guests',
        'Current Capacity',
        'Max Capacity',
        'Status',
        'Overbooked',
        'Has Cancellations',
        'Guest Details'
      ];
      
      const csvRows = data.events.map(event => {
        const startDate = new Date(event.start.dateTime);
        const endDate = new Date(event.end.dateTime);
        
        const guestDetails = event.guests?.guests.map(g => 
          `${g.count}x ${g.name}${g.isCancelled ? ' (CANCELLED)' : ''}`
        ).join('; ') || '';
        
        return [
          `"${event.summary}"`,
          startDate.toLocaleDateString(),
          startDate.toLocaleTimeString(),
          endDate.toLocaleTimeString(),
          event.activityInfo?.displayName || '',
          event.guests?.total || 0,
          event.guests?.active || 0,
          event.currentCapacity || 0,
          event.maxCapacity || 0,
          event.status || '',
          (event.currentCapacity && event.maxCapacity && event.currentCapacity > event.maxCapacity) ? 'Yes' : 'No',
          event.guests?.guests.some(g => g.isCancelled) ? 'Yes' : 'No',
          `"${guestDetails}"`
        ];
      });
      
      const csvContent = [csvHeaders, ...csvRows]
        .map(row => row.join(','))
        .join('\n');
      
      this.downloadCSV(csvContent, `highline-activities-${new Date().toISOString().split('T')[0]}.csv`);
      
    } catch (error) {
      console.error('Error generating CSV:', error);
      throw new Error('Failed to generate CSV export');
    }
  }

  exportManifest(data: ExportData): void {
    try {
      const manifestData = {
        metadata: {
          exportDate: new Date().toISOString(),
          dateRange: {
            startDate: data.dateRange.startDate.toISOString(),
            endDate: data.dateRange.endDate.toISOString()
          },
          totalEvents: data.events.length,
          statistics: data.stats
        },
        activities: data.events.map(event => ({
          id: event.id,
          summary: event.summary,
          description: event.description,
          startTime: event.start.dateTime,
          endTime: event.end.dateTime,
          activityType: event.activityInfo?.displayName,
          activityColor: event.activityInfo?.color,
          status: event.status,
          capacity: {
            current: event.currentCapacity,
            maximum: event.maxCapacity,
            isOverbooked: event.currentCapacity && event.maxCapacity && event.currentCapacity > event.maxCapacity
          },
          guests: {
            total: event.guests?.total || 0,
            active: event.guests?.active || 0,
            details: event.guests?.guests.map(g => ({
              count: g.count,
              name: g.name,
              isCancelled: g.isCancelled
            })) || []
          }
        }))
      };
      
      const jsonContent = JSON.stringify(manifestData, null, 2);
      const fileName = `highline-manifest-${new Date().toISOString().split('T')[0]}.json`;
      
      this.downloadFile(jsonContent, fileName, 'application/json');
      
    } catch (error) {
      console.error('Error generating manifest:', error);
      throw new Error('Failed to generate manifest export');
    }
  }

  private downloadCSV(content: string, filename: string): void {
    this.downloadFile(content, filename, 'text/csv');
  }

  private downloadFile(content: string, filename: string, contentType: string): void {
    const blob = new Blob([content], { type: contentType });
    const url = window.URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.style.display = 'none';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    window.URL.revokeObjectURL(url);
  }

  async exportGuestList(events: ProcessedEvent[]): Promise<void> {
    try {
      const guestData: any[] = [];
      
      events.forEach(event => {
        if (event.guests?.guests) {
          event.guests.guests.forEach(guest => {
            guestData.push({
              activityName: event.summary,
              activityType: event.activityInfo?.displayName || '',
              date: new Date(event.start.dateTime).toLocaleDateString(),
              time: new Date(event.start.dateTime).toLocaleTimeString(),
              guestName: guest.name,
              guestCount: guest.count,
              status: guest.isCancelled ? 'CANCELLED' : 'ACTIVE',
              activityStatus: event.status
            });
          });
        }
      });
      
      const csvHeaders = [
        'Activity Name',
        'Activity Type', 
        'Date',
        'Time',
        'Guest Name',
        'Guest Count',
        'Booking Status',
        'Activity Status'
      ];
      
      const csvRows = guestData.map(row => [
        `"${row.activityName}"`,
        `"${row.activityType}"`,
        row.date,
        row.time,
        `"${row.guestName}"`,
        row.guestCount,
        row.status,
        row.activityStatus
      ]);
      
      const csvContent = [csvHeaders, ...csvRows]
        .map(row => row.join(','))
        .join('\n');
      
      this.downloadCSV(csvContent, `guest-list-${new Date().toISOString().split('T')[0]}.csv`);
      
    } catch (error) {
      console.error('Error generating guest list:', error);
      throw new Error('Failed to generate guest list export');
    }
  }
}