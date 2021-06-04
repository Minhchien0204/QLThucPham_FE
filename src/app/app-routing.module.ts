import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Common component
import { Role } from './models/role';
import { AdminComponent } from './page/admin/admin.component';

// Page
import { HomePageComponent } from './page/home-page/home-page.component';
import { LoginPageComponent } from './page/login-page/login-page.component';
import { ProfileComponent } from './page/profile/profile.component';
import { AuthGuard } from './_helpers/auth.guard';
import { ListNhanVienComponent } from './page/nhanvien/list-nhan-vien/list-nhan-vien.component';
import { EditNhanVienComponent } from './page/nhanvien/edit-nhan-vien/edit-nhan-vien.component';
import { ListLopComponent } from './page/lop/list-lop/list-lop.component';
import { TaoLopComponent } from './page/lop/tao-lop/tao-lop.component';
import { EditLopComponent } from './page/lop/edit-lop/edit-lop.component';
import { ListHocSinhComponent } from './page/lop/list-hoc-sinh/list-hoc-sinh.component';
import { ListUsersComponent } from './page/users/list-users/list-users.component';
import { ListHocSinhMainComponent } from './page/hoc-sinh/list-hoc-sinh-main/list-hoc-sinh-main.component';
import { TaoHocSinhComponent } from './page/hoc-sinh/tao-hoc-sinh/tao-hoc-sinh.component';
import { EditHocSinhComponent } from './page/hoc-sinh/edit-hoc-sinh/edit-hoc-sinh.component';
import { ListMonAnComponent } from './page/mon-an/list-mon-an/list-mon-an.component';
import { TaoMonAnComponent } from './page/mon-an/tao-mon-an/tao-mon-an.component';
import { EditMonAnComponent } from './page/mon-an/edit-mon-an/edit-mon-an.component';
import { TaoDinhLuongComponent } from './page/mon-an/tao-dinh-luong/tao-dinh-luong.component';
import { EditUserComponent } from './page/users/edit-user/edit-user.component';
import { AddUserComponent } from './page/users/add-user/add-user.component';
import { ListBophanComponent } from './page/bophan/list-bophan/list-bophan.component';
import { AddBoPhanComponent } from './page/bophan/add-bo-phan/add-bo-phan.component';
import { EditBoPhanComponent } from './page/bophan/edit-bo-phan/edit-bo-phan.component';
import { ListNhaCungCapComponent } from './page/nha-cung-cap/list-nha-cung-cap/list-nha-cung-cap.component';
import { AddNhaCungCapComponent } from './page/nha-cung-cap/add-nha-cung-cap/add-nha-cung-cap.component';
import { EditNhaCungCapComponent } from './page/nha-cung-cap/edit-nha-cung-cap/edit-nha-cung-cap.component';
import { ListThucPhamComponent } from './page/thuc-pham/list-thuc-pham/list-thuc-pham.component';
import { TaoThucPhamComponent } from './page/thuc-pham/tao-thuc-pham/tao-thuc-pham.component';
import { EditThucPhamComponent } from './page/thuc-pham/edit-thuc-pham/edit-thuc-pham.component';
import { ListGiaoVienComponent } from './page/giao-vien/list-giao-vien/list-giao-vien.component';
import { EditGiaoVienComponent } from './page/giao-vien/edit-giao-vien/edit-giao-vien.component';
import { ListPhieuAnComponent } from './page/phieu-an/list-phieu-an/list-phieu-an.component';
import { AddPhieuAnComponent } from './page/phieu-an/add-phieu-an/add-phieu-an.component';
import { EditPhieuAnComponent } from './page/phieu-an/edit-phieu-an/edit-phieu-an.component';
import { ListPhieuYeuCauComponent } from './page/phieu-yeu-cau/list-phieu-yeu-cau/list-phieu-yeu-cau.component';
import { AddPhieuYeuCauComponent } from './page/phieu-yeu-cau/add-phieu-yeu-cau/add-phieu-yeu-cau.component';
import { EditPhieuYeuCauComponent } from './page/phieu-yeu-cau/edit-phieu-yeu-cau/edit-phieu-yeu-cau.component';
// import { ChiTietYeuCauService } from './services/chi-tiet-yeu-cau.service';
import { ListChiTietYeuCauComponent } from './page/phieu-yeu-cau/chi-tiet-phieu-yeu-cau/list-chi-tiet-yeu-cau/list-chi-tiet-yeu-cau.component';
import { AddChiTietYeuCauComponent } from './page/phieu-yeu-cau/chi-tiet-phieu-yeu-cau/add-chi-tiet-yeu-cau/add-chi-tiet-yeu-cau.component';
import { ListChiTietYeuCauOfComponent } from './page/phieu-yeu-cau/list-chi-tiet-yeu-cau-of/list-chi-tiet-yeu-cau-of.component';
import { ListPhieuCungCapComponent } from './page/phieu-cung-cap/list-phieu-cung-cap/list-phieu-cung-cap.component';
import { AddPhieuCungCapComponent } from './page/phieu-cung-cap/add-phieu-cung-cap/add-phieu-cung-cap.component';
import { EditPhieuCungCapComponent } from './page/phieu-cung-cap/edit-phieu-cung-cap/edit-phieu-cung-cap.component';
import { AddChiTietCungCapComponent } from './page/phieu-cung-cap/chi-tiet-cung-cap/add-chi-tiet-cung-cap/add-chi-tiet-cung-cap.component';
import { ListChiTietCungCapOfComponent } from './page/phieu-cung-cap/list-chi-tiet-cung-cap-of/list-chi-tiet-cung-cap-of.component';
import { ListPhieuBanGiaoComponent } from './page/phieu-ban-giao/list-phieu-ban-giao/list-phieu-ban-giao.component';
import { AddPhieuBanGiaoComponent } from './page/phieu-ban-giao/add-phieu-ban-giao/add-phieu-ban-giao.component';
import { EditPhieuBanGiaoComponent } from './page/phieu-ban-giao/edit-phieu-ban-giao/edit-phieu-ban-giao.component';
import { AddChiTietBanGiaoComponent } from './page/phieu-ban-giao/chi-tiet-ban-giao/add-chi-tiet-ban-giao/add-chi-tiet-ban-giao.component';
import { ListChiTietBanGiaoOfComponent } from './page/phieu-ban-giao/list-chi-tiet-ban-giao-of/list-chi-tiet-ban-giao-of.component';
import { ListPhieuKiemKeComponent } from './page/phieu-kiem-ke/list-phieu-kiem-ke/list-phieu-kiem-ke.component';
import { AddPhieuKiemKeComponent } from './page/phieu-kiem-ke/add-phieu-kiem-ke/add-phieu-kiem-ke.component';
import { EditPhieuKiemKeComponent } from './page/phieu-kiem-ke/edit-phieu-kiem-ke/edit-phieu-kiem-ke.component';
import { ChiTietKiemKeComponent } from './page/phieu-kiem-ke/chi-tiet-kiem-ke/chi-tiet-kiem-ke/chi-tiet-kiem-ke.component';
import { ListChiTietKiemKeOfComponent } from './page/phieu-kiem-ke/list-chi-tiet-kiem-ke-of/list-chi-tiet-kiem-ke-of.component';
import { ListPhieuGiaoComponent } from './page/phieu-giao/list-phieu-giao/list-phieu-giao.component';
import { AddPhieuGiaoComponent } from './page/phieu-giao/add-phieu-giao/add-phieu-giao.component';
import { EditPhieuGiaoComponent } from './page/phieu-giao/edit-phieu-giao/edit-phieu-giao.component';
import { AddChiTietGiaoComponent } from './page/phieu-giao/chi-tiet-giao/add-chi-tiet-giao/add-chi-tiet-giao.component';
import { ListChiTietGiaoOfComponent } from './page/phieu-giao/list-chi-tiet-giao-of/list-chi-tiet-giao-of.component';
import { ListMonAn1Component } from './page/mon-an1/list-mon-an1/list-mon-an1.component';
import { AddMonAn1Component } from './page/mon-an1/add-mon-an1/add-mon-an1.component';
import { EditMonAn1Component } from './page/mon-an1/edit-mon-an1/edit-mon-an1.component';
import { AddDinhLuong1Component } from './page/mon-an1/add-dinh-luong1/add-dinh-luong1.component';
import { ListDinhLuong1Component } from './page/mon-an1/list-dinh-luong1/list-dinh-luong1.component';
import { ListNhanVienFromBpComponent } from './page/bophan/list-nhan-vien-from-bp/list-nhan-vien-from-bp.component';
import { FooterComponent } from './common-element/footer/footer.component';
import { NotFoundUrlPageComponent } from './page/not-found-url-page/not-found-url-page.component';


