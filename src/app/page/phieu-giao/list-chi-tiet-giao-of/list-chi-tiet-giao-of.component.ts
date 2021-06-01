import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ChiTietGiaoService } from 'src/app/services/chi-tiet-giao.service';
import { NhaCungCapService } from 'src/app/services/nha-cung-cap.service';
import { PhieuGiaoService } from 'src/app/services/phieu-giao.service';

@Component({
  selector: 'app-list-chi-tiet-giao-of',
  templateUrl: './list-chi-tiet-giao-of.component.html',
  styleUrls: ['./list-chi-tiet-giao-of.component.css']
})
export class ListChiTietGiaoOfComponent implements OnInit {
  displayedColumns: string[] = ['soPhieuGiao','maThucPham', 'tenThucPham','maNhaCungCap','tenNhaCungCap', 'soLuong', 'donGia', 'chucNang'];
  columnName: {[index: string]:any} = {
    'soPhieuGiao': 'Số Phiếu Giao',
    'maThucPham': 'Mã Thực Phẩm', 
    'tenThucPham': 'Tên Thực Phẩm',
    'maNhaCungCap': 'Mã Nhà Cung Cấp', 
    'tenNhaCungCap': 'Tên Nhà Cung Cấp', 
    'soLuong': 'Số Lượng', 
    'donGia': 'Đơn Giá(VND)', 
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
  soPhieuGiao: string = ""
  constructor(
    private phieuGiaoService: PhieuGiaoService,
    private router: Router,
    private activeRoute: ActivatedRoute ,
    private chiTietGiaoService: ChiTietGiaoService,
    private nhaCungCapService: NhaCungCapService
  ) {
    this.activeRoute.params.subscribe((param) => {
      this.soPhieuGiao = param['id'];
    })
   }

  ngOnInit(): void {
    this.getListChiTietGiao();
  }

  async getListChiTietGiao(){
    const dataGet: any[] = [];
    const getChiTietGiao = this.phieuGiaoService.getChiTietGiaoFromPG(this.soPhieuGiao).toPromise().then(
      async (dataResponse) => {
        dataResponse.map((chitietgiao) => {
          dataGet.push(chitietgiao);
        })
      },
      (error)=>{
        // do notthing
      }
    );
    await Promise.all([getChiTietGiao]);
    this.data = dataGet;
    this.dataSource = new MatTableDataSource(this.data);
    this.dataSource.paginator = this.paginator;
  }

  async deleteChiTietGiao(id: string) {
    if(confirm("Bạn có chắc muốn delete ?")) {
      const deleteChiTietGiao = this.chiTietGiaoService.deleteChiTietGiao(id).toPromise().then(
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
  
      await Promise.all([deleteChiTietGiao]);
      this.ngOnInit();
    }
    
  }
}
