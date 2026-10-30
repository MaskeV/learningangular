import { Component, inject, OnInit, output, signal } from '@angular/core';
import { BookModel } from '../../model/book.model';
import { BookService } from '../../service/book.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-book-form-component',
  imports: [FormsModule],
  templateUrl: './book-form-component.html',
  styleUrl: './book-form-component.scss',
})
export class BookFormComponent  implements OnInit{

  saved = output<void>();
  closed=output<void>();
  

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
          this.saved.emit();
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
