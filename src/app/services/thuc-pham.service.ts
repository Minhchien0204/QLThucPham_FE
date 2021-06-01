import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ThucPham } from '../models/thu-pham';

@Injectable({
  providedIn: 'root'
})
export class ThucPhamService {
  api = environment.apiUrl + '/thucpham'
  constructor(private http: HttpClient) { }


  public getListThucPham():Observable<ThucPham[]>{
    return this.http.get<ThucPham[]>(this.api);
  }

  public getByIdThucPham(id: string):Observable<ThucPham>{
    return this.http.get<ThucPham>(this.api + '/' + id);
  }
}
