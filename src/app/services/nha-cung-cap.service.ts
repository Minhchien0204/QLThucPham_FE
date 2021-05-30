import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { NhaCungCap } from '../models/nha-cung-cap';

@Injectable({
  providedIn: 'root'
})
export class NhaCungCapService {
  api = environment.apiUrl + '/nhacungcap';
  constructor(private http: HttpClient) { }

  public getListNhaCungCap(): Observable<NhaCungCap[]> {
    return this.http.get<NhaCungCap[]>(this.api);
  }

  public getByIdNhaCungCap(id: string):Observable<NhaCungCap>{
    return this.http.get<NhaCungCap>(this.api + '/' + id);
  }

  public deleteNhaCungCap(id: string){
    return this.http.delete(this.api + '/' + id);
  }

  public updateNhaCungCap(id: string, body: {[index: string]: any}){
    return this.http.put(this.api + '/' + id, body);
  }

  public createNhaCungCap(body: {[index: string]: any}){
    return this.http.post(this.api ,body);
  }
}
