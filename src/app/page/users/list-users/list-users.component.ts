import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'src/app/models/user';
import { UserDetail } from 'src/app/models/user-detail';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit {
  users: UserDetail[] = [];
  displayedColums: string[] = ['id', 'userName', 'name', 'ngaySinh', 'gioiTinh', 'diaChi', 'dienThoai', 'role']
  dataSource = new MatTableDataSource<UserDetail>();

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getusers();
  }

  getusers(): void {
    this.userService.getusers().subscribe(data => {
      this.dataSource.data = data as UserDetail[];
    });
  }

}
