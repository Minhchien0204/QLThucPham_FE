import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import {bodyThucPham} from '../../../models/thuc-pham';
import {ThucPhamService} from '../../../services/thuc-pham.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-tao-thuc-pham',
  templateUrl: './tao-thuc-pham.component.html',
  styleUrls: ['./tao-thuc-pham.component.css']
})
export class TaoThucPhamComponent implements OnInit {
  createForm: FormGroup;
  alerMsg: {[index: string]:any} = {
    "showMsg": false,
    "typeMsg": 'info',
    "contentMsg": ''
  }
  
  constructor(private fb: FormBuilder,
    private router: Router,
    private titleService: Title,
    private thucPhamService: ThucPhamService) {
      this.titleService.setTitle('Thêm thực phẩm');
      this.createForm = this.fb.group(
        {
          tenThucPham: [{ value: '', disabled: false }, [Validators.required]],
          donVi: [{ value: '', disabled: false }, [Validators.required]],
        }
      );
     }

  ngOnInit(): void {
  }

  async addThucPham() {
    const tpham = Object.assign({}, bodyThucPham);

    // Get data from form.
    tpham.tenThucPham = this.createForm.get("tenThucPham")!.value;
    tpham.donVi = this.createForm.get("donVi")!.value;

    if (this.createForm.valid) {
      const postTp = this.thucPhamService.addThucPham(tpham).toPromise().then((data) => {
        this.router.navigateByUrl(
          '/thuc-pham',
          {state: {typeMsg: 'success', contentMsg: "Success"}})
      },
      (error) => {
        this.alerMsg['showMsg'] = true;
        this.alerMsg['typeMsg'] = 'danger';
        this.alerMsg['contentMsg'] = 'Failed update!';
      });
      await Promise.all([postTp]);
    }
  }
}
