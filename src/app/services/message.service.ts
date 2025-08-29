import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface AppMessage {
  type: 'success' | 'error' | 'warning' | 'info';
  text: string;
  duration?: number; // in milliseconds
}

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private messageSubject = new BehaviorSubject<AppMessage | null>(null);
  public message$ = this.messageSubject.asObservable();

  showSuccess(text: string, duration: number = 5000): void {
    this.showMessage({ type: 'success', text, duration });
  }

  showError(text: string, duration: number = 8000): void {
    this.showMessage({ type: 'error', text, duration });
  }

  showWarning(text: string, duration: number = 6000): void {
    this.showMessage({ type: 'warning', text, duration });
  }

  showInfo(text: string, duration: number = 5000): void {
    this.showMessage({ type: 'info', text, duration });
  }

  private showMessage(message: AppMessage): void {
    this.messageSubject.next(message);
    
    if (message.duration && message.duration > 0) {
      setTimeout(() => {
        this.clearMessage();
      }, message.duration);
    }
  }

  clearMessage(): void {
    this.messageSubject.next(null);
  }
}