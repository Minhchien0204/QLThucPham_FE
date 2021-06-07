import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { bodyPhieuYeuCau } from 'src/app/models/phieu-yeu-cau';
import { NhanvienService } from 'src/app/services/nhanvien.service';
import { PhieuYeuCauService } from 'src/app/services/phieu-yeu-cau.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-edit-phieu-yeu-cau',
  templateUrl: './edit-phieu-yeu-cau.component.html',
  styleUrls: ['./edit-phieu-yeu-cau.component.css']
})
export class EditPhieuYeuCauComponent implements OnInit {
  editForm: FormGroup;
  alerMsg: {[index: string]:any} = {
    "showMsg": false,
    "typeMsg": 'info',
    "contentMsg": ''
  }
  phieuYeuCau = Object.assign({}, bodyPhieuYeuCau);
  listNhanVien: {[index: string]:any}[] = []
  constructor(
    private fb: FormBuilder,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private phieuYeuCauService: PhieuYeuCauService,
    private titleService: Title,
    private nhanVienService: NhanvienService
  ) { 
    this.titleService.setTitle('Sửa phiếu yêu cầu');
    this.editForm = this.fb.group(
      {
        soPhieuYeuCau:  [{ value: '', disabled: true }, [Validators.required]],
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
      this.phieuYeuCau.sophieuAn = param['id'];
    });
    await Promise.all([this.getPhieuYeuCau(this.phieuYeuCau.sophieuAn)]);
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

  async getPhieuYeuCau(id: string) {
    const getPhieuYeuCau = this.phieuYeuCauService.getByIdPhieuYeuCau(id).toPromise().then((pyc: {[index: string]:any}) => {
      // set data for model 
      this.phieuYeuCau.soPhieuYeuCau = pyc['soPhieuYeuCau'];
      this.phieuYeuCau.maNhanVien = pyc['maNhanVien'];
      this.phieuYeuCau.ngayLap = pyc['ngayLap'];
      this.phieuYeuCau.trangThai = pyc['trangThai'];
      this.phieuYeuCau.ghiChu = pyc['ghiChu'];


      this.editForm.get('soPhieuYeuCau')?.setValue(this.phieuYeuCau.soPhieuYeuCau);
      this.editForm.get('maNhanVien')?.setValue(this.phieuYeuCau.maNhanVien);
      this.editForm.get('ngayLap')?.setValue(this.phieuYeuCau.ngayLap); 
      this.editForm.get('trangThai')?.setValue(String(this.phieuYeuCau.trangThai));
      this.editForm.get('ghiChu')?.setValue(this.phieuYeuCau.ghiChu);
    }, ()=> {
      this.alerMsg['showMsg'] = true;
      this.alerMsg['typeMsg'] = 'danger';
      this.alerMsg['contentMsg'] = 'Get phieu yeu cau error!';
    });
    await Promise.all([getPhieuYeuCau]);
  }

  async editPhieuYeuCau() {
    // Get data from form.
    this.phieuYeuCau.soPhieuYeuCau = this.editForm.get("soPhieuYeuCau")!.value;
    this.phieuYeuCau.maNhanVien = this.editForm.get("maNhanVien")!.value;
    this.phieuYeuCau.ngayLap = this.editForm.get("ngayLap")!.value;
    this.phieuYeuCau.trangThai = Boolean(this.editForm.get("trangThai")!.value);
    this.phieuYeuCau.ghiChu = this.editForm.get("ghiChu")!.value;

    if (this.editForm.valid) {
      const putPhieuYeuCau = this.phieuYeuCauService.updatePhieuYeuCau(this.phieuYeuCau.soPhieuYeuCau, this.phieuYeuCau).toPromise().then((data) => {
        this.router.navigateByUrl(
          '/phieu-yeu-cau-thuc-pham',
          {state: {typeMsg: 'success', contentMsg: "Edit success !"}})
      },
      (error) => {
        this.alerMsg['showMsg'] = true;
        this.alerMsg['typeMsg'] = 'danger';
        this.alerMsg['contentMsg'] = 'Failed update!';
      });
      await Promise.all([putPhieuYeuCau]);
    }
  }
}
