import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { bodyMonAn } from '../../../models/mon-an';
import { bodyDinhLuong } from '../../../models/dinh-luong';
import {MonAnService} from '../../../services/mon-an-service.service';
import {ThucPhamService} from '../../../services/thuc-pham.service';

@Component({
  selector: 'app-tao-dinh-luong',
  templateUrl: './tao-dinh-luong.component.html',
  styleUrls: ['./tao-dinh-luong.component.css']
})
export class TaoDinhLuongComponent implements OnInit {
  createForm: FormGroup;
  alerMsg: {[index: string]:any} = {
    "showMsg": false,
    "typeMsg": 'info',
    "contentMsg": ''
  }
  listThucPham: {[index: string]:any}[] = [];
  monAnObject = Object.assign({}, bodyMonAn);
  constructor(private fb: FormBuilder,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private monAnService: MonAnService,
    private thucPhamService: ThucPhamService) {
      this.createForm = this.fb.group(
        {
          tenThucPham: [{ value: '', disabled: false }, [Validators.required]],
          soLuong: [{ value: '', disabled: false }, [Validators.required]],
        }
      );
     }

  ngOnInit(): void {
    this.activeRoute.params.subscribe(async (param)=> {
      this.monAnObject.maMonAn = param['id'];
      const getDL = this.monAnService.getMonAnDetail(this.monAnObject.maMonAn).toPromise().then(
        (data) => {
          this.monAnObject.tenMonAn = data['tenMonAn'];
        }
      );
      await Promise.all([getDL]);
    });
    this.getListThucPham()
  }

  async addDinhLuongMA() {
    if (this.createForm.valid) {
      const dinhLuong = Object.assign({}, bodyDinhLuong);
      dinhLuong.maMonAn = this.monAnObject.maMonAn
      dinhLuong.tenMonAn = this.monAnObject.tenMonAn
      // Get data from form.
      dinhLuong.maThucPham = this.createForm.get("tenThucPham")!.value;
      console.log('denp', dinhLuong.maThucPham)
      this.listThucPham.map(
        (tp) => {
          if (dinhLuong.maThucPham == tp['maThucPham']) {
            dinhLuong.tenThucPham = tp['tenThucPham'];
          }
        }
      );
      dinhLuong.soLuong = this.createForm.get("soLuong")!.value;

      const postDinhLuong = this.monAnService.addDinhLuong(this.monAnObject.maMonAn,  dinhLuong).toPromise().then((data) => {
        this.router.navigateByUrl(
          '/mon-an/' + this.monAnObject.maMonAn + '/dinh-luong',
          {state: {typeMsg: 'success', contentMsg: "Success"}})
      },
      (error) => {
        this.alerMsg['showMsg'] = true;
        this.alerMsg['typeMsg'] = 'danger';
        this.alerMsg['contentMsg'] = 'Failed update!';
      });
      await Promise.all([postDinhLuong]);
    }
  }

  async getListThucPham() {
    const getListTP = this.thucPhamService.getListThucPham().toPromise().then(
      async (dataResponse) => {
        this.listThucPham = dataResponse
      },
      (error)=>{
        // do notthing
      }
    );
    await Promise.all([getListTP]);
  }
}
