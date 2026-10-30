import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Book } from './component/book/book';

@Component({
  selector: 'app-root',
  imports:[RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
    
}
