import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import {bodyLop} from '../../../models/lop';
// import {bodyGiaoVien} from '../../../models/giao-vien';
import {LopService} from '../../../services/lop.service';
import {GiaoVienService} from '../../../services/giao-vien.service';

@Component({
  selector: 'app-tao-lop',
  templateUrl: './tao-lop.component.html',
  styleUrls: ['./tao-lop.component.css']
})
export class TaoLopComponent implements OnInit {
  createForm: FormGroup;
  alerMsg: {[index: string]:any} = {
    "showMsg": false,
    "typeMsg": 'info',
    "contentMsg": ''
  }
  // listGiaoVien: {[index: string]:any}[] = [];
  
  constructor(private fb: FormBuilder,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private lopService: LopService,
    private giaoVienService: GiaoVienService) {
      this.createForm = this.fb.group(
        {
          maLop: [{ value: '', disabled: false }, [Validators.required]],
          tenLop: [{ value: '', disabled: false }, [Validators.required]],
          // giaoVien: [{ value: '', disabled: false }, [Validators.required]],
          soLuong: [{ value: '', disabled: false }, [Validators.required]],
        }
      );
     }

  ngOnInit(): void {
    // this.getListGiaoVien();
  }

  async addLop() {
    const lop = Object.assign({}, bodyLop);

    // Get data from form.
    lop.maLop = this.createForm.get("maLop")!.value;
    lop.tenLop = this.createForm.get("tenLop")!.value;
    lop.soLuong = this.createForm.get("soLuong")!.value;

    if (this.createForm.valid) {
      const postLop = this.lopService.addLop(lop).toPromise().then((data) => {
        this.router.navigateByUrl(
          '/lop',
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

  // async getListGiaoVien() {
  //   const dataGet: any[] = [];
  //   // const giaoVien = Object.assign({}, bodyGiaoVien);
  //   const getListGV = this.giaoVienService.getListGiaoVien().toPromise().then(
  //     async (dataResponse) => {
  //       dataResponse.map((giaoVien) => {
  //         dataGet.push(giaoVien)
  //       })
  //     },
  //     (error)=>{
  //       // do notthing
  //     }
  //   );
  //   await Promise.all([getListGV]);
  //   this.listGiaoVien = dataGet;
  // }

}
