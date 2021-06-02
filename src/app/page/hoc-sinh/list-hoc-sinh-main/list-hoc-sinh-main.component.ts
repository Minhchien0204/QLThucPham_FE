import {OnInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {HocSinhService} from '../../../services/hoc-sinh.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list-hoc-sinh-main',
  templateUrl: './list-hoc-sinh-main.component.html',
  styleUrls: ['./list-hoc-sinh-main.component.css']
})
export class ListHocSinhMainComponent implements OnInit {
  displayedColumns: string[] = ['hoTen','diaChi', 'ngaySinh', 'gioiTinh', 'dienThoai', 'maLop', 'chucNang'];
  columnName: {[index: string]:any} = {
    'hoTen': 'Họ và tên',
    'diaChi': 'Địa chỉ', 
    'ngaySinh': 'Ngày sinh',
    'gioiTinh': 'Giới tính', 
    'dienThoai': 'Điện thoại', 
    'maLop': 'Lớp', 
    'chucNang': 'Chức năng'
  }
  dataSource!: MatTableDataSource<object>;
  data: any[]= [];
  alerMsg: {[index: string]:any} = {
    "showMsg": false,
    "typeMsg": 'info',
    "contentMsg": ''
  }
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private hocSinhService: HocSinhService,
    private router: Router) { 
      if (this.router.getCurrentNavigation()?.extras.state) {
        this.alerMsg['showMsg'] = true;
        this.alerMsg['typeMsg'] = this.router.getCurrentNavigation()?.extras.state?.typeMsg;
        this.alerMsg['contentMsg'] = this.router.getCurrentNavigation()?.extras.state?.contentMsg;
      }
  }

  ngOnInit(): void {
    this.getListHocSinh();
  }
  async getListHocSinh() {
    const dataGet: any[] = [];
    const getHocSinh = this.hocSinhService.getListHocSinh().toPromise().then(
      async (dataResponse) => {
        dataResponse.map((hocSinh) => {
          dataGet.push(hocSinh)
        })
      },
      (error)=>{
        // do notthing
      }
    );
    await Promise.all([getHocSinh]);
    this.data = dataGet;
    this.dataSource = new MatTableDataSource(this.data);
    this.dataSource.paginator = this.paginator;
  }

  async deleteHocSinh(id: string) {
    if(confirm("Bạn có chắc muốn delete ?")) {
      const deleteLop = this.hocSinhService.deleteHocSinh(id).toPromise().then(
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
  
      await Promise.all([deleteLop]);
      this.ngOnInit();
    }
    
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
