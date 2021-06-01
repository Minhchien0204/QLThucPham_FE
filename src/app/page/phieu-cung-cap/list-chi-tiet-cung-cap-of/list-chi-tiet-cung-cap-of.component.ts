import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ChiTietCungCapService } from 'src/app/services/chi-tiet-cung-cap.service';
import { PhieuCungCapService } from 'src/app/services/phieu-cung-cap.service';

@Component({
  selector: 'app-list-chi-tiet-cung-cap-of',
  templateUrl: './list-chi-tiet-cung-cap-of.component.html',
  styleUrls: ['./list-chi-tiet-cung-cap-of.component.css']
})
export class ListChiTietCungCapOfComponent implements OnInit {
  displayedColumns: string[] = ['soPhieuCugCap','maThucPham', 'tenThucPham' , 'maNhaCungCap' , 'tenNhaCungCap', 'soLuong', 'chucNang'];
  columnName: {[index: string]:any} = {
    'soPhieuCugCap': 'Số Phiếu Cung Cấp',
    'maThucPham': 'Mã Thực Phẩm', 
    'tenThucPham': 'Tên Thực Phẩm',
    'maNhaCungCap': 'Mã Nhà Cung Cấp', 
    'tenNhaCungCap': 'Tên Nhà Cung Cấp', 
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
  soPhieuCugCap: string = "";
  constructor(
    private phieuCungCapService: PhieuCungCapService,
    private router: Router,
    private activeRoute: ActivatedRoute ,
    private chiTietCungCapService: ChiTietCungCapService
  ) { 
    this.activeRoute.params.subscribe((param) => {
      this.soPhieuCugCap = param['id'];
    })
   }

  ngOnInit(): void {
    this.getListChiTietCungCap();
  }

  async getListChiTietCungCap(){
    const dataGet: any[] = [];
    const getChiTietCungCap = this.phieuCungCapService.getChiTietYeuCauFromPCC(this.soPhieuCugCap).toPromise().then(
      async (dataResponse) => {
        dataResponse.map((chitietcungcap) => {
          dataGet.push(chitietcungcap);
        })
      },
      (error)=>{
        // do notthing
      }
    );
    await Promise.all([getChiTietCungCap]);
    this.data = dataGet;
    this.dataSource = new MatTableDataSource(this.data);
    this.dataSource.paginator = this.paginator;
  }

  async deleteChiTietCungCap(id: string) {
    if(confirm("Bạn có chắc muốn delete ?")) {
      const deleteChiTietCungCap = this.chiTietCungCapService.deleteChiTietCungCap(id).toPromise().then(
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
  
      await Promise.all([deleteChiTietCungCap]);
      this.ngOnInit();
    }
    
  }

}
