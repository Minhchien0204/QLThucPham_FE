import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ChiTietKiemKeService } from 'src/app/services/chi-tiet-kiem-ke.service';
import { PhieuKiemKeService } from 'src/app/services/phieu-kiem-ke.service';
import { ChiTietKiemKeComponent } from '../chi-tiet-kiem-ke/chi-tiet-kiem-ke/chi-tiet-kiem-ke.component';

@Component({
  selector: 'app-list-chi-tiet-kiem-ke-of',
  templateUrl: './list-chi-tiet-kiem-ke-of.component.html',
  styleUrls: ['./list-chi-tiet-kiem-ke-of.component.css']
})
export class ListChiTietKiemKeOfComponent implements OnInit {
  displayedColumns: string[] = ['soPhieuKiemKe','maThucPham', 'tenThucPham', 'soLuong', 'chatLuong', 'chucNang'];
  columnName: {[index: string]:any} = {
    'soPhieuKiemKe': 'Số Phiếu Kiểm Kê',
    'maThucPham': 'Mã Thực Phẩm', 
    'tenThucPham': 'Tên Thực Phẩm',
    'soLuong': 'Số Lượng', 
    'chatLuong': 'Chất Lượng', 
    'chucNang': 'Chức Năng'
  }
  dataSource!: MatTableDataSource<object>;
  data: any[]= [];
  alerMsg: {[index: string]:any} = {
    "showMsg": false,
    "typeMsg": 'info',
    "contentMsg": ''
  }
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  soPhieuKiemKe: string = ""
  constructor(
    private phieuKiemKeService: PhieuKiemKeService,
    private router: Router,
    private activeRoute: ActivatedRoute ,
    private chiTietKiemKeService: ChiTietKiemKeService
  ) {
    this.activeRoute.params.subscribe((param) => {
      this.soPhieuKiemKe = param['id'];
    })
   }

  ngOnInit(): void {
    this.getListChiTietKiemKe();
  }

  async getListChiTietKiemKe(){
    const dataGet: any[] = [];
    const getChiTietKiemKe = this.phieuKiemKeService.getChiTietYeuCauFromPKK(this.soPhieuKiemKe).toPromise().then(
      async (dataResponse) => {
        dataResponse.map((chitietkiemke) => {
          dataGet.push(chitietkiemke);
        })
      },
      (error)=>{
        // do notthing
      }
    );
    await Promise.all([getChiTietKiemKe]);
    this.data = dataGet;
    this.dataSource = new MatTableDataSource(this.data);
    this.dataSource.paginator = this.paginator;
  }

  async deleteChiTietKiemKe(id: string) {
    if(confirm("Bạn có chắc muốn delete ?")) {
      const deleteChiTietKiemKe = this.chiTietKiemKeService.deleteChiTietKiemKe(id).toPromise().then(
        () => {
          this.alerMsg['showMsg'] = true;
          this.alerMsg['typeMsg'] = 'success';
          this.alerMsg['contentMsg'] = 'Delete success';
        },
        () => {
          this.alerMsg['showMsg'] = true;
          this.alerMsg['typeMsg'] = 'danger';
          this.alerMsg['contentMsg'] = 'Delete failed!';
        }
      );
  
      await Promise.all([deleteChiTietKiemKe]);
      this.ngOnInit();
    }
    
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
