import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { bodyPhieuAn } from 'src/app/models/phieu-an';
import { GiaoVienService } from 'src/app/services/giao-vien.service';
import { PhieuAnService } from 'src/app/services/phieu-an.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-edit-phieu-an',
  templateUrl: './edit-phieu-an.component.html',
  styleUrls: ['./edit-phieu-an.component.css']
})
export class EditPhieuAnComponent implements OnInit {
  editForm: FormGroup;
  alerMsg: {[index: string]:any} = {
    "showMsg": false,
    "typeMsg": 'info',
    "contentMsg": ''
  }
  phieuAn = Object.assign({}, bodyPhieuAn);
  listGiaoVien: {[index: string]:any}[] = []
  constructor(
    private fb: FormBuilder,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private phieuAnService: PhieuAnService,
    private titleService: Title,
    private giaoVienService: GiaoVienService
  ) { 
    this.titleService.setTitle('Sửa phiếu ăn');
    this.editForm = this.fb.group(
      {
        sophieuAn:  [{ value: '', disabled: true }, [Validators.required]],
        maGV: [{ value: '', disabled: true }, [Validators.required]],
        ngayLap: [{ value: '', disabled: false }, [Validators.required]],
        soLuong: [{ value: '', disabled: false }, [Validators.required]],
        trangThai: [{ value: '', disabled: false }, [Validators.required]],
        ghiChu: [{ value: '', disabled: false }],
      }
    );
    this.getListGiaoVien();
   }

   async ngOnInit(): Promise<void> {
    console.log('init')
    await Promise.all([this.getData()]);
    console.log('xong init')
  }


  async getData() {
    // get param on url
    this.activeRoute.params.subscribe((param)=> {
      this.phieuAn.sophieuAn = param['id'];
    });
    await Promise.all([this.getPhieuAn(this.phieuAn.sophieuAn)]);
  }

  async getListGiaoVien() {
    const dataGet: any[] = [];
    const getGiaoVien = this.giaoVienService.getListGiaoVien().toPromise().then(
      async (dataResponse) => {
        dataResponse.map((giaovien) => {
          dataGet.push(giaovien)
        })
      },
      (error)=>{
        // do notthing
      }
    );
    await Promise.all([getGiaoVien]);
    this.listGiaoVien = dataGet;
  }


  async getPhieuAn(id: string) {
    const getPhieuAn = this.phieuAnService.getByIdPhieuAn(id).toPromise().then((pa: {[index: string]:any}) => {
      // set data for model 
      this.phieuAn.sophieuAn = pa['sophieuAn'];
      this.phieuAn.maGV = pa['maGV'];
      this.phieuAn.ngayLap = pa['ngayLap'];
      this.phieuAn.soLuong = pa['soLuong'];
      this.phieuAn.trangThai = pa['trangThai'];
      this.phieuAn.ghiChu = pa['ghiChu'];


      this.editForm.get('sophieuAn')?.setValue(this.phieuAn.sophieuAn);
      this.editForm.get('maGV')?.setValue(this.phieuAn.maGV);
      this.editForm.get('ngayLap')?.setValue(this.phieuAn.ngayLap); 
      this.editForm.get('soLuong')?.setValue(this.phieuAn.soLuong); 
      this.editForm.get('trangThai')?.setValue(String(this.phieuAn.trangThai));
      this.editForm.get('ghiChu')?.setValue(this.phieuAn.ghiChu);
    }, ()=> {
      this.alerMsg['showMsg'] = true;
      this.alerMsg['typeMsg'] = 'danger';
      this.alerMsg['contentMsg'] = 'Get học sinh error!';
    });
    await Promise.all([getPhieuAn]);
  }

  async editPhieuAn() {
    // Get data from form.
    this.phieuAn.sophieuAn = this.editForm.get("sophieuAn")!.value;
    this.phieuAn.maGV = this.editForm.get("maGV")!.value;
    this.phieuAn.ngayLap = this.editForm.get("ngayLap")!.value;
    this.phieuAn.soLuong = this.editForm.get("soLuong")!.value;
    this.phieuAn.trangThai = Boolean(this.editForm.get("trangThai")!.value);
    this.phieuAn.ghiChu = this.editForm.get("ghiChu")!.value;

    if (this.editForm.valid) {
      const putPhieuAn = this.phieuAnService.updatePhieuAn(this.phieuAn.sophieuAn, this.phieuAn).toPromise().then((data) => {
        this.router.navigateByUrl(
          '/phieu-bao-an',
          {state: {typeMsg: 'success', contentMsg: "Edit success !"}})
      },
      (error) => {
        this.alerMsg['showMsg'] = true;
        this.alerMsg['typeMsg'] = 'danger';
        this.alerMsg['contentMsg'] = 'Failed update!';
      });
      await Promise.all([putPhieuAn]);
    }
  }


}
