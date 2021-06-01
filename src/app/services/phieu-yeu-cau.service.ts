import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ChiTietYeuCau } from '../models/chi-tiet-yeu-cau';
import { PhieuYeuCau, PhieuYeuCauUpdate } from '../models/phieu-yeu-cau';

@Injectable({
  providedIn: 'root'
})
export class PhieuYeuCauService {
  api = environment.apiUrl + '/phieuyeucau'

  constructor(private http: HttpClient) { }

  public addPhieuYeuCau(body: {[index: string]: any}) {
    return this.http.post(this.api, body);
  }

  public updatePhieuYeuCau(id:string, body: {[index: string]: any}){
    return this.http.put(this.api + '/'+ id , body);
  }

  public getListPhieuYeuCau():Observable<PhieuYeuCau[]>{
    return this.http.get<PhieuYeuCau[]>(this.api);
  }

  public getByIdPhieuYeuCau(id: string ):Observable<PhieuYeuCau>{
    return this.http.get<PhieuYeuCau>(this.api + '/' + id);
  }

  public deletePhieuYeuCau(id: string){
    return this.http.delete(this.api + '/' + id);
  }

  public updateTrangThai(id: string,phieuan: PhieuYeuCauUpdate){
    return this.http.put(this.api + '/' + id, phieuan); 
  }

  public getChiTietYeuCauFromPYC(id: string):Observable<ChiTietYeuCau[]>{
    return this.http.get<ChiTietYeuCau[]>(this.api + '/' + id + '/chitietphieu');
  }
}
