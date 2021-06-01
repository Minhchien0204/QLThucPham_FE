import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { bodyChiTietGiao } from 'src/app/models/chi-tiet-giao';
import { ChiTietGiaoService } from 'src/app/services/chi-tiet-giao.service';
import { NhaCungCapService } from 'src/app/services/nha-cung-cap.service';
import { ThucPhamService } from 'src/app/services/thuc-pham.service';

@Component({
  selector: 'app-add-chi-tiet-giao',
  templateUrl: './add-chi-tiet-giao.component.html',
  styleUrls: ['./add-chi-tiet-giao.component.css']
})
export class AddChiTietGiaoComponent implements OnInit {
  createForm: FormGroup;
  alerMsg: {[index: string]:any} = {
    "showMsg": false,
    "typeMsg": 'info',
    "contentMsg": ''
  }
  listThucPham: {[index: string]: any}[]=[];
  listNhaCungCap: {[index: string]: any}[]=[];
  chiTietGiao = Object.assign({}, bodyChiTietGiao);
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private thucPhamService: ThucPhamService,
    private chiTietGiaoService: ChiTietGiaoService,
    private activeRoute: ActivatedRoute,
    private nhaCungCapService: NhaCungCapService
  ) {
    this.createForm = this.fb.group(
      {
        soPhieuGiao: [{value: '', disabled: true}, [Validators.required]],
        maThucPham: [{value: '', disabled: false}, [Validators.required]],
        maNhaCungCap: [{value: '', disabled: false}, [Validators.required]],
        soLuong: [{value: '', disabled: false}, [Validators.required] ],
        donGia: [{value: '', disabled: false}, [Validators.required] ],
      }
    );
    this.getListThucPham();
    this.getListNhaCungCap();
   }

   async ngOnInit(): Promise<void> {
    console.log('init')
    await Promise.all([this.getData()]);
    console.log('xong init')
  }

  async getData(){
    this.activeRoute.params.subscribe((param) => {
      this.chiTietGiao.soPhieuGiao = param['id'];
    });
    await Promise.all([this.createForm.get('soPhieuGiao')?.setValue(this.chiTietGiao.soPhieuGiao)]);
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

  async getListNhaCungCap() {
    const dataGet1: any[] = [];
    const getNhaCungCap = this.nhaCungCapService.getListNhaCungCap().toPromise().then(
      async (dataResponse) => {
        dataResponse.map((nhacungcap) => {
          dataGet1.push(nhacungcap)
        })
      },
      (error)=>{
        // do notthing
      }
    );
    await Promise.all([getNhaCungCap]);
    this.listNhaCungCap = dataGet1;
  }

  async addChiTietGiao() {
    this.chiTietGiao.soPhieuGiao = this.createForm.get("soPhieuGiao")!.value;
    this.chiTietGiao.maThucPham = this.createForm.get("maThucPham")!.value;
    this.chiTietGiao.maNhaCungCap = this.createForm.get("maNhaCungCap")!.value;
    this.chiTietGiao.soLuong = this.createForm.get("soLuong")!.value;
    this.chiTietGiao.donGia = this.createForm.get("donGia")!.value;
    if (this.createForm.valid) {
      const postChiTietGiao = this.chiTietGiaoService.addChiTietGiao(this.chiTietGiao).toPromise().then((data) => {
        this.router.navigateByUrl(
          '/phieu/giao',
          {state: {typeMsg: 'success', contentMsg: "Success"}})
      },
      (error) => {
        this.alerMsg['showMsg'] = true;
        this.alerMsg['typeMsg'] = 'danger';
        this.alerMsg['contentMsg'] = 'Failed create!';
      });
      await Promise.all([postChiTietGiao]);
    }
  }

}
