import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment } from './../../environments/environment'
import {NhanVien} from '../models/nhan-vien'

@Injectable({
  providedIn: 'root'
})
export class NhanvienService {
  urlGetListNhanVien = environment.apiUrl + '/nhanvien'

  constructor(private http: HttpClient) { }

  public getListNhanVien():Observable<NhanVien[]> {
    return this.http.get<NhanVien[]>(this.urlGetListNhanVien);
  }

  public getNhanVien(id: string): Observable<NhanVien[]> {
    return this.http.get<NhanVien[]>(this.urlGetListNhanVien + '/' + id);
  }

  public putNhanVien(id: string, body: {[index: string]:any}) {
    return this.http.put(this.urlGetListNhanVien + '/' + id, body);
  }
} 
