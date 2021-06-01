import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ChiTietKiemKe } from '../models/chi-tiet-kiem-ke';
import { PhieuKiemKe } from '../models/phieu-kiem-ke';

@Injectable({
  providedIn: 'root'
})
export class PhieuKiemKeService {
  api = environment.apiUrl + '/phieukiemke'
  constructor(private http: HttpClient) { }

  public addPhieuKiemKe(body: {[index: string]: any}) {
    return this.http.post(this.api, body);
  }

  public updatePhieuKiemKe(id:string, body: {[index: string]: any}){
    return this.http.put(this.api + '/'+ id , body);
  }

  public getListPhieuKiemKe():Observable<PhieuKiemKe[]>{
    return this.http.get<PhieuKiemKe[]>(this.api);
  }

  public getByIdPhieuKiemKe(id: string ):Observable<PhieuKiemKe>{
    return this.http.get<PhieuKiemKe>(this.api + '/' + id);
  }

  public deletePhieuKiemKe(id: string){
    return this.http.delete(this.api + '/' + id);
  }

  public getChiTietYeuCauFromPKK(id: string):Observable<ChiTietKiemKe[]>{
    return this.http.get<ChiTietKiemKe[]>(this.api + '/' + id + '/chitietphieu');
  }

}
