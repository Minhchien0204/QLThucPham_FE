import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { bodyPhieuGiao } from 'src/app/models/phieu-giao';
import { NhanvienService } from 'src/app/services/nhanvien.service';
import { PhieuCungCapService } from 'src/app/services/phieu-cung-cap.service';
import { PhieuGiaoService } from 'src/app/services/phieu-giao.service';

@Component({
  selector: 'app-add-phieu-giao',
  templateUrl: './add-phieu-giao.component.html',
  styleUrls: ['./add-phieu-giao.component.css']
})
export class AddPhieuGiaoComponent implements OnInit {
  createForm: FormGroup;
  alerMsg: {[index: string]:any} = {
    "showMsg": false,
    "typeMsg": 'info',
    "contentMsg": ''
  }
  listNhanVien: {[index: string]:any}[] = [];
  listPhieuCungCap: {[index: string]:any}[] = []
  constructor(
    private fb: FormBuilder,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private phieuGiaoService: PhieuGiaoService,
    private nhanVienService: NhanvienService,
    private phieuCungCapService: PhieuCungCapService
  ) {
    this.createForm = this.fb.group(
      {
        maNhanVien: [{ value: '', disabled: false },[Validators.required]],
        ngayLap: [{ value: '', disabled: false }, [Validators.required]],
        soPhieuCugCap: [{ value: '', disabled: false }, [Validators.required]],
        ghiChu: [{ value: '', disabled: false }],
      }
    );
   }
  
  ngOnInit(): void {
    this.getListPhieuCungCap();
    this.getListNhanVien();
  }

  async getListPhieuCungCap() {
    const dataGet: any[] = [];
    const getPhieuCungCap = this.phieuCungCapService.getListPhieuCungCap().toPromise().then(
      async (dataResponse) => {
        dataResponse.map((phieucungcap) => {
          dataGet.push(phieucungcap)
        })
      },
      (error)=>{
        // do notthing
      }
    );
    await Promise.all([getPhieuCungCap]);
    this.listPhieuCungCap = dataGet;
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

  async addPhieuGiao() {
    const phieuGiao = Object.assign({}, bodyPhieuGiao);

    // Get data from form.
    phieuGiao.maNhanVien = this.createForm.get("maNhanVien")!.value;
    phieuGiao.ngayLap = this.createForm.get("ngayLap")!.value;
    phieuGiao.soPhieuCugCap = this.createForm.get("soPhieuCugCap")!.value;
    phieuGiao.ghiChu = this.createForm.get("ghiChu")!.value;
    console.log(phieuGiao)
    if (this.createForm.valid) {
      const postPhieuGiao = this.phieuGiaoService.addPhieuGiao(phieuGiao).toPromise().then((data) => {
        this.router.navigateByUrl(
          '/phieu/giao',
          {state: {typeMsg: 'success', contentMsg: "Success"}})
      },
      (error) => {
        this.alerMsg['showMsg'] = true;
        this.alerMsg['typeMsg'] = 'danger';
        this.alerMsg['contentMsg'] = 'Failed create!';
      });
      await Promise.all([postPhieuGiao]);
    }
  }
}
