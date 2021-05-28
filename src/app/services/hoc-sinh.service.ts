import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment } from './../../environments/environment'
import { HocSinh } from '../models/hoc-sinh'

@Injectable({
  providedIn: 'root'
})
export class HocSinhService {
  urlHocSinh = environment.apiUrl + '/hocsinh'
  constructor(private http: HttpClient) { }

  public getListHocSinh():Observable<HocSinh[]> {
    return this.http.get<HocSinh[]>(this.urlHocSinh);
  }

  public addHocSinh(body:{[index: string]:any}) {
    return this.http.post(this.urlHocSinh, body)
  }

  public getHocSinhDetail(id: string) :Observable<HocSinh> {
    return this.http.get<HocSinh>(this.urlHocSinh + '/' + id);
  }

  public putHocSinh(id: string, body:{[index: string]:any}) {
    return this.http.put(this.urlHocSinh + '/' + id, body);
  }

  public deleteHocSinh(id: string) {
    return this.http.delete(this.urlHocSinh + '/' + id);
  }
}
