import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { User } from 'src/app/models/user';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  list_chuc_nang: {[index: string]:any}  = {
    "quanLy": [
      {
        "id": "user",
        "url": "/user",
        "icon": "assignment_ind",
        "name": "User"
      },
      {
        "id": "bo-phan",
        "url": "/bo-phan",
        "icon": "extension",
        "name": "Bộ phận"
      },
      {
        "id": "nhan-vien",
        "url": "/nhan-vien",
        "icon": "supervisor_account",
        "name": "Nhân viên"
      },
      {
        "id": "giao-vien",
        "url": "/giao-vien",
        "icon": "school",
        "name": "Giáo viên"
      },
      {
        "id": "lop",
        "url": "/lop",
        "icon": "ballot",
        "name": "Lớp"
      },
      {
        "id": "hoc-sinh",
        "url": "/hoc-sinh",
        "icon": "child_care",
        "name": "Học sinh"
      },
      {
        "id": "mon-an",
        "url": "/mon-an",
        "icon": "fastfood",
        "name": "Món ăn"
      },
      {
        "id": "thuc-pham",
        "url": "/thuc-pham",
        "icon": "style",
        "name": "Thực phẩm"
      },
      {
        "id": "nha-cung-cap",
        "url": "/nha-cung-cap",
        "icon": "store_mall_directory",
        "name": "Nhà cung cấp"
      }
    ],
    "phieu": [
      {
        "id": "phieu-yeu-cau-thuc-pham",
        "url": "/phieu-yeu-cau-thuc-pham",
        "icon": "exposure",
        "name": "Phiếu yêu cầu thực phẩm"
      },
      {
        "id": "phieu-bao-an",
        "url": "/phieu-bao-an",
        "icon": "local_dining",
        "name": "Phiếu báo ăn"
      },
      {
        "id": "phieu-cung-cap",
        "url": "/phieu-cung-cap",
        "icon": "local_shipping",
        "name": "Phiếu cung cấp"
      },
      {
        "id": "phieu-ban-giao",
        "url": "/phieu-ban-giao",
        "icon": "filter_frames",
        "name": "Phiếu bàn giao"
      },
      {
        "id": "phieu-kiem-ke",
        "url": "/phieu-kiem-ke",
        "icon": "poll",
        "name": "Phiếu kiểm kê"
      },
      {
        "id": "phieu-giao",
        "url": "/phieu-giao",
        "icon": "check_box",
        "name": "Phiếu giao"
      }
    ]
  }
  menuGiaoVien: string[] = ['lop', 'phieu-bao-an'];
  menuNhaBep: string[] =  ['thuc-pham', 'mon-an', 'phieu-yeu-cau-thuc-pham', 'phieu-bao-an', 'phieu-cung-cap', 'phieu-ban-giao', 'phieu-kiem-ke', 'phieu-giao'];
  menuThucPham: string[] =  ['thuc-pham', 'phieu-yeu-cau-thuc-pham', 'phieu-cung-cap', 'phieu-ban-giao', 'phieu-kiem-ke', 'phieu-giao', 'nha-cung-cap'];
  menuAdmin: string[] = ['user', 'nhan-vien','giao-vien','lop', 'hoc-sinh', 'mon-an', 'thuc-pham', 'phieu-yeu-cau-thuc-pham', 'phieu-bao-an', 'phieu-cung-cap', 'phieu-ban-giao', 'phieu-kiem-ke', 'phieu-giao','bo-phan', 'nha-cung-cap'];
  menuMain: string[];
  currentUser!: User

  constructor(private authenticationService: AuthenticationService,
    private titleService: Title) { 
    this.titleService.setTitle('Trang chủ');
    this.currentUser = this.authenticationService.userValue;
    
    // Complete menu with role
    this.menuMain = this.getMenuFromRole(this.currentUser.role);
  }

  ngOnInit(): void {
  }

  getMenuFromRole(role: string) {
    if (role === 'GiaoVien') {
      return this.menuGiaoVien;
    } else if (role === 'NhaBep') {
      return this.menuNhaBep;
    } else if (role === 'ThucPham' ){
      return this.menuThucPham;
    } else {
      return this.menuAdmin;
    }
  }

}
