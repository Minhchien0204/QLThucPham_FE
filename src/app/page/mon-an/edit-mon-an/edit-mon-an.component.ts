import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import {bodyMonAn} from '../../../models/mon-an';
import {MonAnService} from '../../../services/mon-an-service.service';
import {NhanvienService} from '../../../services/nhanvien.service';

@Component({
  selector: 'app-edit-mon-an',
  templateUrl: './edit-mon-an.component.html',
  styleUrls: ['./edit-mon-an.component.css']
})
export class EditMonAnComponent implements OnInit {
  editForm: FormGroup;
  alerMsg: {[index: string]:any} = {
    "showMsg": false,
    "typeMsg": 'info',
    "contentMsg": ''
  }
  monAnObject = Object.assign({}, bodyMonAn);
  listNhanVien: {[index: string]:any}[] = [];
  constructor(private fb: FormBuilder,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private monAnService: MonAnService,
    private nhanVienService: NhanvienService) {
      this.editForm=this.fb.group(
        {
          tenMonAn: [{ value: '', disabled: false }, [Validators.required]],
          maNhanVien: [{ value: '', disabled: true }, [Validators.required]],
          buaAn: [{ value: '', disabled: false }, [Validators.required]],
        }
      );
     }

  ngOnInit(): void {
    this.getListNhanVien()
    this.getData()
  }

  getData() {
    // get param on url
    this.activeRoute.params.subscribe((param)=> {
      this.monAnObject.maMonAn = param['id'];
    });
    this.getMonAn(this.monAnObject.maMonAn);
  }

  async getMonAn(id: string) {
    const getMA = this.monAnService.getMonAnDetail(id).toPromise().then((monAn: {[index: string]:any}) => {
      // set data for model nhan vien
      this.monAnObject.maMonAn = monAn['maMonAn'];
      this.monAnObject.tenMonAn = monAn['tenMonAn'];
      this.monAnObject.maNhanVien = monAn['maNhanVien'];
      this.monAnObject.buaAn = monAn['buaAn']
      this.editForm.get('buaAn')?.setValue(this.monAnObject.buaAn);
      this.editForm.get('tenMonAn')?.setValue(this.monAnObject.tenMonAn);
      this.listNhanVien.map(
        (nv) => {
          if (nv['maNhanVien'] == this.monAnObject.maNhanVien) {
            this.editForm.get('maNhanVien')?.setValue(nv['name']);
          }
        }
      );
      this.editForm.get('buaAn')?.setValue(this.monAnObject.buaAn);
    }, ()=> {
      this.alerMsg['showMsg'] = true;
      this.alerMsg['typeMsg'] = 'danger';
      this.alerMsg['contentMsg'] = 'Get món ăn error!';
    });
    await Promise.all([getMA]);
  }

  async editMonAn() {
    // Get data from form.
    this.monAnObject.tenMonAn = this.editForm.get("tenMonAn")!.value;
    this.monAnObject.buaAn = this.editForm.get("buaAn")!.value;
    // if (buaAn == 'sang') {
    //   this.monAnObject.buaAn = 'Bữa sáng'
    // } else if (buaAn == 'trua') {
    //   this.monAnObject.buaAn = 'Bữa trưa'
    // }
    // else {
    //   this.monAnObject.buaAn = 'Bữa chiều'
    // }
    if (this.editForm.valid) {
      const putMA = this.monAnService.putMonAn(this.monAnObject.maMonAn, this.monAnObject).toPromise().then((data) => {
        this.router.navigateByUrl(
          '/mon-an',
          {state: {typeMsg: 'success', contentMsg: "Edit success !"}})
      },
      () => {
        this.alerMsg['showMsg'] = true;
        this.alerMsg['typeMsg'] = 'danger';
        this.alerMsg['contentMsg'] = 'Failed update!';
      });
      await Promise.all([putMA]);
    }
  }
  async getListNhanVien() {
    const getNhanVien = this.nhanVienService.getListNhanVien().toPromise().then(
      async (dataResponse) => {
        this.listNhanVien = [];
        dataResponse.map(
          (data: {[index: string]:any}) => {
            this.listNhanVien.push(data);
          }
        );
      },
      (error)=>{
        // do notthing
      }
    );
    await Promise.all([getNhanVien]);
  }
}
