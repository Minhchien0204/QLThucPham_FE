import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { bodyPhieuCungCap } from 'src/app/models/phieu-cung-cap';
import { NhanvienService } from 'src/app/services/nhanvien.service';
import { PhieuCungCapService } from 'src/app/services/phieu-cung-cap.service';

@Component({
  selector: 'app-add-phieu-cung-cap',
  templateUrl: './add-phieu-cung-cap.component.html',
  styleUrls: ['./add-phieu-cung-cap.component.css']
})
export class AddPhieuCungCapComponent implements OnInit {
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
    private phieuCungCapService: PhieuCungCapService,
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

  async addPhieuCungCap() {
    const phieuCungCap = Object.assign({}, bodyPhieuCungCap);

    // Get data from form.
    phieuCungCap.maNhanVien = this.createForm.get("maNhanVien")!.value;
    phieuCungCap.ngayLap = this.createForm.get("ngayLap")!.value;
    phieuCungCap.ghiChu = this.createForm.get("ghiChu")!.value;
    console.log(phieuCungCap)
    if (this.createForm.valid) {
      const postPhieuCungCap = this.phieuCungCapService.addPhieuCungCap(phieuCungCap).toPromise().then((data) => {
        this.router.navigateByUrl(
          '/phieu-cung-cap',
          {state: {typeMsg: 'success', contentMsg: "Success"}})
      },
      (error) => {
        this.alerMsg['showMsg'] = true;
        this.alerMsg['typeMsg'] = 'danger';
        this.alerMsg['contentMsg'] = 'Failed create!';
      });
      await Promise.all([postPhieuCungCap]);
    }
  }
}
