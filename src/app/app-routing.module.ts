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
import { EditUserComponent } from './page/users/edit-user/edit-user.component';
import { AddUserComponent } from './page/users/add-user/add-user.component';
import { ListBophanComponent } from './page/bophan/list-bophan/list-bophan.component';
import { AddBoPhanComponent } from './page/bophan/add-bo-phan/add-bo-phan.component';
import { EditBoPhanComponent } from './page/bophan/edit-bo-phan/edit-bo-phan.component';
import { ListNhaCungCapComponent } from './page/nha-cung-cap/list-nha-cung-cap/list-nha-cung-cap.component';
import { AddNhaCungCapComponent } from './page/nha-cung-cap/add-nha-cung-cap/add-nha-cung-cap.component';
import { EditNhaCungCapComponent } from './page/nha-cung-cap/edit-nha-cung-cap/edit-nha-cung-cap.component';


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
  {path: 'bo-phan', component: ListBophanComponent},
  {path: 'bo-phan/add', component: AddBoPhanComponent},
  {path:  'bo-phan/edit/:id', component: EditBoPhanComponent},
  {path: 'nha-cung-cap', component: ListNhaCungCapComponent},
  {path: 'nha-cung-cap/add', component: AddNhaCungCapComponent},
  {path:  'nha-cung-cap/edit/:id', component: EditNhaCungCapComponent}

    // otherwise redirect to home
    //{ path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
