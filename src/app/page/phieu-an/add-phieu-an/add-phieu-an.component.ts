import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { bodyPhieuAn } from 'src/app/models/phieu-an';
import { GiaoVienService } from 'src/app/services/giao-vien.service';
import { PhieuAnService } from 'src/app/services/phieu-an.service';

@Component({
  selector: 'app-add-phieu-an',
  templateUrl: './add-phieu-an.component.html',
  styleUrls: ['./add-phieu-an.component.css']
})
export class AddPhieuAnComponent implements OnInit {
  createForm: FormGroup;
  alerMsg: {[index: string]:any} = {
    "showMsg": false,
    "typeMsg": 'info',
    "contentMsg": ''
  }
  listGiaoVien: {[index: string]:any}[] = []
  constructor(
    private fb: FormBuilder,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private phieuAnService: PhieuAnService,
    private giaoVienService: GiaoVienService
  ) { 
    this.createForm = this.fb.group(
      {
        maGV: [{ value: '', disabled: false }],
        ngayLap: [{ value: '', disabled: false }, [Validators.required]],
        soLuong: [{ value: '', disabled: false }, [Validators.required]],
        trangThai: [{ value: '', disabled: false }, [Validators.required]],
        ghiChu: [{ value: '', disabled: false }],
      }
    );
  }

  ngOnInit(): void {
    this.getListGiaoVien();
  }

  async getListGiaoVien() {
    const dataGet: any[] = [];
    const getLop = this.giaoVienService.getListGiaoVien().toPromise().then(
      async (dataResponse) => {
        dataResponse.map((giaovien) => {
          dataGet.push(giaovien)
        })
      },
      (error)=>{
        // do notthing
      }
    );
    await Promise.all([getLop]);
    this.listGiaoVien = dataGet;
  }

  async addPhieuAn() {
    const phieuAn = Object.assign({}, bodyPhieuAn);

    // Get data from form.
    phieuAn.maGV = this.createForm.get("maGV")!.value;
    phieuAn.ngayLap = this.createForm.get("ngayLap")!.value;
    phieuAn.soLuong = this.createForm.get("soLuong")!.value;
    phieuAn.trangThai = JSON.parse(this.createForm.get("trangThai")!.value);
    phieuAn.ghiChu = this.createForm.get("ghiChu")!.value;
    console.log(phieuAn)
    if (this.createForm.valid) {
      const postPhieuAn = this.phieuAnService.addPhieuAn(phieuAn).toPromise().then((data) => {
        this.router.navigateByUrl(
          '/phieu-bao-an',
          {state: {typeMsg: 'success', contentMsg: "Success"}})
      },
      (error) => {
        this.alerMsg['showMsg'] = true;
        this.alerMsg['typeMsg'] = 'danger';
        this.alerMsg['contentMsg'] = 'Failed update!';
      });
      await Promise.all([postPhieuAn]);
    }
  }

}
