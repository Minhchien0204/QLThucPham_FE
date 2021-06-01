import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ChiTietYeuCau } from '../models/chi-tiet-yeu-cau';

@Injectable({
  providedIn: 'root'
})
export class ChiTietYeuCauService {
  api = environment.apiUrl + '/chitietyeucau';
  constructor(private http: HttpClient) { }

  public getListChiTietYeuCau():Observable<ChiTietYeuCau[]>{
    return this.http.get<ChiTietYeuCau[]>(this.api);
  }

  public getByIdChiTietYeuCau(id: string):Observable<ChiTietYeuCau>{
    return this.http.get<ChiTietYeuCau>(this.api + '/' + id);
  }


  public deleteChiTietYeuCau(id: string){
    return this.http.delete(this.api + '/' + id);
  }

  public updateChiTietYeuCau(id: string, body: {[index: string]: any}){
    return this.http.put(this.api + '/' + id, body);
  }

  public addChiTietYeuCau( body: {[index: string]: any}){
    return this.http.post(this.api, body);
  }
}
