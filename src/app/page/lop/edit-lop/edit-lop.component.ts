import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import {bodyLop} from '../../../models/lop';
import {LopService} from '../../../services/lop.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-edit-lop',
  templateUrl: './edit-lop.component.html',
  styleUrls: ['./edit-lop.component.css']
})
export class EditLopComponent implements OnInit {
  editForm: FormGroup;
  alerMsg: {[index: string]:any} = {
    "showMsg": false,
    "typeMsg": 'info',
    "contentMsg": ''
  }
  lopObject = Object.assign({}, bodyLop);
  constructor(
    private titleService: Title,
    private fb: FormBuilder,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private lopService: LopService) {
      this.titleService.setTitle('Sửa lớp');
      this.editForm=this.fb.group(
        {
          maLop: [{ value: '', disabled: true }, [Validators.required]],
          tenLop: [{ value: '', disabled: false }, [Validators.required]],
          soLuong: [{ value: '', disabled: false }, [Validators.required]],
        }
      );
     }

  ngOnInit(): void {
    this.getData()
  }

  getData() {
    // get param on url
    this.activeRoute.params.subscribe((param)=> {
      this.lopObject.maLop = param['id'];
    });
    this.getLop(this.lopObject.maLop);
  }

  async getLop(id: string) {
    const getLop = this.lopService.getLopDetail(id).toPromise().then((lop: {[index: string]:any}) => {
      // set data for model nhan vien
      this.lopObject.maLop = lop['maLop'];
      this.lopObject.tenLop = lop['tenLop'];
      this.lopObject.soLuong = lop['soLuong'];

      this.editForm.get('maLop')?.setValue(this.lopObject.maLop);
      this.editForm.get('tenLop')?.setValue(this.lopObject.tenLop);
      this.editForm.get('soLuong')?.setValue(this.lopObject.soLuong);
    }, ()=> {
      this.alerMsg['showMsg'] = true;
      this.alerMsg['typeMsg'] = 'danger';
      this.alerMsg['contentMsg'] = 'Get Nhân Viên error!';
    });
    await Promise.all([getLop]);
  }

  async editLop() {
    // Get data from form.
    this.lopObject.tenLop = this.editForm.get("tenLop")!.value;
    this.lopObject.soLuong = this.editForm.get("soLuong")!.value;
    if (this.editForm.valid) {
      const putLop = this.lopService.putLop(this.lopObject.maLop, this.lopObject).toPromise().then((data) => {
        this.router.navigateByUrl(
          '/lop',
          {state: {typeMsg: 'success', contentMsg: "Edit success !"}})
      },
      (error) => {
        this.alerMsg['showMsg'] = true;
        this.alerMsg['typeMsg'] = 'danger';
        this.alerMsg['contentMsg'] = 'Failed update!';
      });
      await Promise.all([putLop]);
    }
  }

}
