import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  url='https://pure-sierra-38607.herokuapp.com/api/category';
  constructor(private http:HttpClient) { }

  getCategories(){
    return this.http.get(this.url);
  }
}
