import {OnInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { NgxSpinnerService } from "ngx-spinner";
import {NhanvienService} from '../../../service/nhanvien.service';


// export interface NhanVien {
//   id: number,
//   maNhanVien: string,
//   name: string,
//   diaChi: string,
//   dienThoai: string,
//   ngaySinh: string,
//   tenBoPhan: string,
// }

type json_list = {
  [key: string]: string
}

@Component({
  selector: 'app-list-nhan-vien',
  templateUrl: './list-nhan-vien.component.html',
  styleUrls: ['./list-nhan-vien.component.css']
})
export class ListNhanVienComponent implements OnInit  {

  displayedColumns: string[] = ['maNhanVien', 'name', 'diaChi', 'dienThoai', 'ngaySinh', 'tenBoPhan', 'chucNang'];
  columnName: {[index: string]:any} = {
    "maNhanVien": "Mã nhân viên",
    "name": "Tên nhân viên", 
    "diaChi": "Địa chỉ", 
    "dienThoai": "Điện thoại", 
    "ngaySinh": "Ngày sinh", 
    "tenBoPhan": "Tên bộ phận"
  }
  dataSource!: MatTableDataSource<object>;
  data: any[]= [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor( private nhanVienService: NhanvienService ) { } 

  ngOnInit() {
    this.getListNhanVien();
  }
  async getListNhanVien() {
    const dataGet: any[] = [];
    const getNhanVien = this.nhanVienService.getListNhanVien().toPromise().then(
      async (dataResponse) => {
        console.log('get dc')
        dataResponse.map((nhanvien) => {
          dataGet.push(nhanvien)
        })
      },
      (error)=>{
        // do notthing
        console.log(error)
      }
    );
    await Promise.all([getNhanVien]);
    this.data = dataGet;
    this.dataSource = new MatTableDataSource(this.data);
    this.dataSource.paginator = this.paginator;
  }
}