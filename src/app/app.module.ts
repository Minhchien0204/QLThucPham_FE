import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// Angular material component
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {MatTreeModule} from '@angular/material/tree';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule } from "@angular/material/input";
import {MatGridListModule} from '@angular/material/grid-list';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import {MatRadioModule} from '@angular/material/radio';


// Common component
import { HeadMenuBarComponent } from './common-element/head-menu-bar/head-menu-bar.component';
import { ProgressSpinnerComponent } from './common-element/progress-spinner/progress-spinner.component'
import { NgxSpinnerModule } from 'ngx-spinner';
import { MessageAlertComponent } from './common-element/message-alert/message-alert.component';
import { LeftToolbarComponent } from './common-element/left-toolbar/left-toolbar.component';
import { LoginPageComponent } from './page/login-page/login-page.component';
import { AdminComponent } from './page/admin/admin.component';
import { ProfileComponent } from './page/profile/profile.component';
import { FooterComponent } from './common-element/footer/footer.component';

// Page component
import { HomePageComponent } from './page/home-page/home-page.component';
import { ListNhanVienComponent } from './page/nhanvien/list-nhan-vien/list-nhan-vien.component';
import { EditNhanVienComponent } from './page/nhanvien/edit-nhan-vien/edit-nhan-vien.component';
import { ListLopComponent } from './page/lop/list-lop/list-lop.component';
import { TaoLopComponent } from './page/lop/tao-lop/tao-lop.component';
import { EditLopComponent } from './page/lop/edit-lop/edit-lop.component';
import { ListHocSinhComponent } from './page/lop/list-hoc-sinh/list-hoc-sinh.component';
import { ListHocSinhMainComponent } from './page/hoc-sinh/list-hoc-sinh-main/list-hoc-sinh-main.component';
import { TaoHocSinhComponent } from './page/hoc-sinh/tao-hoc-sinh/tao-hoc-sinh.component';
import { EditHocSinhComponent } from './page/hoc-sinh/edit-hoc-sinh/edit-hoc-sinh.component';
import { ListMonAnComponent } from './page/mon-an/list-mon-an/list-mon-an.component';
import { TaoMonAnComponent } from './page/mon-an/tao-mon-an/tao-mon-an.component';
import { EditMonAnComponent } from './page/mon-an/edit-mon-an/edit-mon-an.component';
import { TaoDinhLuongComponent } from './page/mon-an/tao-dinh-luong/tao-dinh-luong.component';
import { ListUsersComponent } from './page/users/list-users/list-users.component';
import { DinhLuongComponent } from './page/mon-an/dinh-luong/dinh-luong.component';
import { EditUserComponent } from './page/users/edit-user/edit-user.component';
import { AddUserComponent } from './page/users/add-user/add-user.component';
import { ListBophanComponent } from './page/bophan/list-bophan/list-bophan.component';
import { AddBoPhanComponent } from './page/bophan/add-bo-phan/add-bo-phan.component';
import { EditBoPhanComponent } from './page/bophan/edit-bo-phan/edit-bo-phan.component';
import { ListNhaCungCapComponent } from './page/nha-cung-cap/list-nha-cung-cap/list-nha-cung-cap.component';
import { AddNhaCungCapComponent } from './page/nha-cung-cap/add-nha-cung-cap/add-nha-cung-cap.component';
import { EditNhaCungCapComponent } from './page/nha-cung-cap/edit-nha-cung-cap/edit-nha-cung-cap.component';
import { ListGiaoVienComponent } from './page/giao-vien/list-giao-vien/list-giao-vien.component';
import { ListThucPhamComponent } from './page/thuc-pham/list-thuc-pham/list-thuc-pham.component';
import { TaoThucPhamComponent } from './page/thuc-pham/tao-thuc-pham/tao-thuc-pham.component';
import { EditThucPhamComponent } from './page/thuc-pham/edit-thuc-pham/edit-thuc-pham.component';
import { EditDinhLuongComponent } from './page/mon-an/edit-dinh-luong/edit-dinh-luong.component';
import { EditGiaoVienComponent } from './page/giao-vien/edit-giao-vien/edit-giao-vien.component';
import { ListPhieuAnComponent } from './page/phieu-an/list-phieu-an/list-phieu-an.component';
import { AddPhieuAnComponent } from './page/phieu-an/add-phieu-an/add-phieu-an.component';
import { EditPhieuAnComponent } from './page/phieu-an/edit-phieu-an/edit-phieu-an.component';
import { ListPhieuYeuCauComponent } from './page/phieu-yeu-cau/list-phieu-yeu-cau/list-phieu-yeu-cau.component';
import { AddPhieuYeuCauComponent } from './page/phieu-yeu-cau/add-phieu-yeu-cau/add-phieu-yeu-cau.component';
import { EditPhieuYeuCauComponent } from './page/phieu-yeu-cau/edit-phieu-yeu-cau/edit-phieu-yeu-cau.component';
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

