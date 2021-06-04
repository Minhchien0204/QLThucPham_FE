import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { BoPhanService } from 'src/app/services/bo-phan.service';

@Component({
  selector: 'app-list-nhan-vien-from-bp',
  templateUrl: './list-nhan-vien-from-bp.component.html',
  styleUrls: ['./list-nhan-vien-from-bp.component.css']
})
export class ListNhanVienFromBpComponent implements OnInit {
  displayedColumns: string[] = ['hoTen','diaChi', 'ngaySinh', 'gioiTinh', 'dienThoai'];
  columnName: {[index: string]:any} = {
    'hoTen': 'Họ và tên',
    'diaChi': 'Địa chỉ', 
    'ngaySinh': 'Ngày sinh',
    'gioiTinh': 'Giới tính', 
    'dienThoai': 'Điện thoại'
  }
  dataSource!: MatTableDataSource<object>;
  data: any[]= [];
  alerMsg: {[index: string]:any} = {
    "showMsg": false,
    "typeMsg": 'info',
    "contentMsg": ''
  }
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  maBoPhan: string = "";
  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private boPhanService: BoPhanService
  ) {
    this.activeRoute.params.subscribe((param)=> {
      this.maBoPhan = param['id'];
    });
   }

  ngOnInit(): void {
    this.getListNhanVien();
  }

  async getListNhanVien() {
    const dataGet: any[] = [];
    const getNhanVien = this.boPhanService.getNhanVienFromBoPhan(this.maBoPhan).toPromise().then(
      async (dataResponse) => {
        dataResponse.map((nhanvien) => {
          dataGet.push( nhanvien)
        })
      },
      (error)=>{
        // do notthing
      }
    );
    await Promise.all([getNhanVien]);
    this.data = dataGet;
    this.dataSource = new MatTableDataSource(this.data);
    this.dataSource.paginator = this.paginator;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
