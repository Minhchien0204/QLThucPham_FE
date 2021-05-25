import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';
import { UserDetail } from '../models/user-detail';


const api = environment.apiUrl + '/user'
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor( private http: HttpClient) { }

  getusers(): Observable<UserDetail[]> {
    return this.http.get<UserDetail[]>(api);
  }
}
