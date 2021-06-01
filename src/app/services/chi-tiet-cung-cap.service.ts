import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ChiTietCungCap } from '../models/chi-tiet-cung-cap';

@Injectable({
  providedIn: 'root'
})
export class ChiTietCungCapService {
  api = environment.apiUrl + '/chitietcungcap'
  constructor(private http: HttpClient) { }

  public getListChiTietCungCap():Observable<ChiTietCungCap[]>{
    return this.http.get<ChiTietCungCap[]>(this.api);
  }

  public getByIdChiTietCungCap(id: string):Observable<ChiTietCungCap>{
    return this.http.get<ChiTietCungCap>(this.api + '/' + id);
  }


  public deleteChiTietCungCap(id: string){
    return this.http.delete(this.api + '/' + id);
  }

  public updateChiTietCungCap(id: string, body: {[index: string]: any}){
    return this.http.put(this.api + '/' + id, body);
  }

  public addChiTietCungCap( body: {[index: string]: any}){
    return this.http.post(this.api, body);
  }
}
