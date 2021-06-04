import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { bodyChiTietCungCap } from 'src/app/models/chi-tiet-cung-cap';
import { ChiTietCungCapService } from 'src/app/services/chi-tiet-cung-cap.service';
import { NhaCungCapService } from 'src/app/services/nha-cung-cap.service';
import { ThucPhamService } from 'src/app/services/thuc-pham.service';

@Component({
  selector: 'app-add-chi-tiet-cung-cap',
  templateUrl: './add-chi-tiet-cung-cap.component.html',
  styleUrls: ['./add-chi-tiet-cung-cap.component.css']
})
export class AddChiTietCungCapComponent implements OnInit {
  createForm: FormGroup;
  alerMsg: {[index: string]:any} = {
    "showMsg": false,
    "typeMsg": 'info',
    "contentMsg": ''
  }
  listThucPham: {[index: string]: any}[]=[];
  listNhaCungCap: {[index: string]: any}[]=[];
  chiTietCungCap = Object.assign({}, bodyChiTietCungCap);
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private thucPhamService: ThucPhamService,
    private chiTietCungCapService: ChiTietCungCapService,
    private activeRoute: ActivatedRoute,
    private nhaCungCapService: NhaCungCapService
  ) {
    this.createForm = this.fb.group(
      {
        soPhieuCugCap: [{value: '', disabled: true}, [Validators.required]],
        maThucPham: [{value: '', disabled: false}, [Validators.required]],
        maNhaCungCap: [{value: '', disabled: false}, [Validators.required]],
        soLuong: [{value: '', disabled: false}, [Validators.required] ],
      }
    );
    this.getListNhaCungCap();
    this.getListThucPham();
   }

   async ngOnInit(): Promise<void> {
    console.log('init')
    await Promise.all([this.getData()]);
    console.log('xong init')
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
    console.log(dataGet)
  }

  async getListNhaCungCap() {
    const dataGet1: any[] = [];
    const getNhaCungCap = this.nhaCungCapService.getListNhaCungCap().toPromise().then(
      async (dataResponse) => {
        dataResponse.map((thucpham) => {
          dataGet1.push(thucpham)
        })
      },
      (error)=>{
        // do notthing
      }
    );
    await Promise.all([getNhaCungCap]);
    this.listNhaCungCap = dataGet1;
    console.log(dataGet1)
  }


  async getData(){
    this.activeRoute.params.subscribe((param) => {
      this.chiTietCungCap.soPhieuCugCap = param['id'];
    });
    await Promise.all([this.createForm.get('soPhieuCugCap')?.setValue(this.chiTietCungCap.soPhieuCugCap)]);
  }

  async addChiTietCungCap() {
    this.chiTietCungCap.soPhieuCugCap = this.createForm.get("soPhieuCugCap")!.value;
    this.chiTietCungCap.maThucPham = this.createForm.get("maThucPham")!.value;
    this.chiTietCungCap.maNhaCungCap = this.createForm.get("maNhaCungCap")!.value;
    this.chiTietCungCap.soLuong = this.createForm.get("soLuong")!.value;
    if (this.createForm.valid) {
      const postChiTietCungCap = this.chiTietCungCapService.addChiTietCungCap(this.chiTietCungCap).toPromise().then((data) => {
        this.router.navigateByUrl(
          '/phieu-cung-cap',
          {state: {typeMsg: 'success', contentMsg: "Success"}})
      },
      (error) => {
        this.alerMsg['showMsg'] = true;
        this.alerMsg['typeMsg'] = 'danger';
        this.alerMsg['contentMsg'] = 'Failed update!';
      });
      await Promise.all([postChiTietCungCap]);
    }
  }

}
