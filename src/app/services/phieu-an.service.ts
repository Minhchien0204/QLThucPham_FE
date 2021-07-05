import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PhieuAn, PhieuAnUpdate } from '../models/phieu-an';

@Injectable({
  providedIn: 'root'
})
export class PhieuAnService {
  api = environment.apiUrl + '/phieuan'

  constructor(private http: HttpClient) { }

  public addPhieuAn(body: {[index: string]: any}){
    return this.http.post(this.api, body);
  }

  public updatePhieuAn(id:string, body: {[index: string]: any}){
    return this.http.put(this.api + '/'+ id , body);
  }

  public getListPhieuAn():Observable<PhieuAn[]>{
    return this.http.get<PhieuAn[]>(this.api);
  }

  public getByIdPhieuAn(id: string ):Observable<PhieuAn>{
    return this.http.get<PhieuAn>(this.api + '/' + id);
  }

  public deletePhieuAn(id: string){
    return this.http.delete(this.api + '/' + id);
  }

  public updateTrangThai(id: string,phieuan: PhieuAnUpdate){
    return this.http.put(this.api + '/' + id, phieuan); 
  }
}
