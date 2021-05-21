import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user';
import { map } from 'rxjs/operators';

const auth_API = 'https://localhost:44356/api/login/';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private userSubject: BehaviorSubject<User>;
  public user: Observable<User>;

  constructor(
    private router: Router,
    private http: HttpClient
  ) {
    this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user') || '{}'));
    this.user = this.userSubject.asObservable();
   }

   public get userValue(): User {
     return this.userSubject.value;
   }

   login(username: string, password: string) {
     return this.http.post<any>(auth_API, {username, password})
        .pipe(map(user => {
          localStorage.setItem('user', JSON.stringify(user));
          this.userSubject.next(user);
          return user;
        }));
   }

   logout() {
     //xoa nguoi dung khoi bo nho cuc bo
     localStorage.removeItem('user');
     //this.userSubject.next(null);
     this.router.navigate(['/login']);
   }
}
