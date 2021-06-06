import { Component, OnInit, AfterViewInit} from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import {bodyHocSinh} from '../../../models/hoc-sinh';
import {HocSinhService} from '../../../services/hoc-sinh.service';
import {LopService} from '../../../services/lop.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-edit-hoc-sinh',
  templateUrl: './edit-hoc-sinh.component.html',
  styleUrls: ['./edit-hoc-sinh.component.css']
})
export class EditHocSinhComponent implements OnInit {
  editForm: FormGroup;
  alerMsg: {[index: string]:any} = {
    "showMsg": false,
    "typeMsg": 'info',
    "contentMsg": ''
  }
  hocSinh = Object.assign({}, bodyHocSinh);
  listLop: {[index: string]:any}[] = [];
  constructor(private fb: FormBuilder,
              private titleService: Title,
              private activeRoute: ActivatedRoute,
              private router: Router,
              private hocSinhService: HocSinhService,
              private lopService: LopService) {
    this.titleService.setTitle('Sửa học sinh');
    this.editForm=this.fb.group(
      {
        hoTen: [{ value: '', disabled: false }, [Validators.required]],
        diaChi: [{ value: '', disabled: false }, [Validators.required]],
        ngaySinh: [{ value: '', disabled: false }, [Validators.required]],
        gioiTinh: [{ value: '', disabled: false }, [Validators.required]],
        dienThoai: [{ value: '', disabled: false }, [Validators.required]],
        maLop: [{ value: '', disabled: false }]
      }
    );
    this.getListLop();
  }

  async ngOnInit(): Promise<void> {
    console.log('init')
    await Promise.all([this.getData()]);
    console.log('xong init')
  }

  async getData() {
    // get param on url
    this.activeRoute.params.subscribe((param)=> {
      this.hocSinh.idhs = param['id'];
    });
    await Promise.all([this.getHS(this.hocSinh.idhs)]);
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

  async getHS(id: string) {
    const getHocSinh = this.hocSinhService.getHocSinhDetail(id).toPromise().then((hs: {[index: string]:any}) => {
      // set data for model hoc sinh
      this.hocSinh.idhs = hs['idhs'];
      this.hocSinh.hoTen = hs['hoTen'];
      this.hocSinh.diaChi = hs['diaChi'];
      this.hocSinh.ngaySinh = hs['ngaySinh'];
      this.hocSinh.gioiTinh = hs['gioiTinh'];
      this.hocSinh.dienThoai = hs['dienThoai'];
      this.hocSinh.maLop = hs['maLop'];


      this.editForm.get('hoTen')?.setValue(this.hocSinh.hoTen);
      this.editForm.get('diaChi')?.setValue(this.hocSinh.diaChi);
      this.editForm.get('ngaySinh')?.setValue(this.hocSinh.ngaySinh); 
      this.editForm.get('gioiTinh')?.setValue(String(this.hocSinh.gioiTinh));
      this.editForm.get('dienThoai')?.setValue(this.hocSinh.dienThoai);
      this.editForm.get('maLop')?.setValue(this.hocSinh.maLop);
    }, ()=> {
      this.alerMsg['showMsg'] = true;
      this.alerMsg['typeMsg'] = 'danger';
      this.alerMsg['contentMsg'] = 'Get học sinh error!';
    });
    await Promise.all([getHocSinh]);
  }

  async editHS() {
    // Get data from form.
    this.hocSinh.hoTen = this.editForm.get("hoTen")!.value;
    this.hocSinh.diaChi = this.editForm.get("diaChi")!.value;
    this.hocSinh.ngaySinh = this.editForm.get("ngaySinh")!.value;
    this.hocSinh.gioiTinh = Boolean(this.editForm.get("gioiTinh")!.value);
    this.hocSinh.dienThoai = this.editForm.get("dienThoai")!.value;
    this.hocSinh.maLop = this.editForm.get("maLop")!.value;

    if (this.editForm.valid) {
      const putLop = this.hocSinhService.putHocSinh(this.hocSinh.idhs, this.hocSinh).toPromise().then((data) => {
        this.router.navigateByUrl(
          '/hoc-sinh',
          {state: {typeMsg: 'success', contentMsg: "Edit success !"}})
      },
      (error) => {
        this.alerMsg['showMsg'] = true;
        this.alerMsg['typeMsg'] = 'danger';
        this.alerMsg['contentMsg'] = 'Failed update!';
      });
      await Promise.all([putLop]);
    }
  }

}
