import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { bodyPhieuBanGiao } from 'src/app/models/phieu-ban-giao';
import { NhanvienService } from 'src/app/services/nhanvien.service';
import { PhieuBanGiaoService } from 'src/app/services/phieu-ban-giao.service';
import { PhieuYeuCauService } from 'src/app/services/phieu-yeu-cau.service';

@Component({
  selector: 'app-add-phieu-ban-giao',
  templateUrl: './add-phieu-ban-giao.component.html',
  styleUrls: ['./add-phieu-ban-giao.component.css']
})
export class AddPhieuBanGiaoComponent implements OnInit {
  createForm: FormGroup;
  alerMsg: {[index: string]:any} = {
    "showMsg": false,
    "typeMsg": 'info',
    "contentMsg": ''
  }
  listNhanVien: {[index: string]:any}[] = [];
  listPhieuYeuCau: {[index: string]:any}[] = []
  constructor(
    private fb: FormBuilder,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private phieuBanGiaoService: PhieuBanGiaoService,
    private nhanVienService: NhanvienService,
    private phieuYeuCauService: PhieuYeuCauService
  ) { 
    this.createForm = this.fb.group(
      {
        maNhanVien: [{ value: '', disabled: false }],
        ngayLap: [{ value: '', disabled: false }, [Validators.required]],
        soPhieuYeuCau: [{ value: '', disabled: false }, [Validators.required]],
        ghiChu: [{ value: '', disabled: false }],
      }
    );
  }

  ngOnInit(): void {
    this.getListPhieuYeuCau();
    this.getListNhanVien();
  }

  async getListPhieuYeuCau() {
    const dataGet: any[] = [];
    const getPhieuYeuCau = this.phieuYeuCauService.getListPhieuYeuCau().toPromise().then(
      async (dataResponse) => {
        dataResponse.map((nhanvien) => {
          dataGet.push(nhanvien)
        })
      },
      (error)=>{
        // do notthing
      }
    );
    await Promise.all([getPhieuYeuCau]);
    this.listPhieuYeuCau = dataGet;
  }

  async getListNhanVien() {
    const dataGet: any[] = [];
    const getNhanVien = this.nhanVienService.getListNhanVien().toPromise().then(
      async (dataResponse) => {
        dataResponse.map((nhanvien) => {
          dataGet.push(nhanvien)
        })
      },
      (error)=>{
        // do notthing
      }
    );
    await Promise.all([getNhanVien]);
    this.listNhanVien = dataGet;
  }

  async addPhieuBanGiao() {
    const phieuBanGiao = Object.assign({}, bodyPhieuBanGiao);

    // Get data from form.
    phieuBanGiao.maNhanVien = this.createForm.get("maNhanVien")!.value;
    phieuBanGiao.ngayLap = this.createForm.get("ngayLap")!.value;
    phieuBanGiao.soPhieuYeuCau = this.createForm.get("soPhieuYeuCau")!.value;
    phieuBanGiao.ghiChu = this.createForm.get("ghiChu")!.value;
    console.log(phieuBanGiao)
    if (this.createForm.valid) {
      const postPhieuBanGiao = this.phieuBanGiaoService.addPhieuBanGiao(phieuBanGiao).toPromise().then((data) => {
        this.router.navigateByUrl(
          '/phieu/ban-giao',
          {state: {typeMsg: 'success', contentMsg: "Success"}})
      },
      (error) => {
        this.alerMsg['showMsg'] = true;
        this.alerMsg['typeMsg'] = 'danger';
        this.alerMsg['contentMsg'] = 'Failed create!';
      });
      await Promise.all([postPhieuBanGiao]);
    }
  }

}
