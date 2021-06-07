import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { bodyMonAn } from 'src/app/models/mon-an';
import { MonAnService } from 'src/app/services/mon-an-service.service';
import { NhanvienService } from 'src/app/services/nhanvien.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-add-mon-an1',
  templateUrl: './add-mon-an1.component.html',
  styleUrls: ['./add-mon-an1.component.css']
})
export class AddMonAn1Component implements OnInit {
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
    private nhanVienService: NhanvienService,
    private titleService: Title,
    private monAnService: MonAnService
  ) { 
    this.titleService.setTitle('Thêm món ăn');
    this.createForm = this.fb.group(
      {
        tenMonAn: [{ value: '', disabled: false }, [Validators.required]],
        maNhanVien: [{ value: '', disabled: false }],
        buaAn: [{ value: '', disabled: false },[Validators.required]],
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

  async addMonAn() {
    const monAn = Object.assign({}, bodyMonAn);

    // Get data from form.
    monAn.tenMonAn = this.createForm.get("tenMonAn")!.value;
    monAn.maNhanVien = this.createForm.get("maNhanVien")!.value;
    monAn.buaAn = this.createForm.get("buaAn")!.value;
    console.log(monAn)
    if (this.createForm.valid) {
      const postMonAn = this.monAnService.addMonAn(monAn).toPromise().then((data) => {
        this.router.navigateByUrl(
          '/mon-an',
          {state: {typeMsg: 'success', contentMsg: "Success"}})
      },
      (error) => {
        this.alerMsg['showMsg'] = true;
        this.alerMsg['typeMsg'] = 'danger';
        this.alerMsg['contentMsg'] = 'Failed create!';
      });
      await Promise.all([postMonAn]);
    }
  }

}