// Service
import { ErrorInterceptor } from './_helpers/error.interceptor';
import { JwtInterceptor } from './_helpers/jwt.interceptor';
import { ListMonAn1Component } from './page/mon-an1/list-mon-an1/list-mon-an1.component';
import { AddMonAn1Component } from './page/mon-an1/add-mon-an1/add-mon-an1.component';
import { EditMonAn1Component } from './page/mon-an1/edit-mon-an1/edit-mon-an1.component';
import { AddDinhLuong1Component } from './page/mon-an1/add-dinh-luong1/add-dinh-luong1.component';
import { ListDinhLuong1Component } from './page/mon-an1/list-dinh-luong1/list-dinh-luong1.component';
import { MatSortModule } from '@angular/material/sort';
import { ListNhanVienFromBpComponent } from './page/bophan/list-nhan-vien-from-bp/list-nhan-vien-from-bp.component';


@NgModule({
  declarations: [
    AppComponent,
    HeadMenuBarComponent,
    HomePageComponent,
    LeftToolbarComponent,
    ListNhanVienComponent,
    ProgressSpinnerComponent,
    MessageAlertComponent,
    EditNhanVienComponent,
    LoginPageComponent,
    AdminComponent,
    ProfileComponent,
    ListLopComponent,
    TaoLopComponent,
    EditLopComponent,
    ListHocSinhComponent,
    ListUsersComponent,
    ListHocSinhMainComponent,
    TaoHocSinhComponent,
    FooterComponent,
    EditHocSinhComponent,
    ListMonAnComponent,
    TaoMonAnComponent,
    EditMonAnComponent,
    TaoDinhLuongComponent,
    DinhLuongComponent,
    EditUserComponent,
    AddUserComponent,
    ListBophanComponent,
    AddBoPhanComponent,
    EditBoPhanComponent,
    ListNhaCungCapComponent,
    AddNhaCungCapComponent,
    EditNhaCungCapComponent,
    // GiaoVienComponent,
    ListGiaoVienComponent,
    ListThucPhamComponent,
    TaoThucPhamComponent,
    EditThucPhamComponent,
    EditDinhLuongComponent,
    EditGiaoVienComponent,
    ListPhieuAnComponent,
    AddPhieuAnComponent,
    EditPhieuAnComponent,
    ListPhieuYeuCauComponent,
    AddPhieuYeuCauComponent,
    EditPhieuYeuCauComponent,
    ListChiTietYeuCauComponent,
    AddChiTietYeuCauComponent,
    ListChiTietYeuCauOfComponent,
    ListPhieuCungCapComponent,
    AddPhieuCungCapComponent,
    EditPhieuCungCapComponent,
    AddChiTietCungCapComponent,
    ListChiTietCungCapOfComponent,
    ListPhieuBanGiaoComponent,
    AddPhieuBanGiaoComponent,
    EditPhieuBanGiaoComponent,
    AddChiTietBanGiaoComponent,
    ListChiTietBanGiaoOfComponent,
    ListPhieuKiemKeComponent,
    AddPhieuKiemKeComponent,
    EditPhieuKiemKeComponent,
    ChiTietKiemKeComponent,
    ListChiTietKiemKeOfComponent,
    ListPhieuGiaoComponent,
    AddPhieuGiaoComponent,
    EditPhieuGiaoComponent,
    AddChiTietGiaoComponent,
    ListChiTietGiaoOfComponent,
    ListMonAn1Component,
    AddMonAn1Component,
    EditMonAn1Component,
    AddDinhLuong1Component,
    ListDinhLuong1Component,
    ListNhanVienFromBpComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatTreeModule,
    MatTableModule,
    MatPaginatorModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    NgxSpinnerModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatGridListModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
    MatRadioModule,
    MatSortModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
  ],
  entryComponents: [
    ProgressSpinnerComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
