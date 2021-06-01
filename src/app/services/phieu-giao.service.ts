import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ChiTietGiao } from '../models/chi-tiet-giao';
import { PhieuGiao } from '../models/phieu-giao';

@Injectable({
  providedIn: 'root'
})
export class PhieuGiaoService {
  api = environment.apiUrl + '/phieugiao'
  constructor(private http: HttpClient) { }

  public addPhieuGiao(body: {[index: string]: any}) {
    return this.http.post(this.api, body);
  }

  public updatePhieuGiao(id:string, body: {[index: string]: any}){
    return this.http.put(this.api + '/'+ id , body);
  }

  public getListPhieuGiao():Observable<PhieuGiao[]>{
    return this.http.get<PhieuGiao[]>(this.api);
  }

  public getByIdPhieuGiao(id: string ):Observable<PhieuGiao>{
    return this.http.get<PhieuGiao>(this.api + '/' + id);
  }

  public deletePhieuGiao(id: string){
    return this.http.delete(this.api + '/' + id);
  }

  public getChiTietGiaoFromPG(id: string):Observable<ChiTietGiao[]>{
    return this.http.get<ChiTietGiao[]>(this.api + '/' + id + '/chitietphieu');
  }

}
