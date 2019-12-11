import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  url = 'https://pure-sierra-38607.herokuapp.com/api/items';
  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get(`${this.url}`);
  }
}
