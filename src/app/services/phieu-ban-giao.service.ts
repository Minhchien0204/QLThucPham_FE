import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ChiTietBanGiao } from '../models/chi-tiet-ban-giao';
import { PhieuBanGiao } from '../models/phieu-ban-giao';

@Injectable({
  providedIn: 'root'
})
export class PhieuBanGiaoService {
  api = environment.apiUrl + '/phieubangiao'
  constructor(private http: HttpClient) { }


  public addPhieuBanGiao(body: {[index: string]: any}) {
    return this.http.post(this.api, body);
  }

  public updatePhieuBanGiao(id:string, body: {[index: string]: any}){
    return this.http.put(this.api + '/'+ id , body);
  }

  public getListPhieuBanGiao():Observable<PhieuBanGiao[]>{
    return this.http.get<PhieuBanGiao[]>(this.api);
  }

  public getByIdPhieuBanGiao(id: string ):Observable<PhieuBanGiao>{
    return this.http.get<PhieuBanGiao>(this.api + '/' + id);
  }

  public deletePhieuBanGiao(id: string){
    return this.http.delete(this.api + '/' + id);
  }

  public getChiTietYeuCauFromPBG(id: string):Observable<ChiTietBanGiao[]>{
    return this.http.get<ChiTietBanGiao[]>(this.api + '/' + id + '/chitietphieu');
  }

}
