import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { PhieuGiaoService } from 'src/app/services/phieu-giao.service';
import { Title } from '@angular/platform-browser';
import { User } from 'src/app/models/user';
import { AuthenticationService } from 'src/app/services/authentication.service';


@Component({
  selector: 'app-list-phieu-giao',
  templateUrl: './list-phieu-giao.component.html',
  styleUrls: ['./list-phieu-giao.component.css']
})
export class ListPhieuGiaoComponent implements OnInit {
  displayedColumns: string[] = ['soPhieuGiao','maNhanVien', 'name', 'soPhieuCugCap', 'ngayLap', 'ghiChu', 'chucNang'];
  columnName: {[index: string]:any} = {
    'soPhieuGiao': 'Số Phiếu Giao',
    'maNhanVien': 'Mã Nhân Viên',
    'name': 'Họ và tên',
    'ngayLap': 'Ngày Lập', 
    'soPhieuCugCap': 'Số Phiếu Cung Cấp', 
    'ghiChu': 'Ghi Chú', 
    'chucNang': 'Chức năng'
  }
  dataSource!: MatTableDataSource<object>;
  data: any[]= [];
  alerMsg: {[index: string]:any} = {
    "showMsg": false,
    "typeMsg": 'info',
    "contentMsg": ''
  };
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  currentUser!: User;
  constructor(
    private router: Router,
    private titleService: Title,
    private phieuGiaoService: PhieuGiaoService,
    private authenService: AuthenticationService
  ) { 
    this.titleService.setTitle('Danh sách phiếu giao');
    if (this.router.getCurrentNavigation()?.extras.state) {
      this.alerMsg['showMsg'] = true;
      this.alerMsg['typeMsg'] = this.router.getCurrentNavigation()?.extras.state?.typeMsg;
      this.alerMsg['contentMsg'] = this.router.getCurrentNavigation()?.extras.state?.contentMsg;
    };
    this.currentUser = this.authenService.userValue;
  }

  ngOnInit(): void {
    this.getListPhieuGiao();
  }

  async getListPhieuGiao(){
    const dataGet: any[] = [];
    const getPhieuGiao = this.phieuGiaoService.getListPhieuGiao().toPromise().then(
      async (dataResponse) => {
        dataResponse.map((phieugiao) => {
          dataGet.push(phieugiao);
        })
      },
      (error)=>{
        // do notthing
      }
    );
    await Promise.all([getPhieuGiao]);
    this.data = dataGet;
    this.dataSource = new MatTableDataSource(this.data);
    this.dataSource.paginator = this.paginator;
  }

  async deletePhieuGiao(id: string) {
    if(this.currentUser.role != "Admin" && this.currentUser.role != "ThucPham")
    {
      this.alerMsg['showMsg'] = true;
      this.alerMsg['typeMsg'] = 'danger';
      this.alerMsg['contentMsg'] = 'Không được phép xóa';
    }
    else{
      if(confirm("Bạn có chắc muốn delete ?")) {
        const deletePhieuGiao = this.phieuGiaoService.deletePhieuGiao(id).toPromise().then(
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
    
        await Promise.all([deletePhieuGiao]);
        this.ngOnInit();
      }
      
    }
    
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
