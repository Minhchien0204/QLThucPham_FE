import {OnInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {NhanvienService} from '../../../services/nhanvien.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list-nhan-vien',
  templateUrl: './list-nhan-vien.component.html',
  styleUrls: ['./list-nhan-vien.component.css']
})
export class ListNhanVienComponent implements OnInit  {

  displayedColumns: string[] = ['maNhanVien', 'name', 'tenBoPhan'];
  columnName: {[index: string]:any} = {
    'maNhanVien': 'Mã nhân viên',
    'name': 'Tên nhân viên', 
    'tenBoPhan': 'Bộ phận'
  }
  dataSource!: MatTableDataSource<object>;
  data: any[]= [];
  alerMsg: {[index: string]:any} = {
    "showMsg": false,
    "typeMsg": 'info',
    "contentMsg": ''
  }
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor( private nhanVienService: NhanvienService,
    private router: Router ) { 
      if (this.router.getCurrentNavigation()?.extras.state) {
        this.alerMsg['showMsg'] = true;
        this.alerMsg['typeMsg'] = this.router.getCurrentNavigation()?.extras.state?.typeMsg;
        this.alerMsg['contentMsg'] = this.router.getCurrentNavigation()?.extras.state?.contentMsg;
      }
    } 

  ngOnInit() {
    this.getListNhanVien();
  }
  async getListNhanVien() {
    const dataGet: any[] = [];
    const getNhanVien = this.nhanVienService.getListNhanVien().toPromise().then(
      async (dataResponse) => {
        dataResponse.map((nhanvien) => {
          dataGet.push(nhanvien)
        })
      },
      (error)=>{
        // do notthing
      }
    );
    await Promise.all([getNhanVien]);
    this.data = dataGet;
    this.dataSource = new MatTableDataSource(this.data);
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}