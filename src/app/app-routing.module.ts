import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Common component
import { HeadMenuBarComponent } from './common-element/head-menu-bar/head-menu-bar.component';

// Page
import { HomePageComponent } from './page/home-page/home-page.component';
const routes: Routes = [
  {path: '', component: HomePageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
