import {OnInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MonAnService} from '../../../services/mon-an-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DinhLuong, bodyDinhLuong } from '../../../models/dinh-luong';
import { bodyMonAn } from '../../../models/mon-an';

@Component({
  selector: 'app-dinh-luong',
  templateUrl: './dinh-luong.component.html',
  styleUrls: ['./dinh-luong.component.css']
})
export class DinhLuongComponent implements OnInit {

  displayedColumns: string[] = ['maThucPham','tenThucPham', 'soLuong', 'chucNang'];
  columnName: {[index: string]:any} = {
    'maThucPham': 'Mã thực phẩm',
    'tenThucPham': 'Tên thực phẩm', 
    'soLuong': 'Định lượng',
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
  monAnObject = Object.assign({}, bodyMonAn);
  constructor(private monAnService: MonAnService,
    private router: Router,
    private activeRoute: ActivatedRoute) {
    if (this.router.getCurrentNavigation()?.extras.state) {
      this.alerMsg['showMsg'] = true;
      this.alerMsg['typeMsg'] = this.router.getCurrentNavigation()?.extras.state?.typeMsg;
      this.alerMsg['contentMsg'] = this.router.getCurrentNavigation()?.extras.state?.contentMsg;
    }
  }

  ngOnInit(): void {
    this.getListDL()
  }

  async getListDL() {
    this.activeRoute.params.subscribe(async (param)=> {
      this.monAnObject.maMonAn = param['id'];
      const getDT = this.monAnService.getMonAnDetail(this.monAnObject.maMonAn).toPromise().then(
        (data) => {
          this.monAnObject.tenMonAn = data['tenMonAn'];
        }
      );
      await Promise.all([getDT]);
    });
    const dataGet: any[] = [];
    const getDL = this.monAnService.getListDinhLuong(this.monAnObject.maMonAn).toPromise().then(
      async (dataResponse) => {
        dataResponse.map((tp) => {
          dataGet.push(tp)
        })
      },
      (error)=>{
        // do notthing
      }
    );
    await Promise.all([getDL]);
    this.data = dataGet;
    this.dataSource = new MatTableDataSource(this.data);
    this.dataSource.paginator = this.paginator;
  }

  async deleteDL(id: string) {
    console.log(this.monAnObject.maMonAn)
    // if(confirm("Bạn có chắc muốn delete ?")) {
    //   const deletedl = this.monAnService.deleteDinhLuong(this.monAnObject.maMonAn, id).toPromise().then(
    //     () => {
    //       this.alerMsg['showMsg'] = true;
    //       this.alerMsg['typeMsg'] = 'success';
    //       this.alerMsg['contentMsg'] = 'Delete success';
    //     },
    //     () => {
    //       this.alerMsg['showMsg'] = true;
    //       this.alerMsg['typeMsg'] = 'danger';
    //       this.alerMsg['contentMsg'] = 'Delete failed!';
    //     }
    //   );
  
    //   await Promise.all([deletedl]);
    //   this.ngOnInit();
    // }
    
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
