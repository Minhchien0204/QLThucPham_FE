import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { bodyMonAn } from 'src/app/models/mon-an';
import { MonAnService } from 'src/app/services/mon-an-service.service';
import { NhanvienService } from 'src/app/services/nhanvien.service';

@Component({
  selector: 'app-edit-mon-an1',
  templateUrl: './edit-mon-an1.component.html',
  styleUrls: ['./edit-mon-an1.component.css']
})
export class EditMonAn1Component implements OnInit {
  editForm: FormGroup;
  alerMsg: {[index: string]:any} = {
    "showMsg": false,
    "typeMsg": 'info',
    "contentMsg": ''
  }
  monAn = Object.assign({}, bodyMonAn);
  listNhanVien: {[index: string]:any}[] = [];
  constructor(
    private fb: FormBuilder,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private nhanVienService: NhanvienService,
    private monAnService: MonAnService
  ) { 
    this.editForm = this.fb.group(
      {
        maMonAn:  [{ value: '', disabled: true }, [Validators.required]],
        tenMonAn: [{ value: '', disabled: false }, [Validators.required]],
        maNhanVien: [{ value: '', disabled: true }, [Validators.required]],
        buaAn: [{ value: '', disabled: false }, [Validators.required]],
      }
    );
    this.getListNhanVien();
  }

  async ngOnInit(): Promise<void> {
    console.log('init')
    await Promise.all([this.getData()]);
    console.log('xong init')
  }

  async getData() {
    // get param on url
    this.activeRoute.params.subscribe((param)=> {
      this.monAn.maMonAn = param['id'];
    });
    await Promise.all([this.getMonAn(this.monAn.maMonAn)]);
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

  async getMonAn(id: string) {
    const getMonAn = this.monAnService.getMonAnDetail(id).toPromise().then((ma: {[index: string]:any}) => {
      // set data for model 
      this.monAn.maMonAn = ma['maMonAn'];
      this.monAn.tenMonAn = ma['tenMonAn'];
      this.monAn.maNhanVien = ma['maNhanVien'];
      this.monAn.buaAn = ma['buaAn'];


      this.editForm.get('maMonAn')?.setValue(this.monAn.maMonAn);
      this.editForm.get('tenMonAn')?.setValue(this.monAn.tenMonAn);
      this.editForm.get('maNhanVien')?.setValue(this.monAn.maNhanVien); 
      this.editForm.get('buaAn')?.setValue(this.monAn.buaAn);
    }, ()=> {
      this.alerMsg['showMsg'] = true;
      this.alerMsg['typeMsg'] = 'danger';
      this.alerMsg['contentMsg'] = 'Get mon an error!';
    });
    await Promise.all([getMonAn]);
  }

  async editMonAn() {
    // Get data from form.
    this.monAn.soPhieuBanGiao = this.editForm.get("maMonAn")!.value;
    this.monAn.maNhanVien = this.editForm.get("tenMonAn")!.value;
    this.monAn.ngayLap = this.editForm.get("maNhanVien")!.value;
    this.monAn.ghiChu = this.editForm.get("buaAn")!.value;

    if (this.editForm.valid) {
      const putMonAn = this.monAnService.putMonAn(this.monAn.maMonAn, this.monAn).toPromise().then((data) => {
        this.router.navigateByUrl(
          '/mon-an',
          {state: {typeMsg: 'success', contentMsg: "Edit success !"}})
      },
      (error) => {
        this.alerMsg['showMsg'] = true;
        this.alerMsg['typeMsg'] = 'danger';
        this.alerMsg['contentMsg'] = 'Failed update!';
      });
      await Promise.all([putMonAn]);
    }
  }

  
}
