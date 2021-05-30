import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';
import { UserDetail } from '../models/user-detail';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  api = environment.apiUrl + '/user'
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };


  constructor( private http: HttpClient) { }

  public getusers(): Observable<UserDetail[]> {
    return this.http.get<UserDetail[]>(this.api);
  }

  public getUserDetail(id : string):Observable<UserDetail> {
    return this.http.get<UserDetail>(this.api + '/' + id);
  }

  public deleteUser(id: string) {
    return this.http.delete(this.api + '/' + id);
  }

  public addUser( body: {[index: string]:any} ){
    return this.http.post(this.api + '/register' , body );
  }

  public updateUser(id: string,  body:{[index: string]:any}) {
    return this.http.put(this.api + '/' + id , body);
  }
}
