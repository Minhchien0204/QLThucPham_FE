import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NhaCungCapService } from 'src/app/services/nha-cung-cap.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-list-nha-cung-cap',
  templateUrl: './list-nha-cung-cap.component.html',
  styleUrls: ['./list-nha-cung-cap.component.css']
})
export class ListNhaCungCapComponent implements OnInit {
  displayedColumns: string[] = ['maNhaCungCap', 'tenNhaCungCap', 'dienThoai', 'diaChi', 'chucNang']
  columnName: {[index: string]: any} = {
    'maNhaCungCap': 'Mã Nhà Cung Cấp',
    'tenNhaCungCap': 'Tên Nhà Cung Cấp',
    'dienThoai': 'Điện Thoại',
    'diaChi': 'Địa Chỉ',
    'chucNang': 'Chức Năng'
  }


  dataSource!: MatTableDataSource<object>;
  data:any[] = [];
  alerMsg: {[index: string]:any} = {
    "showMsg": false,
    "typeMsg": 'info',
    "contentMsg": ''
  }
  @ViewChild(MatPaginator) paginator!:MatPaginator;
  constructor(
    private nhaCungCapService: NhaCungCapService,
    private titleService: Title,
    private router: Router
  ) { 
    this.titleService.setTitle('Danh sách nhà cung cấp');
    if (this.router.getCurrentNavigation()?.extras.state) {
      this.alerMsg['showMsg'] = true;
      this.alerMsg['typeMsg'] = this.router.getCurrentNavigation()?.extras.state?.typeMsg;
      this.alerMsg['contentMsg'] = this.router.getCurrentNavigation()?.extras.state?.contentMsg;
    }
  }

  ngOnInit(): void {
    this.getListNhaCungCap();
  }

  async getListNhaCungCap() {
    const dataGet: any[] = [];
    const getNhaCungCap = this.nhaCungCapService.getListNhaCungCap().toPromise().then(
      async (dataSource) => {
        dataSource.map((nhacungcap) => {
          dataGet.push(nhacungcap);
        })
      },
      (error) => {
        //do notthing
      }
    )
    await Promise.all([getNhaCungCap]);
    this.data = dataGet;
    this.dataSource = new MatTableDataSource(this.data);
    this.dataSource.paginator = this.paginator;
  }

  async deleteNhaCungCap(id: string){
    if(confirm("Bạn có chắc muốn delete ?")) {
      const deleteUser = this.nhaCungCapService.deleteNhaCungCap(id).toPromise().then(
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
  
      await Promise.all([deleteUser]);
      this.ngOnInit();
    }
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
