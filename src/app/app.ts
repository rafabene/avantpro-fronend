import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MessageComponent } from './components/message/message.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MessageComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('avantpro-frontend');
}
