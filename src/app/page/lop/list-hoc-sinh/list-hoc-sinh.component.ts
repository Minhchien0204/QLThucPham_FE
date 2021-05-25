import {OnInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {LopService} from '../../../services/lop.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list-hoc-sinh',
  templateUrl: './list-hoc-sinh.component.html',
  styleUrls: ['./list-hoc-sinh.component.css']
})
export class ListHocSinhComponent implements OnInit {

  displayedColumns: string[] = ['hoTen','diaChi', 'ngaySinh', 'gioiTinh', 'dienThoai'];
  columnName: {[index: string]:any} = {
    'hoTen': 'Họ và tên',
    'diaChi': 'Địa chỉ', 
    'ngaySinh': 'Ngày sinh',
    'gioiTinh': 'Giới tính', 
    'dienThoai': 'Điện thoại'
  }
  dataSource!: MatTableDataSource<object>;
  data: any[]= [];
  alerMsg: {[index: string]:any} = {
    "showMsg": false,
    "typeMsg": 'info',
    "contentMsg": ''
  }
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  idLop: string = "";
  constructor(private lopService: LopService,
    private router: Router,
    private activeRoute: ActivatedRoute) {
      this.activeRoute.params.subscribe((param)=> {
        this.idLop = param['id'];
      });
     }

  ngOnInit(): void {
    this.getListHocSinh();
  }
  async getListHocSinh() {
    const dataGet: any[] = [];
    const getLop = this.lopService.getHocSinhFromLop(this.idLop).toPromise().then(
      async (dataResponse) => {
        dataResponse.map((hocSinh) => {
          dataGet.push(hocSinh)
        })
      },
      (error)=>{
        // do notthing
      }
    );
    await Promise.all([getLop]);
    this.data = dataGet;
    this.dataSource = new MatTableDataSource(this.data);
    this.dataSource.paginator = this.paginator;
  }
}
