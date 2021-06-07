import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MonAnService } from 'src/app/services/mon-an-service.service';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-list-mon-an1',
  templateUrl: './list-mon-an1.component.html',
  styleUrls: ['./list-mon-an1.component.css']
})
export class ListMonAn1Component implements OnInit {
  displayedColumns: string[] = ['maMonAn','tenMonAn', 'buaAn', 'chucNang'];
  columnName: {[index: string]:any} = {
    'maMonAn': 'Mã Món Ăn',
    'tenMonAn': 'Tên Món Ăn',
    'buaAn': 'Bữa Ăn', 
    'chucNang': 'Chức năng'
  }
  dataSource!: MatTableDataSource<object>;
  data: any[]= [];
  alerMsg: {[index: string]:any} = {
    "showMsg": false,
    "typeMsg": 'info',
    "contentMsg": ''
  };
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(
    private router: Router,
    private monAnService: MonAnService,
    private titleService: Title
  ) { 
    this.titleService.setTitle('Danh sách món ăn');
    if (this.router.getCurrentNavigation()?.extras.state) {
      this.alerMsg['showMsg'] = true;
      this.alerMsg['typeMsg'] = this.router.getCurrentNavigation()?.extras.state?.typeMsg;
      this.alerMsg['contentMsg'] = this.router.getCurrentNavigation()?.extras.state?.contentMsg;
    }
    
  }

  ngOnInit(): void {
    this.getListMonAn();
  }

  async getListMonAn(){
    const dataGet: any[] = [];
    const getMonAn = this.monAnService.getListMonAn().toPromise().then(
      async (dataResponse) => {
        dataResponse.map((monan) => {
          dataGet.push(monan);
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
