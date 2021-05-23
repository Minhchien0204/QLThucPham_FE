import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import {bodyNhanVien} from '../../../models/nhan-vien';
import {NhanvienService} from '../../../services/nhanvien.service';
import { Role } from '../../../models/role';

@Component({
  selector: 'app-edit-nhan-vien',
  templateUrl: './edit-nhan-vien.component.html',
  styleUrls: ['./edit-nhan-vien.component.css']
})
export class EditNhanVienComponent implements OnInit {

  createForm: FormGroup;
  alerMsg: {[index: string]:any} = {
    "showMsg": false,
    "typeMsg": 'info',
    "contentMsg": ''
  }
  nhanVien = Object.assign({}, bodyNhanVien);
  constructor(private fb: FormBuilder,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private nhanVienService: NhanvienService) { 
    this.createForm=this.fb.group(
      {
        maNhanVien: [{ value: '', disabled: true }, [Validators.required]],
        name: [{ value: '', disabled: true }, [Validators.required]],
        tenBoPhan: [{ value: '', disabled: false }, [Validators.required]],
      }
    );
  }

  ngOnInit(): void {
    this.getData()
  }

  getData() {
    // get param on url
    this.activeRoute.params.subscribe((param)=> {
      this.nhanVien.id = param['id'];
    });
    this.getNhanVien(this.nhanVien.id);
  }

  async getNhanVien(id: string) {
    const getNV = this.nhanVienService.getNhanVien(id).toPromise().then((nhanvien: {[index: string]:any}) => {
      // set data for model nhan vien
      this.nhanVien.id = nhanvien['id'];
      this.nhanVien.maNhanVien = nhanvien['maNhanVien'];
      this.nhanVien.name = nhanvien['name'];
      this.nhanVien.dienThoai = nhanvien['dienThoai'];
      this.nhanVien.diaChi = nhanvien['diaChi'];
      this.nhanVien.ngaySinh = nhanvien['ngaySinh'];
      this.nhanVien.tenBoPhan = nhanvien['tenBoPhan'];

      this.createForm.get('maNhanVien')?.setValue(this.nhanVien.maNhanVien);
      this.createForm.get('name')?.setValue(this.nhanVien.name);
      this.createForm.get('tenBoPhan')?.setValue(this.nhanVien.tenBoPhan);
    }, ()=> {
      this.alerMsg['showMsg'] = true;
      this.alerMsg['typeMsg'] = 'danger';
      this.alerMsg['contentMsg'] = 'Get Nhân Viên error!';
    });
    await Promise.all([getNV]);
  }

  async updateRole() {
    // Get data from form.
    this.nhanVien.tenBoPhan = this.createForm.get("tenBoPhan")!.value;
    if (this.createForm.valid) {
      const putNhanVien = this.nhanVienService.putNhanVien(this.nhanVien.id, this.nhanVien).toPromise().then((data) => {
        this.router.navigateByUrl(
          '/nhan-vien',
          {state: {typeMsg: 'success', contentMsg: "Success"}})
      },
      (error) => {
        this.alerMsg['showMsg'] = true;
        this.alerMsg['typeMsg'] = 'danger';
        this.alerMsg['contentMsg'] = 'Failed update!';
      });
    }
    
  }
}
