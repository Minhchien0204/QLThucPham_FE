import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ChiTietYeuCau } from 'src/app/models/chi-tiet-yeu-cau';
import { ChiTietYeuCauService } from 'src/app/services/chi-tiet-yeu-cau.service';
import { PhieuYeuCauService } from 'src/app/services/phieu-yeu-cau.service';
import { ThucPhamService } from 'src/app/services/thuc-pham.service';

@Component({
  selector: 'app-list-chi-tiet-yeu-cau',
  templateUrl: './list-chi-tiet-yeu-cau.component.html',
  styleUrls: ['./list-chi-tiet-yeu-cau.component.css']
})
export class ListChiTietYeuCauComponent implements OnInit {
  displayedColumns: string[] = ['id','soPhieuYeuCau','maThucPham', 'tenThucPham', 'soLuong', 'chucNang'];
  columnName: {[index: string]:any} = {
    'id': 'ID',
    'soPhieuYeuCau': 'Số Phiếu Yêu Cầu',
    'maThucPham': 'Mã Thực Phẩm', 
    'tenThucPham': 'Tên Thực Phẩm', 
    'soLuong': 'Số lượng',
    'chucNang': 'Chức năng'
  }
  dataSource!: MatTableDataSource<object>;
  data: any[]= [];
  alerMsg: {[index: string]:any} = {
    "showMsg": false,
    "typeMsg": 'info',
    "contentMsg": ''
  }
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(
    private router: Router,
    private phieuYeuCauService: PhieuYeuCauService,
    private thucPhamService: ThucPhamService,
    private chiTietYeuCauService: ChiTietYeuCauService
  ) { 
    if (this.router.getCurrentNavigation()?.extras.state) {
      this.alerMsg['showMsg'] = true;
      this.alerMsg['typeMsg'] = this.router.getCurrentNavigation()?.extras.state?.typeMsg;
      this.alerMsg['contentMsg'] = this.router.getCurrentNavigation()?.extras.state?.contentMsg;
    }
   }

  ngOnInit(): void {
    this.getListChiTietYeuCau();
  }



  async getListChiTietYeuCau(){
    const dataGet: any[] = [];
    const getChiTietYeuCau = this.chiTietYeuCauService.getListChiTietYeuCau().toPromise().then(
      async (dataResponse) => {
        dataResponse.map((chiphieuyeucau) => {
          dataGet.push(chiphieuyeucau)
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

}
