import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { MessageService, AppMessage } from '../../services/message.service';

@Component({
  selector: 'app-message',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div 
      *ngIf="currentMessage" 
      [class]="getMessageClasses()"
      class="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 max-w-md w-full mx-4 rounded-md p-4 shadow-lg transition-all duration-300 ease-in-out"
    >
      <div class="flex items-start">
        <div class="flex-shrink-0">
          <svg 
            *ngIf="currentMessage.type === 'success'" 
            class="h-5 w-5 text-green-400" 
            viewBox="0 0 20 20" 
            fill="currentColor"
          >
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
          </svg>
          
          <svg 
            *ngIf="currentMessage.type === 'error'" 
            class="h-5 w-5 text-red-400" 
            viewBox="0 0 20 20" 
            fill="currentColor"
          >
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
          </svg>
          
          <svg 
            *ngIf="currentMessage.type === 'warning'" 
            class="h-5 w-5 text-yellow-400" 
            viewBox="0 0 20 20" 
            fill="currentColor"
          >
            <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
          </svg>
          
          <svg 
            *ngIf="currentMessage.type === 'info'" 
            class="h-5 w-5 text-blue-400" 
            viewBox="0 0 20 20" 
            fill="currentColor"
          >
            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
          </svg>
        </div>
        
        <div class="ml-3 flex-1">
          <p [class]="getTextClasses()" class="text-sm font-medium">
            {{ currentMessage.text }}
          </p>
        </div>
        
        <div class="ml-4 flex-shrink-0 flex">
          <button 
            (click)="closeMessage()"
            [class]="getCloseButtonClasses()"
            class="inline-flex rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2"
          >
            <span class="sr-only">Fechar</span>
            <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  `
})
export class MessageComponent implements OnInit, OnDestroy {
  currentMessage: AppMessage | null = null;
  private subscription: Subscription = new Subscription();

  constructor(private messageService: MessageService) {}

  ngOnInit(): void {
    this.subscription.add(
      this.messageService.message$.subscribe(message => {
        this.currentMessage = message;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  closeMessage(): void {
    this.messageService.clearMessage();
  }

  getMessageClasses(): string {
    if (!this.currentMessage) return '';
    
    const baseClasses = 'border';
    
    switch (this.currentMessage.type) {
      case 'success':
        return `${baseClasses} bg-green-50 border-green-200`;
      case 'error':
        return `${baseClasses} bg-red-50 border-red-200`;
      case 'warning':
        return `${baseClasses} bg-yellow-50 border-yellow-200`;
      case 'info':
        return `${baseClasses} bg-blue-50 border-blue-200`;
      default:
        return `${baseClasses} bg-gray-50 border-gray-200`;
    }
  }

  getTextClasses(): string {
    if (!this.currentMessage) return '';
    
    switch (this.currentMessage.type) {
      case 'success':
        return 'text-green-800';
      case 'error':
        return 'text-red-800';
      case 'warning':
        return 'text-yellow-800';
      case 'info':
        return 'text-blue-800';
      default:
        return 'text-gray-800';
    }
  }

  getCloseButtonClasses(): string {
    if (!this.currentMessage) return '';
    
    switch (this.currentMessage.type) {
      case 'success':
        return 'text-green-400 hover:text-green-600 focus:ring-green-500';
      case 'error':
        return 'text-red-400 hover:text-red-600 focus:ring-red-500';
      case 'warning':
        return 'text-yellow-400 hover:text-yellow-600 focus:ring-yellow-500';
      case 'info':
        return 'text-blue-400 hover:text-blue-600 focus:ring-blue-500';
      default:
        return 'text-gray-400 hover:text-gray-600 focus:ring-gray-500';
    }
  }
}