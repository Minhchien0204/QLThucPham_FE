import { Component, OnInit } from '@angular/core';
import {MatTreeNestedDataSource} from '@angular/material/tree';
import {NestedTreeControl} from '@angular/cdk/tree';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { User } from 'src/app/models/user';

interface MenuNode {
  id: string;
  name: string;
  url: string;
  children?: MenuNode[];
  active: boolean;
}

// Left bar menu
const TREE_DATA: MenuNode[] = [
  {
    id: 'quan-li',
    name: 'Quản lí',
    children: [
      {
        id: 'user',
        name: 'User',
        url: '/users',
        active: false
      },
      {
        id: 'bo-phan',
        name: 'Bộ phân',
        url: '/bo-phan',
        active: false
      },
      {
        id: 'nhan-vien',
        name: 'Nhân viên',
        url: '/nhan-vien',
        active: false
      },
      {
        id: 'lop',
        name: 'Lớp',
        url: '/lop',
        active: false
      },
      {
        id: 'hoc-sinh',
        name: 'Học sinh',
        url: '/hoc-sinh',
        active: false
      },
      {
        id: 'mon-an',
        name: 'Món ăn',
        url: '/mon-an',
        active: false
      },
      {
        id: 'thuc-pham',
        name: 'Thực phẩm',
        url: '/thuc-pham',
        active: false
      },
      {
        id: 'nha-cung-cap',
        name: 'Nhà cung cấp',
        url: '/nha-cung-cap',
        active: false
      }
    ],
    url: '#',
    active: false
  },
  {
    id: 'phieu',
    name: 'Phiếu',
    url: '#',
    children: [
      {
        id: 'phieu-yeu-cau-thuc-pham',
        name: 'Phiếu yêu cầu thực phẩm',
        url: '/phieu/yeu-cau-thuc-pham',
        active: false
      },
      {
        id: 'phieu-bao-an',
        name: 'Phiếu báo ăn',
        url: '/phieu/bao-an',
        active: false
      },
      {
        id: 'phieu-cung-cap',
        name: 'Phiếu cung cấp',
        url: '/phieu/cung-cap',
        active: false
      },
      {
        id: 'phieu-ban-giao',
        name: 'Phiếu bàn giao',
        url: '/phieu/ban-giao',
        active: false
      },
      {
        id: 'phieu-kiem-ke',
        name: 'Phiếu kiểm kê',
        url: '/phieu/kiem-ke',
        active: false
      },
      {
        id: 'phieu-giao',
        name: 'Phiếu giao',
        url: '/phieu/giao',
        active: false
      },
    ],
    active: false
  },
  
]


@Component({
  selector: 'app-left-toolbar',
  templateUrl: './left-toolbar.component.html',
  styleUrls: ['./left-toolbar.component.css']
})
export class LeftToolbarComponent implements OnInit {
  menuGiaoVien: string[] = ['lop', 'phieu-bao-an'];
  menuNhaBep: string[] =  ['thuc-pham', 'mon-an', 'phieu-yeu-cau-thuc-pham', 'phieu-bao-an', 'phieu-cung-cap', 'phieu-ban-giao', 'phieu-kiem-ke', 'phieu-giao', 'nha-cung-cap'];
  menuAdmin: string[] = ['user', 'nhan-vien','lop', 'hoc-sinh', 'mon-an', 'thuc-pham', 'phieu-yeu-cau-thuc-pham', 'phieu-bao-an', 'phieu-cung-cap', 'phieu-ban-giao', 'phieu-kiem-ke', 'phieu-giao','bo-phan', 'nha-cung-cap'];
  menuMain: string[];
  currentUser!: User

  treeControl = new NestedTreeControl<MenuNode>(node => node.children);
  dataSource = new MatTreeNestedDataSource<MenuNode>();
  constructor(private authenticationService: AuthenticationService) { 
    this.dataSource.data = TREE_DATA;

    // get role
    this.currentUser = this.authenticationService.userValue;
    
    // Complete menu with role
    this.menuMain = this.getMenuFromRole(this.currentUser.role);
  }

  ngOnInit(): void {
  }

  hasChild = (_: number, node: MenuNode) => !!node.children && node.children.length > 0;

  getMenuFromRole(role: string) {
    if (role === 'GiaoVien') {
      return this.menuGiaoVien;
    } else if (role === 'NhaBep' || role == 'ThucPham') {
      return this.menuNhaBep;
    } else {
      return this.menuAdmin;
    }
  }
}
