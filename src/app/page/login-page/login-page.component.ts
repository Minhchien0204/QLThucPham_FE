import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators  } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  loginForm!: FormGroup;
  loading = false;
  submitted = false;
  error = '';
  role! : string;

  constructor(
    private titleService: Title,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService
  ) { 
    this.titleService.setTitle('Login');
    // chuyem den trang neu da dang nhap
    var role = this.authenticationService.userValue.role;
    if( this.authenticationService.userValue && role == 'Admin')
    {
      this.router.navigate(['/']);
    }
    if(this.authenticationService.userValue)
    {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
  });
  }

  get f() {return this.loginForm.controls; }

  onSubmit(){
    this.submitted = true;

    //stop khi neu form ko hop le
    if(this.loginForm.invalid){
      return;
    }

    this.loading = true;
    this.authenticationService.login(this.f.username.value, this.f.password.value)
      .pipe(first())
      .subscribe(
        data => {
          console.log(data);
          this.role = data.role;
          if(data.role == 'Admin')
          {
            this.router.navigate(['/home']);
          }
          if(data.role == 'GiaoVien' || data.role == 'NhaBep' || data.role == 'ThucPham')
          {
            this.router.navigate(['/home']);
          }
        },
        error => {
          this.error = error;
          this.loading = false;
        }
      );
  }
  
}
