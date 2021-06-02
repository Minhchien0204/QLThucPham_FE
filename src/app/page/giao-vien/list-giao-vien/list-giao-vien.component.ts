import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { GiaoVienService } from 'src/app/services/giao-vien.service';
import { LopService } from 'src/app/services/lop.service';

@Component({
  selector: 'app-list-giao-vien',
  templateUrl: './list-giao-vien.component.html',
  styleUrls: ['./list-giao-vien.component.css']
})
export class ListGiaoVienComponent implements OnInit {
  displayedColumns: string[] = ['maGV','name', 'trinhDo', 'ngayVao', 'maLop']
  columnName: {[index : string]: any} = {
    'maGV': 'Mã Giáo Viên',
    'name': 'Họ Và Tên',
    'trinhDo': 'Trình Độ',
    'ngayVao': 'Ngày Vào',
    'maLop': 'Lớp'
  }

  dataSource!: MatTableDataSource<object>;
  data: any[] = [];
  alerMsg: {[index: string]:any} = {
    "showMsg": false,
    "typeMsg": 'info',
    "contentMsg": ''
  }
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(
    private giaoVienService: GiaoVienService,
    private router: Router
  ) {  
    if (this.router.getCurrentNavigation()?.extras.state) {
      this.alerMsg['showMsg'] = true;
      this.alerMsg['typeMsg'] = this.router.getCurrentNavigation()?.extras.state?.typeMsg;
      this.alerMsg['contentMsg'] = this.router.getCurrentNavigation()?.extras.state?.contentMsg;
    }
  }

  ngOnInit(): void {
    this.getListGiaoVien();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  async getListGiaoVien(){
    const dataGet: any[] = [];
    const getGiaoVien = this.giaoVienService.getListGiaoVien().toPromise().then(
      async (dataSource) => {
          dataSource.map((giaovien) => {
            dataGet.push(giaovien)
          })
      },
      (error)=>{
        // do notthing
      }
    );
    await Promise.all([getGiaoVien]);
    this.data =dataGet;
    this.dataSource = new MatTableDataSource(this.data);
    this.dataSource.paginator = this.paginator;
  }

}
