import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { bodyUser } from 'src/app/models/user-detail';



@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  editForm: FormGroup;
  alerMsg: {[index: string]:any} = {
    "showMsg": false,
    "typeMsg": 'info',
    "contentMsg": ''
  }
  user = Object.assign({}, bodyUser);
  constructor(
          private fb: FormBuilder,
          private activeRoute: ActivatedRoute,
          private router: Router,
          private userService: UserService
    ) { 
        this.editForm = this.fb.group(
          {
            userName:[{value: '', disabled: false}, [Validators.required]],
            password:[{value: '', disabled: false}, [Validators.nullValidator]],
            name:[{value: '', disabled: false}, [Validators.required]],
            gioiTinh:[{value: '', disabled: false}, [Validators.required]],
            ngaySinh:[{value: '', disabled: false}, [Validators.required]],
            dienThoai:[{value: '', disabled: false}, [Validators.required]],
            diaChi:[{value: '', disabled: false}, [Validators.required]],
            role:[{value: '', disabled: false}, [Validators.required]],
          }
        );

     }

  async ngOnInit(): Promise<void> {
    await Promise.all([this.getData()]);
  }

  async getData() {
    this.activeRoute.params.subscribe((param) => {
      this.user.id = param['id'];
    });
    await Promise.all([this.getUser(this.user.id)]);
  }


  async getUser(id: string) {
    const _getUser = this.userService.getUserDetail(id).toPromise().then((us: {[index: string]: any}) => {
      this.user.id = us['id'];
      this.user.userName = us['userName'];
      this.user.password = us['password'];
      this.user.name = us['name'];
      this.user.gioiTinh = us['gioiTinh'];
      this.user.ngaySinh = us['ngaySinh'];
      this.user.dienThoai = us['dienThoai'];
      this.user.diaChi = us['diaChi'];
      this.user.role = us['role'];


      this.editForm.get('userName')?.setValue(this.user.userName);
      this.editForm.get('password')?.setValue(this.user.password);
      this.editForm.get('name')?.setValue(this.user.name);
      this.editForm.get('gioiTinh')?.setValue(String(this.user.gioiTinh));
      this.editForm.get('ngaySinh')?.setValue(this.user.ngaySinh);
      this.editForm.get('dienThoai')?.setValue(this.user.dienThoai);
      this.editForm.get('diaChi')?.setValue(this.user.diaChi);
      this.editForm.get('role')?.setValue(this.user.role);
    }, () => {
      this.alerMsg['showMsg'] = true;
      this.alerMsg['typeMsg'] = 'danger';
      this.alerMsg['contentMsg'] = 'Get user error!';
    });
    await Promise.all([_getUser]);
  }

  async editUser() {
    this.user.userName  = this.editForm.get("userName")!.value;
    this.user.password  = this.editForm.get("password")!.value;
    this.user.name  = this.editForm.get("name")!.value;
    this.user.gioiTinh  = this.editForm.get("gioiTinh")!.value;
    this.user.ngaySinh  = this.editForm.get("ngaySinh")!.value;
    this.user.dienThoai  = this.editForm.get("dienThoai")!.value;
    this.user.diaChi  = this.editForm.get("diaChi")!.value;
    this.user.role  = this.editForm.get("role")!.value;

    if(this.editForm.valid) {
      const putUser = this.userService.updateUser(this.user.id, this.user).toPromise().then((data) => {
        this.router.navigateByUrl(
          '/user',
          {state: {typeMsg: 'success', contentMsg: "Edit success !"}}
        )
      }, (error) => {
        this.alerMsg['showMsg'] = true;
        this.alerMsg['typeMsg'] = 'danger';
        this.alerMsg['contentMsg'] = 'Failed update!';
      });
      await Promise.all([putUser]);
    }
    
  }
}
