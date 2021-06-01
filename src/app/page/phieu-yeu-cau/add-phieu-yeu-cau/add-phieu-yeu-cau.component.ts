import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { bodyPhieuYeuCau } from 'src/app/models/phieu-yeu-cau';
import { NhanvienService } from 'src/app/services/nhanvien.service';
import { PhieuYeuCauService } from 'src/app/services/phieu-yeu-cau.service';

@Component({
  selector: 'app-add-phieu-yeu-cau',
  templateUrl: './add-phieu-yeu-cau.component.html',
  styleUrls: ['./add-phieu-yeu-cau.component.css']
})
export class AddPhieuYeuCauComponent implements OnInit {
  createForm: FormGroup;
  alerMsg: {[index: string]:any} = {
    "showMsg": false,
    "typeMsg": 'info',
    "contentMsg": ''
  }
  listNhanVien: {[index: string]:any}[] = []
  constructor(
    private fb: FormBuilder,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private phieuYeuCauService: PhieuYeuCauService,
    private nhanVienService: NhanvienService
  ) {
    this.createForm = this.fb.group(
      {
        maNhanVien: [{ value: '', disabled: false }],
        ngayLap: [{ value: '', disabled: false }, [Validators.required]],
        ghiChu: [{ value: '', disabled: false }],
      }
    );
   }

  ngOnInit(): void {
    this.getListNhanVien();
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

  async addPhieuYeuCau() {
    const phieuYeuCau = Object.assign({}, bodyPhieuYeuCau);

    // Get data from form.
    phieuYeuCau.maNhanVien = this.createForm.get("maNhanVien")!.value;
    phieuYeuCau.ngayLap = this.createForm.get("ngayLap")!.value;
    phieuYeuCau.ghiChu = this.createForm.get("ghiChu")!.value;
    console.log(phieuYeuCau)
    if (this.createForm.valid) {
      const postPhieuYeuCau = this.phieuYeuCauService.addPhieuYeuCau(phieuYeuCau).toPromise().then((data) => {
        this.router.navigateByUrl(
          '/phieu/yeu-cau-thuc-pham',
          {state: {typeMsg: 'success', contentMsg: "Success"}})
      },
      (error) => {
        this.alerMsg['showMsg'] = true;
        this.alerMsg['typeMsg'] = 'danger';
        this.alerMsg['contentMsg'] = 'Failed create!';
      });
      await Promise.all([postPhieuYeuCau]);
    }
  }

}
