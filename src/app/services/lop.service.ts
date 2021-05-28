import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment } from './../../environments/environment'
import {Lop, hocSinhformClass as HocSinh} from '../models/lop'

@Injectable({
  providedIn: 'root'
})
export class LopService {
  apiUrlLop = environment.apiUrl + '/class'
  constructor(private http: HttpClient) { }

  public getListLop():Observable<Lop[]> {
    return this.http.get<Lop[]>(this.apiUrlLop);
  }

  public addLop(body: {[index: string]:any}) {
    return this.http.post(this.apiUrlLop, body);
  }

  public getLopDetail(id: string):Observable<Lop> {
    return this.http.get<Lop>(this.apiUrlLop + '/' + id);
  }

  public deleteLop(id: string) {
    return this.http.delete(this.apiUrlLop + '/' + id);
  }

  public putLop(id: string, body: {[index: string]:any}) {
    return this.http.put(this.apiUrlLop + '/' + id, body);
  }

  public getHocSinhFromLop(id: string):Observable<HocSinh[]> {
    return this.http.get<HocSinh[]>(this.apiUrlLop + '/' + id + '/student');
  }
}
