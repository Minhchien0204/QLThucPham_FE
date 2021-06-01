import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { bodyChiTietYeuCau } from 'src/app/models/chi-tiet-yeu-cau';
import { ChiTietYeuCauService } from 'src/app/services/chi-tiet-yeu-cau.service';
import { PhieuYeuCauService } from 'src/app/services/phieu-yeu-cau.service';
import { ThucPhamService } from 'src/app/services/thuc-pham.service';

@Component({
  selector: 'app-add-chi-tiet-yeu-cau',
  templateUrl: './add-chi-tiet-yeu-cau.component.html',
  styleUrls: ['./add-chi-tiet-yeu-cau.component.css']
})
export class AddChiTietYeuCauComponent implements OnInit {
  createForm: FormGroup;
  alerMsg: {[index: string]:any} = {
    "showMsg": false,
    "typeMsg": 'info',
    "contentMsg": ''
  }
  listThucPham: {[index: string]: any}[]=[];
  chiTietYeuCau = Object.assign({}, bodyChiTietYeuCau);
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private thucPhamService: ThucPhamService,
    private chiTietYeuCauService: ChiTietYeuCauService,
    private activeRoute: ActivatedRoute
  ) { 
    this.createForm = this.fb.group(
      {
        soPhieuYeuCau: [{value: '', disabled: true}, [Validators.required]],
        maThucPham: [{value: '', disabled: false}, [Validators.required]],
        soLuong: [{value: '', disabled: false}, [Validators.required] ],
      }
    );
    this.getListThucPham();
  }

  async ngOnInit(): Promise<void> {
    console.log('init')
    await Promise.all([this.getData()]);
    console.log('xong init')
  }


  async getData(){
    this.activeRoute.params.subscribe((param) => {
      this.chiTietYeuCau.soPhieuYeuCau = param['id'];
    });
    await Promise.all([this.createForm.get('soPhieuYeuCau')?.setValue(this.chiTietYeuCau.soPhieuYeuCau)]);
  }

  async getListThucPham() {
    const dataGet: any[] = [];
    const getThucPham = this.thucPhamService.getListThucPham().toPromise().then(
      async (dataResponse) => {
        dataResponse.map((thucpham) => {
          dataGet.push(thucpham)
        })
      },
      (error)=>{
        // do notthing
      }
    );
    await Promise.all([getThucPham]);
    this.listThucPham = dataGet;
  }


  async addChiTietYeuCau() {
    this.chiTietYeuCau.soPhieuYeuCau = this.createForm.get("soPhieuYeuCau")!.value;
    this.chiTietYeuCau.maThucPham = this.createForm.get("maThucPham")!.value;
    this.chiTietYeuCau.soLuong = this.createForm.get("soLuong")!.value;
    if (this.createForm.valid) {
      const postChiTietYeuCau = this.chiTietYeuCauService.addChiTietYeuCau(this.chiTietYeuCau).toPromise().then((data) => {
        this.router.navigateByUrl(
          '/phieu/yeu-cau-thuc-pham',
          {state: {typeMsg: 'success', contentMsg: "Success"}})
      },
      (error) => {
        this.alerMsg['showMsg'] = true;
        this.alerMsg['typeMsg'] = 'danger';
        this.alerMsg['contentMsg'] = 'Failed create!';
      });
      await Promise.all([postChiTietYeuCau]);
    }
  }

}
