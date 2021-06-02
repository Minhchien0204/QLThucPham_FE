import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { PhieuBanGiaoService } from 'src/app/services/phieu-ban-giao.service';

@Component({
  selector: 'app-list-phieu-ban-giao',
  templateUrl: './list-phieu-ban-giao.component.html',
  styleUrls: ['./list-phieu-ban-giao.component.css']
})
export class ListPhieuBanGiaoComponent implements OnInit {
  displayedColumns: string[] = ['soPhieuBanGiao','maNhanVien', 'name', 'ngayLap', 'soPhieuYeuCau', 'ghiChu', 'chucNang'];
  columnName: {[index: string]:any} = {
    'soPhieuBanGiao': 'Số Phiếu Bàn Giao',
    'maNhanVien': 'Mã Nhân Viên',
    'name': 'Họ và tên',
    'ngayLap': 'Ngày Lập', 
    'soPhieuYeuCau': 'Số Phiếu Yêu Cầu', 
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
  constructor(
    private router: Router,
    private phieuBanGiaoService: PhieuBanGiaoService
  ) {
    if (this.router.getCurrentNavigation()?.extras.state) {
      this.alerMsg['showMsg'] = true;
      this.alerMsg['typeMsg'] = this.router.getCurrentNavigation()?.extras.state?.typeMsg;
      this.alerMsg['contentMsg'] = this.router.getCurrentNavigation()?.extras.state?.contentMsg;
    }
   }

  ngOnInit(): void {
    this.getListPhieuBanGiao();
  }


  async getListPhieuBanGiao(){
    const dataGet: any[] = [];
    const getPhieuBanGiao = this.phieuBanGiaoService.getListPhieuBanGiao().toPromise().then(
      async (dataResponse) => {
        dataResponse.map((phieubangiao) => {
          dataGet.push(phieubangiao);
        })
      },
      (error)=>{
        // do notthing
      }
    );
    await Promise.all([getPhieuBanGiao]);
    this.data = dataGet;
    this.dataSource = new MatTableDataSource(this.data);
    this.dataSource.paginator = this.paginator;
  }

  async deletePhieuBanGiao(id: string) {
    if(confirm("Bạn có chắc muốn delete ?")) {
      const deletePhieuBanGiao = this.phieuBanGiaoService.deletePhieuBanGiao(id).toPromise().then(
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
  
      await Promise.all([deletePhieuBanGiao]);
      this.ngOnInit();
    }
    
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
