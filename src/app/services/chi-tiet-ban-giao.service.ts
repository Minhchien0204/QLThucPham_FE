import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ChiTietBanGiao } from '../models/chi-tiet-ban-giao';

@Injectable({
  providedIn: 'root'
})
export class ChiTietBanGiaoService {
  api = environment.apiUrl + '/chitietbangiao';
  constructor(private http: HttpClient) { }

  public getListChiTietBanGiao():Observable<ChiTietBanGiao[]>{
    return this.http.get<ChiTietBanGiao[]>(this.api);
  }

  public getByIdChiTietBanGiao(id: string):Observable<ChiTietBanGiao>{
    return this.http.get<ChiTietBanGiao>(this.api + '/' + id);
  }


  public deleteChiTietBanGiao(id: string){
    return this.http.delete(this.api + '/' + id);
  }

  public updateChiTietBanGiao(id: string, body: {[index: string]: any}){
    return this.http.put(this.api + '/' + id, body);
  }

  public addChiTietBanGiao( body: {[index: string]: any}){
    return this.http.post(this.api, body);
  }
}
