import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ChiTietCungCap } from '../models/chi-tiet-cung-cap';
import { PhieuCungCap, PhieuCungCapUpdate } from '../models/phieu-cung-cap';


@Injectable({
  providedIn: 'root'
})
export class PhieuCungCapService {
  api = environment.apiUrl + '/phieucungcap'
  constructor(private http: HttpClient) { }

  public addPhieuCungCap(body: {[index: string]: any}) {
    return this.http.post(this.api, body);
  }

  public updatePhieuCungCap(id:string, body: {[index: string]: any}){
    return this.http.put(this.api + '/'+ id , body);
  }

  public getListPhieuCungCap():Observable<PhieuCungCap[]>{
    return this.http.get<PhieuCungCap[]>(this.api);
  }

  public getByIdPhieuCungCap(id: string ):Observable<PhieuCungCap>{
    return this.http.get<PhieuCungCap>(this.api + '/' + id);
  }

  public deletePhieuCungCap(id: string){
    return this.http.delete(this.api + '/' + id);
  }

  public updateTrangThai(id: string,phieucungcap: PhieuCungCapUpdate){
    return this.http.put(this.api + '/' + id, phieucungcap); 
  }

  public getChiTietYeuCauFromPCC(id: string):Observable<ChiTietCungCap[]>{
    return this.http.get<ChiTietCungCap[]>(this.api + '/' + id + '/chitietphieu');
  }
}