const routes: Routes = [
  {path: '', component: LoginPageComponent},
  {path: 'home', component: HomePageComponent, canActivate: [AuthGuard]},
  {path: 'admin', component: AdminComponent, canActivate: [AuthGuard], data: {roles: Role.Admin}},
  {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginPageComponent},
  {path: 'nhan-vien', component: ListNhanVienComponent},
  {path: 'nhan-vien/edit/:id', component: EditNhanVienComponent},
  {path: 'lop', component: ListLopComponent},
  {path: 'lop/create', component: TaoLopComponent},
  {path: 'lop/edit/:id', component: EditLopComponent},
  {path: 'user', component: ListUsersComponent, canActivate: [AuthGuard], data: {roles: Role.Admin}},
  {path: 'user/edit/:id', component: EditUserComponent},
  {path: 'user/add', component: AddUserComponent},
  {path: 'lop/:id/hoc-sinh', component: ListHocSinhComponent},
  {path: 'hoc-sinh', component: ListHocSinhMainComponent},
  {path: 'hoc-sinh/create', component: TaoHocSinhComponent},
  {path: 'hoc-sinh/edit/:id', component: EditHocSinhComponent},
  // {path: 'mon-an', component: ListMonAnComponent},
  // {path: 'mon-an/create', component: TaoMonAnComponent},
  // {path: 'mon-an/edit/:id', component: EditMonAnComponent},
  // {path: 'mon-an/:id/dinh-luong/create', component: TaoDinhLuongComponent},
  {path: 'thuc-pham', component: ListThucPhamComponent},
  {path: 'thuc-pham/create', component: TaoThucPhamComponent},
  {path: 'thuc-pham/edit/:id', component: EditThucPhamComponent},
  {path: 'bo-phan', component: ListBophanComponent},
  {path: 'bo-phan/add', component: AddBoPhanComponent},
  {path: 'bo-phan/edit/:id', component: EditBoPhanComponent},
  {path: 'nha-cung-cap', component: ListNhaCungCapComponent},
  {path: 'nha-cung-cap/add', component: AddNhaCungCapComponent},
  {path: 'nha-cung-cap/edit/:id', component: EditNhaCungCapComponent},
  {path: 'giao-vien', component: ListGiaoVienComponent},
  {path: 'giao-vien/edit/:id', component: EditGiaoVienComponent},
  {path: 'phieu-bao-an', component: ListPhieuAnComponent},
  {path: 'phieu-bao-an/create', component: AddPhieuAnComponent},
  {path: 'phieu-bao-an/edit/:id', component:EditPhieuAnComponent},
  {path: 'phieu-yeu-cau-thuc-pham', component: ListPhieuYeuCauComponent},
  {path: 'phieu-yeu-cau-thuc-pham/create', component: AddPhieuYeuCauComponent},
  {path: 'phieu-yeu-cau-thuc-pham/edit/:id', component: EditPhieuYeuCauComponent},
  {path: 'chi-tiet-yeu-cau', component: ListChiTietYeuCauComponent},
  {path: 'phieu-yeu-cau-thuc-pham/:id/chi-tiet-yeu-cau/create', component: AddChiTietYeuCauComponent},
  {path: 'phieu-yeu-cau-thuc-pham/:id/chi-tiet-yeu-cau', component: ListChiTietYeuCauOfComponent},
  {path: 'phieu-cung-cap', component: ListPhieuCungCapComponent},
  {path: 'phieu-cung-cap/create', component: AddPhieuCungCapComponent},
  {path: 'phieu-cung-cap/edit/:id', component: EditPhieuCungCapComponent},
  {path: 'phieu-cung-cap/:id/chi-tiet-cung-cap/create', component: AddChiTietCungCapComponent},
  {path: 'phieu-cung-cap/:id/chi-tiet-cung-cap', component: ListChiTietCungCapOfComponent},
  {path: 'phieu-ban-giao', component: ListPhieuBanGiaoComponent},
  {path: 'phieu-ban-giao/create', component: AddPhieuBanGiaoComponent},
  {path: 'phieu-ban-giao/edit/:id', component: EditPhieuBanGiaoComponent},
  {path: 'phieu-ban-giao/:id/chi-tiet-ban-giao/create', component: AddChiTietBanGiaoComponent},
  {path: 'phieu-ban-giao/:id/chi-tiet-ban-giao', component: ListChiTietBanGiaoOfComponent},
  {path: 'phieu-kiem-ke', component: ListPhieuKiemKeComponent},
  {path: 'phieu-kiem-ke/create', component: AddPhieuKiemKeComponent},
  {path: 'phieu-kiem-ke/edit/:id', component: EditPhieuKiemKeComponent},
  {path: 'phieu-kiem-ke/:id/chi-tiet-kiem-ke/create', component: ChiTietKiemKeComponent},
  {path: 'phieu-kiem-ke/:id/chi-tiet-kiem-ke', component: ListChiTietKiemKeOfComponent},
  {path: 'phieu-giao', component: ListPhieuGiaoComponent},
  {path: 'phieu-giao/create', component: AddPhieuGiaoComponent},
  {path: 'phieu-giao/edit/:id', component: EditPhieuGiaoComponent},
  {path: 'phieu-giao/:id/chi-tiet-giao/create', component: AddChiTietGiaoComponent},
  {path: 'phieu-giao/:id/chi-tiet-giao', component: ListChiTietGiaoOfComponent},
  {path: 'mon-an',  component: ListMonAn1Component},
  {path: 'mon-an/create',  component: AddMonAn1Component},
  {path: 'mon-an/edit/:id',  component: EditMonAn1Component},
  {path: 'mon-an/:id/dinh-luong/create', component: AddDinhLuong1Component},
  {path: 'mon-an/:id/dinh-luong', component: ListDinhLuong1Component},
  {path: 'bo-phan/:id/nhan-vien', component: ListNhanVienFromBpComponent},
  // {path: 'footer', component: FooterComponent},
    // otherwise redirect to home
  { path: '**', component: NotFoundUrlPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
