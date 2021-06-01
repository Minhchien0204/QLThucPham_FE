import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { PhieuAn, PhieuAnUpdate } from 'src/app/models/phieu-an';
import { PhieuAnService } from 'src/app/services/phieu-an.service';

@Component({
  selector: 'app-list-phieu-an',
  templateUrl: './list-phieu-an.component.html',
  styleUrls: ['./list-phieu-an.component.css']
})
export class ListPhieuAnComponent implements OnInit {
  displayedColumns: string[] = ['sophieuAn','maGV', 'name', 'ngayLap', 'soLuong', 'trangThai', 'ghiChu', 'chucNang'];
  columnName: {[index: string]:any} = {
    'sophieuAn': 'Số Phiếu Ăn',
    'maGV': 'Mã Giáo Viên',
    'name': 'Họ và tên',
    'ngayLap': 'Ngày Lập', 
    'soLuong': 'Số Lượng',
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
  }
  phieuan1!: PhieuAnUpdate;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(
    private router: Router,
    private phieuAnService: PhieuAnService
  ) { 
    if (this.router.getCurrentNavigation()?.extras.state) {
      this.alerMsg['showMsg'] = true;
      this.alerMsg['typeMsg'] = this.router.getCurrentNavigation()?.extras.state?.typeMsg;
      this.alerMsg['contentMsg'] = this.router.getCurrentNavigation()?.extras.state?.contentMsg;
    }
   }

  ngOnInit(): void {
    this.getListPhieuAn();
  }

  async xacNhanPhieu(id: string){
    const get1 = this.phieuAnService.getByIdPhieuAn(id).toPromise().then(
      (dataphieuan) => {
        this.phieuan1 = dataphieuan;
        this.phieuan1.trangThai = true;
      }
    );
    await Promise.all([get1]);
    console.log(this.phieuan1)
    const get2 = this.phieuAnService.updateTrangThai(id,this.phieuan1).toPromise().then(
      ()=>{
        this.alerMsg['showMsg'] = true;
        this.alerMsg['typeMsg'] = 'success';
        this.alerMsg['contentMsg'] = 'success';
      
    });
    await Promise.all([get2]);
    this.ngOnInit();
  }

  async getListPhieuAn(){
    const dataGet: any[] = [];
    const getPhieuAn = this.phieuAnService.getListPhieuAn().toPromise().then(
      async (dataResponse) => {
        dataResponse.map((phieuan) => {
          dataGet.push(phieuan);
        })
      },
      (error)=>{
        // do notthing
      }
    );
    await Promise.all([getPhieuAn]);
    this.data = dataGet;
    this.dataSource = new MatTableDataSource(this.data);
    this.dataSource.paginator = this.paginator;
  }

  async deletePhieuAn(id: string) {
    if(confirm("Bạn có chắc muốn delete ?")) {
      const deletePhieuAn = this.phieuAnService.deletePhieuAn(id).toPromise().then(
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
  
      await Promise.all([deletePhieuAn]);
      this.ngOnInit();
    }
    
  }

}
