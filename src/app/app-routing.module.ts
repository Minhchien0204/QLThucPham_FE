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


const routes: Routes = [
  {path: '', component: LoginPageComponent},
  {path: 'home', component: HomePageComponent, canActivate: [AuthGuard]},
  {path: 'admin', component: AdminComponent, canActivate: [AuthGuard], data: {roles: Role.Admin}},
  {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginPageComponent},
  {path: 'nhan-vien', component: ListNhanVienComponent},
  {path: 'nhan-vien/edit/:id', component: EditNhanVienComponent},
    // otherwise redirect to home
    //{ path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }