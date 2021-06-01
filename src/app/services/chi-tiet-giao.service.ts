import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ChiTietGiao } from '../models/chi-tiet-giao';

@Injectable({
  providedIn: 'root'
})
export class ChiTietGiaoService {
  api = environment.apiUrl + '/chitietgiao'
  constructor(private http: HttpClient) { }

  public getListChiTietGiao():Observable<ChiTietGiao[]>{
    return this.http.get<ChiTietGiao[]>(this.api);
  }

  public getByIdChiTietGiao(id: string):Observable<ChiTietGiao>{
    return this.http.get<ChiTietGiao>(this.api + '/' + id);
  }


  public deleteChiTietGiao(id: string){
    return this.http.delete(this.api + '/' + id);
  }

  public updateChiTietGiao(id: string, body: {[index: string]: any}){
    return this.http.put(this.api + '/' + id, body);
  }

  public addChiTietGiao( body: {[index: string]: any}){
    return this.http.post(this.api, body);
  }
}
