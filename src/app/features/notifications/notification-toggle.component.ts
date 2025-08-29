import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PushNotificationService } from '../../core/services/push-notification.service';

@Component({
  selector: 'app-notification-toggle',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button 
      class="notification-toggle"
      [class.on]="isSubscribed$ | async"
      [class.off]="!(isSubscribed$ | async)"
      [disabled]="isDisabled"
      (click)="handleToggle()">
      {{ getButtonText() }}
    </button>
  `,
  styles: [`
    .notification-toggle {
      padding: 10px 20px;
      border: none;
      border-radius: 20px;
      font-size: 14px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.3s ease;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      
      &.off {
        background: rgba(0, 0, 0, 0.3);
        color: #8b949e;
        border: 1px solid rgba(255, 255, 255, 0.1);
        
        &:hover:not(:disabled) {
          background: rgba(72, 187, 120, 0.1);
          color: #48bb78;
          border-color: #48bb78;
        }
      }
      
      &.on {
        background: rgba(72, 187, 120, 0.2);
        color: #48bb78;
        border: 1px solid #48bb78;
        
        &:hover:not(:disabled) {
          background: rgba(245, 101, 101, 0.1);
          color: #f56565;
          border-color: #f56565;
        }
      }
      
      &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
      }
      
      &:active:not(:disabled) {
        transform: scale(0.95);
      }
    }
  `]
})
export class NotificationToggleComponent implements OnInit {
  private pushService = inject(PushNotificationService);
  
  isSubscribed$ = this.pushService.isSubscribed$;
  isDisabled = false;
  isLoading = false;
  
  ngOnInit() {
    // Check if notifications are supported
    if (!('Notification' in window) || !('serviceWorker' in navigator)) {
      this.isDisabled = true;
    }
    
    // Check if notifications are denied
    if (Notification.permission === 'denied') {
      this.isDisabled = true;
    }
  }
  
  async handleToggle() {
    if (this.isDisabled || this.isLoading) return;
    
    this.isLoading = true;
    this.isDisabled = true;
    
    try {
      await this.pushService.toggleSubscription();
    } catch (error) {
      console.error('Error toggling notifications:', error);
    } finally {
      this.isLoading = false;
      this.isDisabled = false;
    }
  }
  
  getButtonText(): string {
    if (this.isLoading) return 'Loading...';
    
    if (Notification.permission === 'denied') {
      return 'Alerts Blocked';
    }
    
    return this.pushService.isSubscribedSubject.getValue() ? 'Disable Alerts' : 'Enable Alerts';
  }
}