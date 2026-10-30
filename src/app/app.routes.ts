import { Routes } from '@angular/router';
import { BookFormComponent } from './component/book-form-component/book-form-component';
import { Book } from './component/book/book'; 

export const routes: Routes = [
  {path: '', component:Book},
  {path:'add-book',component:BookFormComponent}
];
