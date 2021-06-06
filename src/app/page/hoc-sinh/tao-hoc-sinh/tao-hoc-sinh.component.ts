import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import {bodyHocSinh} from '../../../models/hoc-sinh';
import {HocSinhService} from '../../../services/hoc-sinh.service';
import {LopService} from '../../../services/lop.service';
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'app-tao-hoc-sinh',
  templateUrl: './tao-hoc-sinh.component.html',
  styleUrls: ['./tao-hoc-sinh.component.css']
})
export class TaoHocSinhComponent implements OnInit {
  createForm: FormGroup;
  alerMsg: {[index: string]:any} = {
    "showMsg": false,
    "typeMsg": 'info',
    "contentMsg": ''
  }
  listLop: {[index: string]:any}[] = []
  constructor(private titleService: Title,private fb: FormBuilder,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private hocSinhService: HocSinhService,
    private lopService: LopService) {
      this.titleService.setTitle('Thêm học sinh');
      this.createForm = this.fb.group(
        {
          hoTen: [{ value: '', disabled: false }, [Validators.required]],
          diaChi: [{ value: '', disabled: false }, [Validators.required]],
          ngaySinh: [{ value: '', disabled: false }, [Validators.required]],
          gioiTinh: [{ value: '', disabled: false }, [Validators.required]],
          dienThoai: [{ value: '', disabled: false }, [Validators.required]],
          maLop: [{ value: '', disabled: false }]
        }
      );
     }

  ngOnInit(): void {
    this.getListLop();
  }

  async getListLop() {
    const dataGet: any[] = [];
    const getLop = this.lopService.getListLop().toPromise().then(
      async (dataResponse) => {
        dataResponse.map((lop) => {
          dataGet.push(lop)
        })
      },
      (error)=>{
        // do notthing
      }
    );
    await Promise.all([getLop]);
    this.listLop = dataGet;
  }

  async addHocSinh() {
    const hocSinh = Object.assign({}, bodyHocSinh);

    // Get data from form.
    hocSinh.hoTen = this.createForm.get("hoTen")!.value;
    hocSinh.diaChi = this.createForm.get("diaChi")!.value;
    hocSinh.ngaySinh = this.createForm.get("ngaySinh")!.value;
    hocSinh.gioiTinh = JSON.parse(this.createForm.get("gioiTinh")!.value);
    hocSinh.dienThoai = this.createForm.get("dienThoai")!.value;
    hocSinh.maLop = this.createForm.get("maLop")!.value;
    console.log(hocSinh)
    if (this.createForm.valid) {
      const postLop = this.hocSinhService.addHocSinh(hocSinh).toPromise().then((data) => {
        this.router.navigateByUrl(
          '/hoc-sinh',
          {state: {typeMsg: 'success', contentMsg: "Success"}})
      },
      (error) => {
        this.alerMsg['showMsg'] = true;
        this.alerMsg['typeMsg'] = 'danger';
        this.alerMsg['contentMsg'] = 'Failed update!';
      });
      await Promise.all([postLop]);
    }
  }

}
