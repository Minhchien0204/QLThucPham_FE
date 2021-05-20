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

// Common component
import { HeadMenuBarComponent } from './common-element/head-menu-bar/head-menu-bar.component';
import { ProgressSpinnerComponent } from './common-element/progress-spinner/progress-spinner.component'
import { NgxSpinnerModule } from 'ngx-spinner';
import { MessageAlertComponent } from './common-element/message-alert/message-alert.component';
import { LeftToolbarComponent } from './common-element/left-toolbar/left-toolbar.component';

// Page component
import { HomePageComponent } from './page/home-page/home-page.component';
import { ListNhanVienComponent } from './page/nhanvien/list-nhan-vien/list-nhan-vien.component';
import { TaoNhanVienComponent } from './page/nhanvien/tao-nhan-vien/tao-nhan-vien.component';

// Service
import {IntercepterService } from './service/intercepter.service';

@NgModule({
  declarations: [
    AppComponent,
    HeadMenuBarComponent,
    HomePageComponent,
    LeftToolbarComponent,
    ListNhanVienComponent,
    ProgressSpinnerComponent,
    MessageAlertComponent,
    TaoNhanVienComponent
  ],
  imports: [
    BrowserModule,
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
    MatGridListModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: IntercepterService,
      multi: true
    }
  ],
  entryComponents: [
    ProgressSpinnerComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
