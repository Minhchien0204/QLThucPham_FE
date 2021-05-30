import {OnInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MonAnService} from '../../../services/mon-an-service.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list-mon-an',
  templateUrl: './list-mon-an.component.html',
  styleUrls: ['./list-mon-an.component.css']
})
export class ListMonAnComponent implements OnInit {
  displayedColumns: string[] = ['MaMonAn','TenMonAn', 'BuaAn', 'chucNang'];
  columnName: {[index: string]:any} = {
    'MaMonAn': 'Mã món ăn',
    'TenMonAn': 'Tên món ăn', 
    'BuaAn': 'Bữa ăn',
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
  constructor(private monAnService: MonAnService,
    private router: Router) {
    if (this.router.getCurrentNavigation()?.extras.state) {
      this.alerMsg['showMsg'] = true;
      this.alerMsg['typeMsg'] = this.router.getCurrentNavigation()?.extras.state?.typeMsg;
      this.alerMsg['contentMsg'] = this.router.getCurrentNavigation()?.extras.state?.contentMsg;
    }
  }

  ngOnInit(): void {
    this.getListMonAn()
  }

  async getListMonAn() {
    const dataGet: any[] = [];
    const getMonAn = this.monAnService.getListMonAn().toPromise().then(
      async (dataResponse) => {
        dataResponse.map((monAn) => {
          dataGet.push(monAn)
        })
      },
      (error)=>{
        // do notthing
      }
    );
    await Promise.all([getMonAn]);
    this.data = dataGet;
    this.dataSource = new MatTableDataSource(this.data);
    this.dataSource.paginator = this.paginator;
  }

  async deleteMonAn(id: string) {
    if(confirm("Bạn có chắc muốn delete ?")) {
      const deleteMonAn = this.monAnService.deleteMonAn(id).toPromise().then(
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
  
      await Promise.all([deleteMonAn]);
      this.ngOnInit();
    }
    
  }

}
