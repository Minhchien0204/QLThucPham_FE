import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit {
  displayedColumns: string[] = ['userName', 'name', 'ngaySinh', 'gioiTinh', 'diaChi', 'dienThoai', 'role', 'chucNang']
  columnName: {[index: string]:any} = {
    'userName': 'UserName', 
    'name': 'Tên',
    'ngaySinh': 'Ngày Sinh',
    'gioiTinh': 'Giới Tính',
    'diaChi':'Địa Chỉ',
    'dienThoai':'Điện Thoai',
    'role' : 'Người Dùng',
    'chucNang': 'Chức Năng'

  }
  dataSource!: MatTableDataSource<object>;
  data: any[]= [];
  alerMsg: {[index: string]:any} = {
    "showMsg": false,
    "typeMsg": 'info',
    "contentMsg": ''
  }
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  // @ViewChild(MatSort) sort!: MatSort;
  constructor(private userService: UserService,
    private titleService: Title,
    private router: Router) {
      this.titleService.setTitle('Danh sách người dùng');
    if (this.router.getCurrentNavigation()?.extras.state) {
      this.alerMsg['showMsg'] = true;
      this.alerMsg['typeMsg'] = this.router.getCurrentNavigation()?.extras.state?.typeMsg;
      this.alerMsg['contentMsg'] = this.router.getCurrentNavigation()?.extras.state?.contentMsg;
    }
  }

  ngOnInit(): void {
    this.getListUser();
  }
  


  async getListUser() {
    const dataGet: any[] = [];
    const getUser = this.userService.getusers().toPromise().then(
      async (dataSource) => {
        dataSource.map((user) => {
          dataGet.push(user)
        })
      },
      (error) => {
        //do notthing
      }
    )
    await Promise.all([getUser]);
    this.data = dataGet;
    this.dataSource = new MatTableDataSource(this.data);
    this.dataSource.paginator = this.paginator;
  }

  async deleteUser(id: string) {
    if(confirm("Bạn có chắc muốn delete ?")) {
      const deleteUser = this.userService.deleteUser(id).toPromise().then(
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

  // ngAfterViewInit(){
  //   this.dataSource.sort = this.sort;
  // }
}
