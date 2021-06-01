import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ChiTietKiemKe } from '../models/chi-tiet-kiem-ke';

@Injectable({
  providedIn: 'root'
})
export class ChiTietKiemKeService {
  api = environment.apiUrl + '/chitietkiemke'
  constructor(private http: HttpClient) { }

  public getListChiTietKiemKe():Observable<ChiTietKiemKe[]>{
    return this.http.get<ChiTietKiemKe[]>(this.api);
  }

  public getByIdChiTietKiemKe(id: string):Observable<ChiTietKiemKe>{
    return this.http.get<ChiTietKiemKe>(this.api + '/' + id);
  }


  public deleteChiTietKiemKe(id: string){
    return this.http.delete(this.api + '/' + id);
  }

  public updateChiTietKiemKe(id: string, body: {[index: string]: any}){
    return this.http.put(this.api + '/' + id, body);
  }

  public addChiTietKiemKe( body: {[index: string]: any}){
    return this.http.post(this.api, body);
  }
}
