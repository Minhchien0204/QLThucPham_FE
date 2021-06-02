import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { PhieuCungCapUpdate } from 'src/app/models/phieu-cung-cap';
import { PhieuCungCapService } from 'src/app/services/phieu-cung-cap.service';

@Component({
  selector: 'app-list-phieu-cung-cap',
  templateUrl: './list-phieu-cung-cap.component.html',
  styleUrls: ['./list-phieu-cung-cap.component.css']
})
export class ListPhieuCungCapComponent implements OnInit {
  displayedColumns: string[] = ['soPhieuCugCap','maNhanVien', 'name', 'ngayLap', 'trangThai', 'ghiChu', 'chucNang'];
  columnName: {[index: string]:any} = {
    'soPhieuCugCap': 'Số Phiếu Cung Cấp',
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
  phieucungcap1!: PhieuCungCapUpdate;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(
    private router: Router,
    private phieuCungCapService: PhieuCungCapService
  ) {
    if (this.router.getCurrentNavigation()?.extras.state) {
      this.alerMsg['showMsg'] = true;
      this.alerMsg['typeMsg'] = this.router.getCurrentNavigation()?.extras.state?.typeMsg;
      this.alerMsg['contentMsg'] = this.router.getCurrentNavigation()?.extras.state?.contentMsg;
    }
   }

  ngOnInit(): void {
    this.getListPhieuCungCap();
  }

  async xacNhanPhieu(id: string){
    const get1 = this.phieuCungCapService.getByIdPhieuCungCap(id).toPromise().then(
      (dataphieucungcap) => {
        this.phieucungcap1 = dataphieucungcap;
        this.phieucungcap1.trangThai = true;
      }
    );
    await Promise.all([get1]);
    console.log(this.phieucungcap1)
    const get2 = this.phieuCungCapService.updateTrangThai(id,this.phieucungcap1).toPromise().then(
      ()=>{
        this.alerMsg['showMsg'] = true;
        this.alerMsg['typeMsg'] = 'success';
        this.alerMsg['contentMsg'] = 'success';
      
    });
    await Promise.all([get2]);
    this.ngOnInit();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  async getListPhieuCungCap(){
    const dataGet: any[] = [];
    const getPhieuCungCap = this.phieuCungCapService.getListPhieuCungCap().toPromise().then(
      async (dataResponse) => {
        dataResponse.map((phieucungcap) => {
          dataGet.push(phieucungcap);
        })
      },
      (error)=>{
        // do notthing
      }
    );
    await Promise.all([getPhieuCungCap]);
    this.data = dataGet;
    this.dataSource = new MatTableDataSource(this.data);
    this.dataSource.paginator = this.paginator;
  }


  async deletePhieuCungCap(id: string) {
    if(confirm("Bạn có chắc muốn delete ?")) {
      const deletePhieuCungCap = this.phieuCungCapService.deletePhieuCungCap(id).toPromise().then(
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
  
      await Promise.all([deletePhieuCungCap]);
      this.ngOnInit();
    }
    
  }


}
