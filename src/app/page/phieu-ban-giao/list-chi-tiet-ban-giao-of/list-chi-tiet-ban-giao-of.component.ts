import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ChiTietBanGiaoService } from 'src/app/services/chi-tiet-ban-giao.service';
import { PhieuBanGiaoService } from 'src/app/services/phieu-ban-giao.service';

@Component({
  selector: 'app-list-chi-tiet-ban-giao-of',
  templateUrl: './list-chi-tiet-ban-giao-of.component.html',
  styleUrls: ['./list-chi-tiet-ban-giao-of.component.css']
})
export class ListChiTietBanGiaoOfComponent implements OnInit {
  displayedColumns: string[] = ['soPhieuBanGiao','maThucPham', 'tenThucPham', 'soLuong', 'chucNang'];
  columnName: {[index: string]:any} = {
    'soPhieuBanGiao': 'Số Phiếu Bàn Giao',
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
  soPhieuBanGiao: string = ""
  constructor(
    private phieuBanGiaoService: PhieuBanGiaoService,
    private router: Router,
    private activeRoute: ActivatedRoute ,
    private chiTietBanGiaoService: ChiTietBanGiaoService
  ) { 
    this.activeRoute.params.subscribe((param) => {
      this.soPhieuBanGiao = param['id'];
    })
  }

  ngOnInit(): void {
    this.getListChiTietBanGiao();

  }

  async getListChiTietBanGiao(){
    const dataGet: any[] = [];
    const getChiTietBanGiao = this.phieuBanGiaoService.getChiTietYeuCauFromPBG(this.soPhieuBanGiao).toPromise().then(
      async (dataResponse) => {
        dataResponse.map((chitietbangiao) => {
          dataGet.push(chitietbangiao);
        })
      },
      (error)=>{
        // do notthing
      }
    );
    await Promise.all([getChiTietBanGiao]);
    this.data = dataGet;
    this.dataSource = new MatTableDataSource(this.data);
    this.dataSource.paginator = this.paginator;
  }

  async deleteChiTietBanGiao(id: string) {
    if(confirm("Bạn có chắc muốn delete ?")) {
      const deleteChiTietBanGiao = this.chiTietBanGiaoService.deleteChiTietBanGiao(id).toPromise().then(
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
  
      await Promise.all([deleteChiTietBanGiao]);
      this.ngOnInit();
    }
    
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
