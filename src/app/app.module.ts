import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Angular material component
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {MatTreeModule} from '@angular/material/tree';

// Common component
import { HeadMenuBarComponent } from './common-element/head-menu-bar/head-menu-bar.component';

// Page component
import { HomePageComponent } from './page/home-page/home-page.component';
import { LeftToolbarComponent } from './common-element/left-toolbar/left-toolbar.component';

@NgModule({
  declarations: [
    AppComponent,
    HeadMenuBarComponent,
    HomePageComponent,
    LeftToolbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatTreeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
