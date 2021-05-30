import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { bodyUser } from 'src/app/models/user-detail';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  addForm!: FormGroup;
  alerMsg: {[index: string]:any} = {
    "showMsg": false,
    "typeMsg": 'info',
    "contentMsg": ''
  }
  constructor(
    private fb: FormBuilder,
    private activeRoute: ActivatedRoute,
    private userService: UserService,
    private router: Router
  ) { 
    this.addForm = this.fb.group(
      {
        userName: [{value: '',disabled: false}, [Validators.required]],
        password: [{value: '',disabled: false}, [Validators.required]],
        name: [{value: '',disabled: false}, [Validators.required]],
        gioiTinh: [{value: '',disabled: false}, [Validators.required]],
        ngaySinh: [{value: '',disabled: false}, [Validators.required]],
        dienThoai: [{value: '',disabled: false}, [Validators.required]],
        diaChi: [{value: '',disabled: false}, [Validators.required]],
        role: [{value: '',disabled: false}, [Validators.required]],
      }
    );
  }

  ngOnInit(): void {
  }

  async addUser() {
    const user = Object.assign({}, bodyUser);

    user.userName = this.addForm.get("userName")!.value;
    user.password = this.addForm.get("password")!.value;
    user.name = this.addForm.get("name")!.value;
    user.gioiTinh = JSON.parse(this.addForm.get("gioiTinh")!.value);
    user.ngaySinh = this.addForm.get("ngaySinh")!.value;
    user.dienThoai = this.addForm.get("dienThoai")!.value;
    user.diaChi = this.addForm.get("diaChi")!.value;
    user.role = this.addForm.get("role")!.value;

    if(this.addForm.valid) {
      const postUser = this.userService.addUser(user).toPromise().then((data) => {
        this.router.navigateByUrl(
          '/user',
          {state: {typeMsg: 'success', contentMsg: "Success"}}
        )
      },
      (error) => 
      {
        this.alerMsg['showMsg'] = true;
        this.alerMsg['typeMsg'] = 'danger';
        this.alerMsg['contentMsg'] = 'Failed create!';
      });
      await Promise.all([postUser]);
    }
  }

}
