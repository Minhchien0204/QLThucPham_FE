import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { bodyNhaCungCap } from 'src/app/models/nha-cung-cap';
import { NhaCungCapService } from 'src/app/services/nha-cung-cap.service';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-add-nha-cung-cap',
  templateUrl: './add-nha-cung-cap.component.html',
  styleUrls: ['./add-nha-cung-cap.component.css']
})
export class AddNhaCungCapComponent implements OnInit {
  createForm: FormGroup;
  alerMsg: {[index: string]:any} = {
    "showMsg": false,
    "typeMsg": 'info',
    "contentMsg": ''
  }
  constructor(
    private fb: FormBuilder,
    private titleService: Title,
    private router: Router,
    private nhaCungCapService: NhaCungCapService
  ) { 
    this.titleService.setTitle('Thêm nhà cung cấp');
    this.createForm = this.fb.group(
      {
        maNhaCungCap: [{value: '',disabled: false}],
        tenNhaCungCap: [{value: '',disabled: false}, [Validators.required]],
        dienThoai: [{value: '',disabled: false}, [Validators.required]],
        diaChi: [{value: '',disabled: false}, [Validators.required]],
      }
    );
   }

  ngOnInit(): void {
  }

  async addNhaCungCap(){
    const nhacungcap = Object.assign({}, bodyNhaCungCap);
    nhacungcap.maNhaCungCap = this.createForm.get("maNhaCungCap")!.value;
    nhacungcap.tenNhaCungCap = this.createForm.get("tenNhaCungCap")!.value;
    nhacungcap.dienThoai = this.createForm.get("dienThoai")!.value;
    nhacungcap.diaChi = this.createForm.get("diaChi")!.value;

    if(this.createForm.valid){
      const postNhaCungCap = this.nhaCungCapService.createNhaCungCap(nhacungcap).toPromise().then((data) => {
        this.router.navigateByUrl(
          '/nha-cung-cap',
          {state: {typeMsg: 'success', contentMsg: "Success"}}
        )
      },
      (error) => {
        this.alerMsg['showMsg'] = true;
        this.alerMsg['typeMsg'] = 'danger';
        this.alerMsg['contentMsg'] = 'Failed create!';
      });
      await Promise.all([postNhaCungCap]);
    }
  }
}
