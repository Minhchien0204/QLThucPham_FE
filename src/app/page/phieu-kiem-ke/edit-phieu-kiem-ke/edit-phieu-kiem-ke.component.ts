import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { bodyPhieuKiemKe } from 'src/app/models/phieu-kiem-ke';
import { NhanvienService } from 'src/app/services/nhanvien.service';
import { PhieuKiemKeService } from 'src/app/services/phieu-kiem-ke.service';

@Component({
  selector: 'app-edit-phieu-kiem-ke',
  templateUrl: './edit-phieu-kiem-ke.component.html',
  styleUrls: ['./edit-phieu-kiem-ke.component.css']
})
export class EditPhieuKiemKeComponent implements OnInit {
  editForm: FormGroup;
  alerMsg: {[index: string]:any} = {
    "showMsg": false,
    "typeMsg": 'info',
    "contentMsg": ''
  }
  phieuKiemKe = Object.assign({}, bodyPhieuKiemKe);
  listNhanVien: {[index: string]:any}[] = []
  constructor(
    private fb: FormBuilder,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private nhanVienService: NhanvienService,
    private phieuKiemKeService: PhieuKiemKeService
  ) { 
    this.editForm = this.fb.group(
      {
        soPhieuKiemKe:  [{ value: '', disabled: true }, [Validators.required]],
        maNhanVien: [{ value: '', disabled: true }, [Validators.required]],
        ngayLap: [{ value: '', disabled: false }, [Validators.required]],
        ghiChu: [{ value: '', disabled: false }],
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
      this.phieuKiemKe.soPhieuKiemKe = param['id'];
    });
    await Promise.all([this.getPhieuKiemKe(this.phieuKiemKe.soPhieuKiemKe)]);
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


  async getPhieuKiemKe(id: string) {
    const getPhieuKiemKe = this.phieuKiemKeService.getByIdPhieuKiemKe(id).toPromise().then((pkk: {[index: string]:any}) => {
      // set data for model 
      this.phieuKiemKe.soPhieuYeuCau = pkk['soPhieuKiemKe'];
      this.phieuKiemKe.maNhanVien = pkk['maNhanVien'];
      this.phieuKiemKe.ngayLap = pkk['ngayLap'];
      this.phieuKiemKe.ghiChu = pkk['ghiChu'];


      this.editForm.get('soPhieuKiemKe')?.setValue(this.phieuKiemKe.soPhieuKiemKe);
      this.editForm.get('maNhanVien')?.setValue(this.phieuKiemKe.maNhanVien);
      this.editForm.get('ngayLap')?.setValue(this.phieuKiemKe.ngayLap); 
      this.editForm.get('ghiChu')?.setValue(this.phieuKiemKe.ghiChu);
    }, ()=> {
      this.alerMsg['showMsg'] = true;
      this.alerMsg['typeMsg'] = 'danger';
      this.alerMsg['contentMsg'] = 'Get phieu yeu cau error!';
    });
    await Promise.all([getPhieuKiemKe]);
    
  }


  async editPhieuKiemKe() {
    // Get data from form.
    this.phieuKiemKe.phieuKiemKe = this.editForm.get("soPhieuKiemKe")!.value;
    this.phieuKiemKe.maNhanVien = this.editForm.get("maNhanVien")!.value;
    this.phieuKiemKe.ngayLap = this.editForm.get("ngayLap")!.value;
    this.phieuKiemKe.ghiChu = this.editForm.get("ghiChu")!.value;

    if (this.editForm.valid) {
      const putPhieuKiemKe = this.phieuKiemKeService.updatePhieuKiemKe(this.phieuKiemKe.soPhieuKiemKe, this.phieuKiemKe).toPromise().then((data) => {
        this.router.navigateByUrl(
          '/phieu/kiem-ke',
          {state: {typeMsg: 'success', contentMsg: "Edit success !"}})
      },
      (error) => {
        this.alerMsg['showMsg'] = true;
        this.alerMsg['typeMsg'] = 'danger';
        this.alerMsg['contentMsg'] = 'Failed update!';
      });
      await Promise.all([putPhieuKiemKe]);
    }
  }
}
