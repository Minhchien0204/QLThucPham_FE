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
import { DinhLuongComponent } from './page/mon-an/dinh-luong/dinh-luong.component';
import { TaoDinhLuongComponent } from './page/mon-an/tao-dinh-luong/tao-dinh-luong.component';


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
  {path: 'users', component: ListUsersComponent, canActivate: [AuthGuard], data: {roles: Role.Admin}},
  {path: 'lop/:id/hoc-sinh', component: ListHocSinhComponent},
  {path: 'hoc-sinh', component: ListHocSinhMainComponent},
  {path: 'hoc-sinh/create', component: TaoHocSinhComponent},
  {path: 'hoc-sinh/edit/:id', component: EditHocSinhComponent},
  {path: 'mon-an', component: ListMonAnComponent},
  {path: 'mon-an/create', component: TaoMonAnComponent},
  {path: 'mon-an/edit/:id', component: EditMonAnComponent},
  {path: 'mon-an/dinh-luong/:id', component: DinhLuongComponent},
  {path: 'mon-an/dinh-luong/create', component: TaoDinhLuongComponent},
    // otherwise redirect to home
    //{ path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
