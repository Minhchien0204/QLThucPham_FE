import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import {bodyThucPham} from '../../../models/thuc-pham';
import {ThucPhamService} from '../../../services/thuc-pham.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-edit-thuc-pham',
  templateUrl: './edit-thuc-pham.component.html',
  styleUrls: ['./edit-thuc-pham.component.css']
})
export class EditThucPhamComponent implements OnInit {
  editForm: FormGroup;
  alerMsg: {[index: string]:any} = {
    "showMsg": false,
    "typeMsg": 'info',
    "contentMsg": ''
  }
  thucPhamObject = Object.assign({}, bodyThucPham);
  constructor(private fb: FormBuilder,
    private activeRoute: ActivatedRoute,
    private titleService: Title,
    private router: Router,
    private thucPhamService: ThucPhamService) {
      this.titleService.setTitle('Sửa thực phẩm');
      this.editForm=this.fb.group(
        {
          tenThucPham: [{ value: '', disabled: false }, [Validators.required]],
          donVi: [{ value: '', disabled: false }, [Validators.required]],
        }
      );
     }

  ngOnInit(): void {
    this.getData()
  }

  getData() {
    // get param on url
    this.activeRoute.params.subscribe((param)=> {
      this.thucPhamObject.maThucPham = param['id'];
    });
    this.getThucPham(this.thucPhamObject.maThucPham);
  }

  async getThucPham(id: string) {
    const getTP = this.thucPhamService.getThucPhamDetail(id).toPromise().then((tp: {[index: string]:any}) => {
      // set data for model nhan vien
      this.thucPhamObject.maThucPham = tp['maThucPham'];
      this.thucPhamObject.tenThucPham = tp['tenThucPham'];
      this.thucPhamObject.donVi = tp['donVi'];

      this.editForm.get('tenThucPham')?.setValue(this.thucPhamObject.tenThucPham);
      this.editForm.get('donVi')?.setValue(this.thucPhamObject.donVi);
    }, ()=> {
      this.alerMsg['showMsg'] = true;
      this.alerMsg['typeMsg'] = 'danger';
      this.alerMsg['contentMsg'] = 'Get món ăn error!';
    });
    await Promise.all([getTP]);
  }

  async editThucPham() {
    // Get data from form.
    this.thucPhamObject.tenThucPham = this.editForm.get("tenThucPham")!.value;
    this.thucPhamObject.donVi = this.editForm.get("donVi")!.value;
    if (this.editForm.valid) {
      const putTP = this.thucPhamService.putThucPham(this.thucPhamObject.maThucPham, this.thucPhamObject).toPromise().then((data) => {
        this.router.navigateByUrl(
          '/thuc-pham',
          {state: {typeMsg: 'success', contentMsg: "Edit success !"}})
      },
      () => {
        this.alerMsg['showMsg'] = true;
        this.alerMsg['typeMsg'] = 'danger';
        this.alerMsg['contentMsg'] = 'Failed update!';
      });
      await Promise.all([putTP]);
    }
  }
}
