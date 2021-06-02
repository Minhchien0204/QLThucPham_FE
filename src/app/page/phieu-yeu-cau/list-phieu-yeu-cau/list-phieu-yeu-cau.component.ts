import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { PhieuYeuCauUpdate } from 'src/app/models/phieu-yeu-cau';
import { PhieuYeuCauService } from 'src/app/services/phieu-yeu-cau.service';

@Component({
  selector: 'app-list-phieu-yeu-cau',
  templateUrl: './list-phieu-yeu-cau.component.html',
  styleUrls: ['./list-phieu-yeu-cau.component.css']
})
export class ListPhieuYeuCauComponent implements OnInit {
  displayedColumns: string[] = ['soPhieuYeuCau','maNhanVien', 'name', 'ngayLap', 'trangThai', 'ghiChu', 'chucNang'];
  columnName: {[index: string]:any} = {
    'soPhieuYeuCau': 'Số Phiếu Yêu Cầu',
    'maNhanVien': 'Mã Nhân Viên',
    'name': 'Họ và tên',
    'ngayLap': 'Ngày Lập', 
    'trangThai': 'Trạng Thái', 
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
  phieuyeucau1!: PhieuYeuCauUpdate;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(
    private router: Router,
    private phieuYeuCauService: PhieuYeuCauService
  ) { 
    if (this.router.getCurrentNavigation()?.extras.state) {
      this.alerMsg['showMsg'] = true;
      this.alerMsg['typeMsg'] = this.router.getCurrentNavigation()?.extras.state?.typeMsg;
      this.alerMsg['contentMsg'] = this.router.getCurrentNavigation()?.extras.state?.contentMsg;
    }
  }

  ngOnInit(): void {
    this.getListPhieuYeuCau();
  }

  async xacNhanPhieu(id: string){
    const get1 = this.phieuYeuCauService.getByIdPhieuYeuCau(id).toPromise().then(
      (dataphieuan) => {
        this.phieuyeucau1 = dataphieuan;
        this.phieuyeucau1.trangThai = true;
      }
    );
    await Promise.all([get1]);
    console.log(this.phieuyeucau1)
    const get2 = this.phieuYeuCauService.updateTrangThai(id,this.phieuyeucau1).toPromise().then(
      ()=>{
        this.alerMsg['showMsg'] = true;
        this.alerMsg['typeMsg'] = 'success';
        this.alerMsg['contentMsg'] = 'success';
      
    });
    await Promise.all([get2]);
    this.ngOnInit();
  }

  async getListPhieuYeuCau(){
    const dataGet: any[] = [];
    const getPhieuYeuCau = this.phieuYeuCauService.getListPhieuYeuCau().toPromise().then(
      async (dataResponse) => {
        dataResponse.map((phieuyeucau) => {
          dataGet.push(phieuyeucau);
        })
      },
      (error)=>{
        // do notthing
      }
    );
    await Promise.all([getPhieuYeuCau]);
    this.data = dataGet;
    this.dataSource = new MatTableDataSource(this.data);
    this.dataSource.paginator = this.paginator;
  }

  async deletePhieuYeuCau(id: string) {
    if(confirm("Bạn có chắc muốn delete ?")) {
      const deletePhieuYeuCau = this.phieuYeuCauService.deletePhieuYeuCau(id).toPromise().then(
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
  
      await Promise.all([deletePhieuYeuCau]);
      this.ngOnInit();
    }
    
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
