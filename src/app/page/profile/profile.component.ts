import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { first } from 'rxjs/operators';
import { User } from 'src/app/models/user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserDetailService } from 'src/app/services/user-detail.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user!: User;
  userAPI!: User
  submitted = false;
  loading = false;

  constructor( 
    private userdetailService: UserDetailService,
    private formBuider: FormBuilder,
    private authService: AuthenticationService
  ) {
      this.user = this.authService.userValue;
   }

  ngOnInit(): void {
      this.loadData();
  }

  loadData(){
    this.loading = true;
    this.userdetailService.showProfile(this.user.id).pipe(first()).subscribe( data => {
      this.loading = false;
      this.userAPI = data;
      console.log(data)
    }, error => {
      console.log(error);
      
    })
  }
}
