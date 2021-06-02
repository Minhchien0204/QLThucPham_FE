import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ChiTietYeuCauService } from 'src/app/services/chi-tiet-yeu-cau.service';
import { PhieuYeuCauService } from 'src/app/services/phieu-yeu-cau.service';

@Component({
  selector: 'app-list-chi-tiet-yeu-cau-of',
  templateUrl: './list-chi-tiet-yeu-cau-of.component.html',
  styleUrls: ['./list-chi-tiet-yeu-cau-of.component.css']
})
export class ListChiTietYeuCauOfComponent implements OnInit {
  displayedColumns: string[] = ['soPhieuYeuCau','maThucPham', 'tenThucPham', 'soLuong', 'chucNang'];
  columnName: {[index: string]:any} = {
    'soPhieuYeuCau': 'Số Phiếu Yêu Cầu',
    'maThucPham': 'Mã Thực Phẩm', 
    'tenThucPham': 'Tên Thực Phẩm',
    'soLuong': 'Số Lượng', 
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
  soPhieuYeuCau: string = ""
  constructor(
    private phieuYeuCauService: PhieuYeuCauService,
    private router: Router,
    private activeRoute: ActivatedRoute ,
    private chiTietYeuCauService: ChiTietYeuCauService
  ) {
    this.activeRoute.params.subscribe((param) => {
      this.soPhieuYeuCau = param['id'];
    })
   }

  ngOnInit(): void {
    this.getListChiTietYeuCau();
  }

  async getListChiTietYeuCau(){
    const dataGet: any[] = [];
    const getChiTietYeuCau = this.phieuYeuCauService.getChiTietYeuCauFromPYC(this.soPhieuYeuCau).toPromise().then(
      async (dataResponse) => {
        dataResponse.map((chitietyeucau) => {
          dataGet.push(chitietyeucau);
        })
      },
      (error)=>{
        // do notthing
      }
    );
    await Promise.all([getChiTietYeuCau]);
    this.data = dataGet;
    this.dataSource = new MatTableDataSource(this.data);
    this.dataSource.paginator = this.paginator;
  }
  async deleteChiTietYeuCau(id: string) {
    if(confirm("Bạn có chắc muốn delete ?")) {
      const deleteChiTietYeuCau = this.chiTietYeuCauService.deleteChiTietYeuCau(id).toPromise().then(
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
  
      await Promise.all([deleteChiTietYeuCau]);
      this.ngOnInit();
    }
    
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
