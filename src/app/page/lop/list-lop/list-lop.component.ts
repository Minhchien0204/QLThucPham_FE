import {OnInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {LopService} from '../../../services/lop.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-list-lop',
  templateUrl: './list-lop.component.html',
  styleUrls: ['./list-lop.component.css']
})
export class ListLopComponent implements OnInit {
  // displayedColumns: string[] = ['maLop','tenLop', 'giaoVien', 'soLuong', 'chucNang'];
  displayedColumns: string[] = ['maLop','tenLop', 'soLuong', 'chucNang'];
  columnName: {[index: string]:any} = {
    'maLop': 'Mã lớp',
    'tenLop': 'Tên lớp', 
    // 'giaoVien': 'Giáo viên phụ trách',
    'soLuong': 'Sĩ số tối đa', 
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
  constructor(private lopService: LopService,
    private titleService: Title,
    private router: Router) {
    if (this.router.getCurrentNavigation()?.extras.state) {
      this.titleService.setTitle('Danh sách lớp');
      this.alerMsg['showMsg'] = true;
      this.alerMsg['typeMsg'] = this.router.getCurrentNavigation()?.extras.state?.typeMsg;
      this.alerMsg['contentMsg'] = this.router.getCurrentNavigation()?.extras.state?.contentMsg;
    }
  }

  ngOnInit(): void {
    this.getListLop();
  }
  async getListLop() {
    const dataGet: any[] = [];
    const getLop = this.lopService.getListLop().toPromise().then(
      async (dataResponse) => {
        dataResponse.map((lop) => {
          dataGet.push(lop)
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

  async deleteLop(id: string) {
    if(confirm("Bạn có chắc muốn delete ?")) {
      const deleteLop = this.lopService.deleteLop(id).toPromise().then(
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
