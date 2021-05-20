import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Common component
import { TaoNhanVienComponent } from './page/nhanvien/tao-nhan-vien/tao-nhan-vien.component';

// Page
import { HomePageComponent } from './page/home-page/home-page.component';
import { ListNhanVienComponent } from './page/nhanvien/list-nhan-vien/list-nhan-vien.component';

const routes: Routes = [
  {path: '', component: HomePageComponent},
  {path: 'nhanvien', component: ListNhanVienComponent},
  {path: 'nhanvien/tao-nhan-vien', component: TaoNhanVienComponent},
  {path: 'test', component: TaoNhanVienComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
