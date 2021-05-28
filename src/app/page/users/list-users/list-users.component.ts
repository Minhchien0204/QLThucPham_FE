import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserDetail } from 'src/app/models/user-detail';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit {
  displayedColumns: string[] = ['id', 'userName', 'name', 'ngaySinh', 'gioiTinh', 'diaChi', 'dienThoai', 'role', 'chucNang']
  columnName: {[index: string]:any} = {
    'id': 'ID',
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
  constructor(private userService: UserService,
    private router: Router) {
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
      async (dataResponse) => {
        dataResponse.map((users) => {
          dataGet.push(users)
        })
      },
      (error)=>{
        // do notthing
      }
    );
    await Promise.all([getUser]);
    this.data = dataGet;
    this.dataSource = new MatTableDataSource(this.data);
    this.dataSource.paginator = this.paginator;
  }

  async deleteUser(id: number) {
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

}
