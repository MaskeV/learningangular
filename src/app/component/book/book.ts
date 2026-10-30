import { Component, inject, OnInit, signal } from '@angular/core';
import { BookService } from '../../service/book.service';
import { BookModel } from '../../model/book.model'
import { FormsModule } from '@angular/forms';
import { BookFormComponent } from '../book-form-component/book-form-component';
import { Navbar } from '../navbar/navbar';


@Component({
  selector: 'app-book',
  imports: [FormsModule, Navbar],
  templateUrl: './book.html',
  styleUrl: './book.scss',
})
export class Book implements OnInit{

  books = signal<BookModel[]>([]);
  form = signal<BookModel>(this.emptyBook());
  editingId = signal<number | null>(null);

   private bookService = inject(BookService);

    ngOnInit(): void {
      this.fetchbooks();
    }

    fetchbooks(){
      this.bookService.getAll().subscribe(data => this.books.set(data));
    }

    save(){
      const id = this.editingId();
      if(id == null){
        this.bookService.add({...this.form()}).subscribe(saved =>{
          this.books.update(list => [...list,saved]);
          this.reset();
        });

      }else{
        this.bookService.update(id,{...this.form()}).subscribe(saved =>{
          this.books.update(list => list.map(book => book.id===id ? saved:book));
          this.reset();
        })

      }
    }

    edit(book:BookModel){
      this.editingId.set(book.id!);
      this.form.set({...book});
    }

    remove(id:number){
      this.bookService.delete(id).subscribe(()=>{
           this.books.update(list => list.filter(book => book.id!=id));
      });
    }



    reset(){
      this.editingId.set(null);
      this.form.set(this.emptyBook())

    }

    emptyBook(): BookModel{
      return {title:'',author:'', category:'', quantity:1, publisher:'',publicationYear:0,description:'',available:true};
    }

}
