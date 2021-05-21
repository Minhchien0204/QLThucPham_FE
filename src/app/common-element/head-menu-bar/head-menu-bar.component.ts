import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-head-menu-bar',
  templateUrl: './head-menu-bar.component.html',
  styleUrls: ['./head-menu-bar.component.css']
})
export class HeadMenuBarComponent implements OnInit {
  user!: User;
  currentUser!: User

  constructor( private authenticationService: AuthenticationService) { 
    //this.authenticationService.user.subscribe(x => this.user = x);
    this.currentUser = this.authenticationService.userValue;
    console.log(this.currentUser.userName);
  }

  ngOnInit(): void {
  }

  logout() {
    this.authenticationService.logout();
  }

}
