import { Injectable } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { JsonPipe } from '@angular/common';
import { map } from 'rxjs/operators';
const { Storage } = Plugins;

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private helper;
  private currentUserSubject: BehaviorSubject<any>;
  private isLogined: BehaviorSubject<any>;
  public currentUser: Observable<any>;
  private URL = 'https://pure-sierra-38607.herokuapp.com/api';
  constructor(private http: HttpClient) {
    // this.isLogined = new BehaviorSubject<any>(false);
    this.helper = new  JwtHelperService();
  }

  async init(){

    const ret = await Storage.get({ key: 'token' });
    const result: any = JSON.parse(JSON.stringify(ret.value));
    console.log(result);
    if (result) {
      const decodedToken = this.helper.isTokenExpired(result.token);
      this.isLogined= new BehaviorSubject<any>(true) ;
    } else {
      this.isLogined= new BehaviorSubject<any>(false) ;

    }
  }


  get Logined() {
    return this.isLogined.value;
  }
  login(cardentials) {
    return this.http.post<any>(`${this.URL}/login`, cardentials)
      .pipe(map(async token => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        await Storage.set({ key: 'token', value: JSON.stringify(token) });
        const helper = new JwtHelperService();
        const user = helper.decodeToken(token.token);
        console.log(token.token);
        this.isLogined.next(true);
        return user;
      }));


  }
  register(cardentials) {
    return this.http.post<any>(`${this.URL}/register`, cardentials)
      .pipe(map(token => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        Storage.set({ key: 'token', value: JSON.stringify(token) });
        const helper = new JwtHelperService();
        const user = helper.decodeToken(token.token);
        console.log(token.token);
        this.isLogined.next(true);
        return user;
      }));
  }

  async logout() {
    // remove user from local storage to log user out
    await Storage.remove({ key: 'token' });
    this.isLogined.next(false);
  }
}

