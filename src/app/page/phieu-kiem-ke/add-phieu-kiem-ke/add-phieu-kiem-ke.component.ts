import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { bodyPhieuKiemKe } from 'src/app/models/phieu-kiem-ke';
import { NhanvienService } from 'src/app/services/nhanvien.service';
import { PhieuKiemKeService } from 'src/app/services/phieu-kiem-ke.service';

@Component({
  selector: 'app-add-phieu-kiem-ke',
  templateUrl: './add-phieu-kiem-ke.component.html',
  styleUrls: ['./add-phieu-kiem-ke.component.css']
})
export class AddPhieuKiemKeComponent implements OnInit {
  createForm: FormGroup;
  alerMsg: {[index: string]:any} = {
    "showMsg": false,
    "typeMsg": 'info',
    "contentMsg": ''
  }
  listNhanVien: {[index: string]:any}[] = [];
  constructor(
    private fb: FormBuilder,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private phieuKiemKeService: PhieuKiemKeService,
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

  async addPhieuKiemKe() {
    const phieuKiemKe = Object.assign({}, bodyPhieuKiemKe);

    // Get data from form.
    phieuKiemKe.maNhanVien = this.createForm.get("maNhanVien")!.value;
    phieuKiemKe.ngayLap = this.createForm.get("ngayLap")!.value;
    phieuKiemKe.ghiChu = this.createForm.get("ghiChu")!.value;
    console.log(phieuKiemKe)
    if (this.createForm.valid) {
      const postPhieuKiemKe = this.phieuKiemKeService.addPhieuKiemKe(phieuKiemKe).toPromise().then((data) => {
        this.router.navigateByUrl(
          '/phieu/kiem-ke',
          {state: {typeMsg: 'success', contentMsg: "Success"}})
      },
      (error) => {
        this.alerMsg['showMsg'] = true;
        this.alerMsg['typeMsg'] = 'danger';
        this.alerMsg['contentMsg'] = 'Failed create!';
      });
      await Promise.all([postPhieuKiemKe]);
    }
  }
}
