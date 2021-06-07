import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { bodyPhieuCungCap } from 'src/app/models/phieu-cung-cap';
import { NhanvienService } from 'src/app/services/nhanvien.service';
import { PhieuCungCapService } from 'src/app/services/phieu-cung-cap.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-edit-phieu-cung-cap',
  templateUrl: './edit-phieu-cung-cap.component.html',
  styleUrls: ['./edit-phieu-cung-cap.component.css']
})
export class EditPhieuCungCapComponent implements OnInit {
  editForm: FormGroup;
  alerMsg: {[index: string]:any} = {
    "showMsg": false,
    "typeMsg": 'info',
    "contentMsg": ''
  }
  phieuCungCap = Object.assign({}, bodyPhieuCungCap);
  listNhanVien: {[index: string]:any}[] = []
  constructor(
    private fb: FormBuilder,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private phieuCungCapService: PhieuCungCapService,
    private titleService: Title,
    private nhanVienService: NhanvienService
  ) { 
    this.titleService.setTitle('Sửa phiếu cung cấp');
    this.editForm = this.fb.group(
      {
        soPhieuCugCap:  [{ value: '', disabled: true }, [Validators.required]],
        maNhanVien: [{ value: '', disabled: true }, [Validators.required]],
        ngayLap: [{ value: '', disabled: false }, [Validators.required]],
        trangThai: [{ value: '', disabled: true }, [Validators.required]],
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
      this.phieuCungCap.soPhieuCugCap = param['id'];
    });
    await Promise.all([this.getPhieuCungCap(this.phieuCungCap.soPhieuCugCap)]);
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

  async getPhieuCungCap(id: string) {
    const getPhieuCungCap = this.phieuCungCapService.getByIdPhieuCungCap(id).toPromise().then((pyc: {[index: string]:any}) => {
      // set data for model 
      this.phieuCungCap.soPhieuCugCap = pyc['soPhieuCugCap'];
      this.phieuCungCap.maNhanVien = pyc['maNhanVien'];
      this.phieuCungCap.ngayLap = pyc['ngayLap'];
      this.phieuCungCap.trangThai = pyc['trangThai'];
      this.phieuCungCap.ghiChu = pyc['ghiChu'];


      this.editForm.get('soPhieuCugCap')?.setValue(this.phieuCungCap.soPhieuCugCap);
      this.editForm.get('maNhanVien')?.setValue(this.phieuCungCap.maNhanVien);
      this.editForm.get('ngayLap')?.setValue(this.phieuCungCap.ngayLap); 
      this.editForm.get('trangThai')?.setValue(String(this.phieuCungCap.trangThai));
      this.editForm.get('ghiChu')?.setValue(this.phieuCungCap.ghiChu);
    }, ()=> {
      this.alerMsg['showMsg'] = true;
      this.alerMsg['typeMsg'] = 'danger';
      this.alerMsg['contentMsg'] = 'Get phieu yeu cau error!';
    });
    await Promise.all([getPhieuCungCap]);
  }

  async editPhieuCungCap() {
    // Get data from form.
    this.phieuCungCap.soPhieuYeuCau = this.editForm.get("soPhieuCugCap")!.value;
    this.phieuCungCap.maNhanVien = this.editForm.get("maNhanVien")!.value;
    this.phieuCungCap.ngayLap = this.editForm.get("ngayLap")!.value;
    this.phieuCungCap.trangThai = Boolean(this.editForm.get("trangThai")!.value);
    this.phieuCungCap.ghiChu = this.editForm.get("ghiChu")!.value;

    if (this.editForm.valid) {
      const putPhieuCungCap = this.phieuCungCapService.updatePhieuCungCap(this.phieuCungCap.soPhieuCugCap, this.phieuCungCap).toPromise().then((data) => {
        this.router.navigateByUrl(
          '/phieu-cung-cap',
          {state: {typeMsg: 'success', contentMsg: "Edit success !"}})
      },
      (error) => {
        this.alerMsg['showMsg'] = true;
        this.alerMsg['typeMsg'] = 'danger';
        this.alerMsg['contentMsg'] = 'Failed update!';
      });
      await Promise.all([putPhieuCungCap]);
    }
  }

}
