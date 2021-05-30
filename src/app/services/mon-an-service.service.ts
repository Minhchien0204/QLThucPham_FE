import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment } from './../../environments/environment'
import { MonAn } from '../models/mon-an'

@Injectable({
  providedIn: 'root'
})
export class MonAnService {
  urlMonAn = environment.apiUrl + '/monan'
  constructor(private http: HttpClient) { }
  public getListMonAn():Observable<MonAn[]> {
    return this.http.get<MonAn[]>(this.urlMonAn);
  }

  public addMonAn(body:{[index: string]:any}) {
    return this.http.post(this.urlMonAn, body)
  }

  public getMonAnDetail(id: string) :Observable<MonAn> {
    return this.http.get<MonAn>(this.urlMonAn + '/' + id);
  }

  public putMonAn(id: string, body:{[index: string]:any}) {
    return this.http.put(this.urlMonAn + '/' + id, body);
  }

  public deleteMonAn(id: string) {
    return this.http.delete(this.urlMonAn + '/' + id);
  }
}
