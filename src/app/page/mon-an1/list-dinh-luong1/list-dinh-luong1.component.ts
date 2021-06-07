import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { MonAnService } from 'src/app/services/mon-an-service.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-list-dinh-luong1',
  templateUrl: './list-dinh-luong1.component.html',
  styleUrls: ['./list-dinh-luong1.component.css']
})
export class ListDinhLuong1Component implements OnInit {
  displayedColumns: string[] = ['maMonAn','maThucPham', 'tenThucPham', 'soLuong', 'chucNang'];
  columnName: {[index: string]:any} = {
    'maMonAn': 'Mã Món Ăn',
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
  maMonAn: string = ""
  constructor(
    private monAnService: MonAnService,
    private titleService: Title,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) { 
    this.titleService.setTitle('Danh sách định lượng món ăn');
    this.activeRoute.params.subscribe((param) => {
      this.maMonAn = param['id'];
    })
  }

  ngOnInit(): void {
    this.getListDinhLuong();
  }

  async getListDinhLuong(){
    const dataGet: any[] = [];
    const getDinhLuong = this.monAnService.getDinhLuongFromMonAn(this.maMonAn).toPromise().then(
      async (dataResponse) => {
        dataResponse.map((dinhluong) => {
          dataGet.push(dinhluong);
        })
      },
      (error)=>{
        // do notthing
      }
    );
    await Promise.all([getDinhLuong]);
    this.data = dataGet;
    this.dataSource = new MatTableDataSource(this.data);
    this.dataSource.paginator = this.paginator;
  }

  async deleteDinhLuong(id: string) {
    if(confirm("Bạn có chắc muốn delete ?")) {
      const deleteDinhLuong = this.monAnService.getDinhLuongFromMonAn(id).toPromise().then(
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
  
      await Promise.all([deleteDinhLuong]);
      this.ngOnInit();
    }
    
  }
}
