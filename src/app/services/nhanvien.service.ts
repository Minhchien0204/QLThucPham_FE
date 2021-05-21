import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';

export interface NhanVien{
  id: number;
  maNhanVien:string;
  name:string;
  diaChi:string;
  dienThoai:string;
  ngaySinh:string;
  tenBoPhan:string;
}

@Injectable({
  providedIn: 'root'
})
export class NhanvienService {
  urlGetListNhanVien = 'http://127.0.0.1:5000/'

  constructor(private http: HttpClient) { }

  public getListNhanVien():Observable<NhanVien[]> {
    return this.http.get<NhanVien[]>(this.urlGetListNhanVien);
  }
}
