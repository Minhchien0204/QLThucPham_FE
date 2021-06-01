import {OnInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {ThucPhamService} from '../../../services/thuc-pham.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list-thuc-pham',
  templateUrl: './list-thuc-pham.component.html',
  styleUrls: ['./list-thuc-pham.component.css']
})
export class ListThucPhamComponent implements OnInit {
  displayedColumns: string[] = ['maThucPham','tenThucPham', 'chucNang'];
  columnName: {[index: string]:any} = {
    'maThucPham': 'Mã thực phẩm',
    'tenThucPham': 'Tên thực phẩm', 
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
  constructor(private thucPhamService: ThucPhamService,
    private router: Router) {
    if (this.router.getCurrentNavigation()?.extras.state) {
      this.alerMsg['showMsg'] = true;
      this.alerMsg['typeMsg'] = this.router.getCurrentNavigation()?.extras.state?.typeMsg;
      this.alerMsg['contentMsg'] = this.router.getCurrentNavigation()?.extras.state?.contentMsg;
    }
  }

  ngOnInit(): void {
    this.getListTP()
  }

  async getListTP() {
    const dataGet: any[] = [];
    const getTP = this.thucPhamService.getListThucPham().toPromise().then(
      async (dataResponse) => {
        dataResponse.map((tp) => {
          dataGet.push(tp)
        })
      },
      (error)=>{
        // do notthing
      }
    );
    await Promise.all([getTP]);
    this.data = dataGet;
    this.dataSource = new MatTableDataSource(this.data);
    this.dataSource.paginator = this.paginator;
  }

  async deleteTP(id: string) {
    if(confirm("Bạn có chắc muốn delete ?")) {
      const deleteTP = this.thucPhamService.deleteThucPham(id).toPromise().then(
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
  
      await Promise.all([deleteTP]);
      this.ngOnInit();
    }
    
  }

}
