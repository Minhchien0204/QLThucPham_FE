import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { bodyChiTietKiemKe, ChiTietKiemKe } from 'src/app/models/chi-tiet-kiem-ke';
import { ChiTietKiemKeService } from 'src/app/services/chi-tiet-kiem-ke.service';
import { ThucPhamService } from 'src/app/services/thuc-pham.service';

@Component({
  selector: 'app-chi-tiet-kiem-ke',
  templateUrl: './chi-tiet-kiem-ke.component.html',
  styleUrls: ['./chi-tiet-kiem-ke.component.css']
})
export class ChiTietKiemKeComponent implements OnInit {
  createForm: FormGroup;
  alerMsg: {[index: string]:any} = {
    "showMsg": false,
    "typeMsg": 'info',
    "contentMsg": ''
  }
  listThucPham: {[index: string]: any}[]=[];
  chiTietKiemKe = Object.assign({}, bodyChiTietKiemKe);
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private thucPhamService: ThucPhamService,
    private chiTietKiemKeService: ChiTietKiemKeService,
    private activeRoute: ActivatedRoute
  ) {
    this.createForm = this.fb.group(
      {
        soPhieuKiemKe: [{value: '', disabled: true}, [Validators.required]],
        maThucPham: [{value: '', disabled: false}, [Validators.required]],
        soLuong: [{value: '', disabled: false}, [Validators.required] ],
        chatLuong: [{value: '', disabled: false}, [Validators.required] ],

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
      this.chiTietKiemKe.soPhieuKiemKe = param['id'];
    });
    await Promise.all([this.createForm.get('soPhieuKiemKe')?.setValue(this.chiTietKiemKe.soPhieuKiemKe)]);
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

  async addChiTietKiemKe() {
    this.chiTietKiemKe.soPhieuKiemKe = this.createForm.get("soPhieuKiemKe")!.value;
    this.chiTietKiemKe.maThucPham = this.createForm.get("maThucPham")!.value;
    this.chiTietKiemKe.soLuong = this.createForm.get("soLuong")!.value;
    this.chiTietKiemKe.chatLuong = this.createForm.get("chatLuong")!.value;
    if (this.createForm.valid) {
      const postChiTietKiemKe = this.chiTietKiemKeService.addChiTietKiemKe(this.chiTietKiemKe).toPromise().then((data) => {
        this.router.navigateByUrl(
          '/phieu-kiem-ke',
          {state: {typeMsg: 'success', contentMsg: "Success"}})
      },
      (error) => {
        this.alerMsg['showMsg'] = true;
        this.alerMsg['typeMsg'] = 'danger';
        this.alerMsg['contentMsg'] = 'Failed create!';
      });
      await Promise.all([postChiTietKiemKe]);
    }
  }


}
