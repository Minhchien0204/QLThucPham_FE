import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { User } from 'src/app/models/user';
import { UserDetailService } from 'src/app/services/user-detail.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user!: User;
  submitted = false;
  private currenUserSubject!: BehaviorSubject<User>;

  constructor( 
    private userdetailService: UserDetailService,
    private formBuider: FormBuilder
  ) { }

  ngOnInit(): void {
    this.user = new User();
    this.loadData();
  }


  loadData() {
    this.currenUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user') || '{}'));
    var userId = this.currenUserSubject.value.id;
    console.log(userId);
    this.userdetailService.showProfile(userId).subscribe(data => {
      this.user = data;
      console.log(this.user)
    }, error => {
      console.log(error);
    })
  }
}
