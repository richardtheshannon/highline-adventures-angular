import { Injectable, inject } from '@angular/core';
import { SwPush } from '@angular/service-worker';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, from } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class PushNotificationService {
  private swPush = inject(SwPush);
  private http = inject(HttpClient);
  
  private apiBaseUrl = environment.functionsBaseUrl;
  isSubscribedSubject = new BehaviorSubject<boolean>(false);
  
  isSubscribed$ = this.isSubscribedSubject.asObservable();
  
  constructor() {
    this.checkSubscription();
  }
  
  private async checkSubscription() {
    try {
      const subscription = await this.swPush.subscription.toPromise();
      this.isSubscribedSubject.next(!!subscription);
    } catch (error) {
      console.error('Error checking subscription:', error);
      this.isSubscribedSubject.next(false);
    }
  }
  
  async requestSubscription(): Promise<void> {
    try {
      if (!this.swPush.isEnabled) {
        throw new Error('Service Worker is not enabled');
      }
      
      const subscription = await this.swPush.requestSubscription({
        serverPublicKey: environment.vapid.publicKey
      });
      
      await this.http.post(`${this.apiBaseUrl}/saveSubscription`, subscription).toPromise();
      this.isSubscribedSubject.next(true);
      console.log('Push notification subscription successful');
    } catch (error) {
      console.error('Could not subscribe to notifications:', error);
      throw error;
    }
  }
  
  async unsubscribe(): Promise<void> {
    try {
      const subscription = await this.swPush.subscription.toPromise();
      
      if (subscription) {
        await subscription.unsubscribe();
        await this.http.post(`${this.apiBaseUrl}/removeSubscription`, {
          endpoint: subscription.endpoint
        }).toPromise();
        this.isSubscribedSubject.next(false);
        console.log('Push notification unsubscribe successful');
      }
    } catch (error) {
      console.error('Could not unsubscribe from notifications:', error);
      throw error;
    }
  }
  
  async toggleSubscription(): Promise<void> {
    const isSubscribed = this.isSubscribedSubject.value;
    
    if (isSubscribed) {
      await this.unsubscribe();
    } else {
      await this.requestSubscription();
    }
  }
}