import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { PhieuKiemKeService } from 'src/app/services/phieu-kiem-ke.service';
import { Title } from '@angular/platform-browser';
import { User } from 'src/app/models/user';
import { AuthenticationService } from 'src/app/services/authentication.service';


@Component({
  selector: 'app-list-phieu-kiem-ke',
  templateUrl: './list-phieu-kiem-ke.component.html',
  styleUrls: ['./list-phieu-kiem-ke.component.css']
})
export class ListPhieuKiemKeComponent implements OnInit {
  displayedColumns: string[] = ['soPhieuKiemKe','maNhanVien', 'name', 'ngayLap', 'ghiChu', 'chucNang'];
  columnName: {[index: string]:any} = {
    'soPhieuKiemKe': 'Số Phiếu Kiểm Kê',
    'maNhanVien': 'Mã Nhân Viên',
    'name': 'Họ và tên',
    'ngayLap': 'Ngày Lập', 
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
  currentUser!: User
  constructor(
    private router: Router,
    private titleService: Title,

    private phieuKiemKeService: PhieuKiemKeService,
    private authenService: AuthenticationService
  ) { 
    this.titleService.setTitle('Danh sách phiếu kiểm kê');
    if (this.router.getCurrentNavigation()?.extras.state) {
      this.alerMsg['showMsg'] = true;
      this.alerMsg['typeMsg'] = this.router.getCurrentNavigation()?.extras.state?.typeMsg;
      this.alerMsg['contentMsg'] = this.router.getCurrentNavigation()?.extras.state?.contentMsg;
    };
    this.currentUser = this.authenService.userValue;
  }

  ngOnInit(): void {
    this.getListPhieuKiemKe();
  }

  async getListPhieuKiemKe(){
    const dataGet: any[] = [];
    const getPhieuKiemKe = this.phieuKiemKeService.getListPhieuKiemKe().toPromise().then(
      async (dataResponse) => {
        dataResponse.map((phieubangiao) => {
          dataGet.push(phieubangiao);
        })
      },
      (error)=>{
        // do notthing
      }
    );
    await Promise.all([getPhieuKiemKe]);
    this.data = dataGet;
    this.dataSource = new MatTableDataSource(this.data);
    this.dataSource.paginator = this.paginator;
  }


  async deletePhieuKiemKe(id: string) {
    if(this.currentUser.role != "Admin" && this.currentUser.role != "NhaBep")
    {
      this.alerMsg['showMsg'] = true;
      this.alerMsg['typeMsg'] = 'danger';
      this.alerMsg['contentMsg'] = 'Không được phép xóa';
    }
    else{
      if(confirm("Bạn có chắc muốn delete ?")) {
        const deletePhieuKiemKe = this.phieuKiemKeService.deletePhieuKiemKe(id).toPromise().then(
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
    
        await Promise.all([deletePhieuKiemKe]);
        this.ngOnInit();
      }
    }
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
