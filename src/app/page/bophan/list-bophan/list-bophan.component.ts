import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { BoPhanService } from 'src/app/services/bo-phan.service';
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'app-list-bophan',
  templateUrl: './list-bophan.component.html',
  styleUrls: ['./list-bophan.component.css']
})
export class ListBophanComponent implements OnInit {
  displayedColumns: string[] = ['maBoPhan', 'tenBoPhan', 'chucNang']
  columnName: {[index: string]: any} = {
    'maBoPhan': 'Mã Bộ Phân',
    'tenBoPhan': 'Tên Bộ Phận',
    'chucNang': 'Chức Năng'
  }

  dataSource!: MatTableDataSource<object>
  data: any[] = [];
  alerMsg: {[index: string]:any} = {
    "showMsg": false,
    "typeMsg": 'info',
    "contentMsg": ''
  }
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(
    private titleService: Title,
    private boPhanService: BoPhanService,
    private router: Router
    ) {
    this.titleService.setTitle('Danh sách bộ phận');
    if (this.router.getCurrentNavigation()?.extras.state) {
      this.alerMsg['showMsg'] = true;
      this.alerMsg['typeMsg'] = this.router.getCurrentNavigation()?.extras.state?.typeMsg;
      this.alerMsg['contentMsg'] = this.router.getCurrentNavigation()?.extras.state?.contentMsg;
    }
  }

  ngOnInit(): void {
    this.getListBoPhan();
  }

  async getListBoPhan() {
    const dataGet: any[]=[];
    const getBoPhan = this.boPhanService.getListBoPhan().toPromise().then(
      async (dataSource) => {
        dataSource.map((bophan) => {
          dataGet.push(bophan);
        })
      },
      (error) => {
        //do notthing
      }
    )
    await Promise.all([getBoPhan]);
    this.data = dataGet;
    this.dataSource = new MatTableDataSource(this.data);
    this.dataSource.paginator = this.paginator;
  }

  async deleteBoPhan(id: string){
    if(confirm("Bạn có chắc muốn delete ?")) {
      const deleteUser = this.boPhanService.deleteBoPhan(id).toPromise().then(
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
  
      await Promise.all([deleteUser]);
      this.ngOnInit();
    }
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
