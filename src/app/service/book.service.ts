import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { BookModel } from "../model/book.model";
import { Observable } from "rxjs";

@Injectable({providedIn:"root"})
export class BookService{

    private http = inject(HttpClient);

    private url ="http://localhost:8080/api/books";

    getAll():Observable<BookModel[]>{
        return this.http.get<BookModel[]>(this.url);
    }

    get(id:number):Observable<BookModel>{
        return this.http.get<BookModel>(`${this.url}/${id}`);  
    }

    add(book:BookModel):Observable<BookModel>{
        return this.http.post<BookModel>(this.url,book);
    }

    update(id:number,book:BookModel):Observable<BookModel>{
        return this.http.put<BookModel>(`${this.url}/${id}`,book);
    }

    delete(id:number): Observable<void>{
        return this.http.delete<void>(`${this.url}/${id}`);
    }

}