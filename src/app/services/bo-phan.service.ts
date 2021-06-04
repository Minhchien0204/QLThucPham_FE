import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BoPhan } from '../models/bo-phan';
import { NhanVien, NhanVienBoPhan } from '../models/nhan-vien';

@Injectable({
  providedIn: 'root'
})
export class BoPhanService {
  api = environment.apiUrl + '/bophan';

  constructor( private http: HttpClient) { }

  public getListBoPhan(): Observable<BoPhan[]> {
    return this.http.get<BoPhan[]>(this.api);
  }

  public getBoPhanDetail(id: string): Observable<BoPhan>{
    return this.http.get<BoPhan>(this.api + '/' + id);
  }

  public deleteBoPhan(id: string) {
    return this.http.delete(this.api + '/' + id);
  }

  public updateBoPhan(id: string, body: {[index: string]: any}){
    return this.http.put(this.api + '/' + id , body);
  }

  public createBoPhan(body: {[index: string]: any}){
    return this.http.post(this.api , body);
  }

  public getNhanVienFromBoPhan(id: string):Observable<NhanVienBoPhan[]>{
    return this.http.get<NhanVienBoPhan[]>(this.api + '/' + id + '/nhanvien');
  }
}
