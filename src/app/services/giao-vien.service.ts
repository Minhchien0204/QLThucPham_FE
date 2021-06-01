import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment } from './../../environments/environment';
import {GiaoVien} from '../models/giao-vien';

@Injectable({
  providedIn: 'root'
})
export class GiaoVienService {
  apiUrlGiaoVien = environment.apiUrl + '/giaovien'
  constructor(private http: HttpClient) { }

  public getListGiaoVien():Observable<GiaoVien[]> {
    return this.http.get<GiaoVien[]>(this.apiUrlGiaoVien);
  }

  public getByIdGiaoVien(id: string):Observable<GiaoVien>{
    return this.http.get<GiaoVien>(this.apiUrlGiaoVien + '/' + id);
  }

  public updateGiaoVien(id: string, body: {[index: string]: any}){
    return this.http.put(this.apiUrlGiaoVien + '/' + id, body);
  }

}
