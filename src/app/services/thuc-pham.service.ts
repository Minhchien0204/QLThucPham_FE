import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment } from './../../environments/environment'
import { ThucPham } from '../models/thuc-pham'

@Injectable({
  providedIn: 'root'
})
export class ThucPhamService {
  urlTP = environment.apiUrl + '/thucpham'
  constructor(private http: HttpClient) { }
  public getListThucPham():Observable<ThucPham[]> {
    return this.http.get<ThucPham[]>(this.urlTP);
  }

  public addThucPham(body:{[index: string]:any}) {
    return this.http.post(this.urlTP, body)
  }

  public getThucPhamDetail(id: string) :Observable<ThucPham> {
    return this.http.get<ThucPham>(this.urlTP + '/' + id);
  }

  public putThucPham(id: string, body:{[index: string]:any}) {
    return this.http.put(this.urlTP + '/' + id, body);
  }

  public deleteThucPham(id: string) {
    return this.http.delete(this.urlTP + '/' + id);
  }
}
