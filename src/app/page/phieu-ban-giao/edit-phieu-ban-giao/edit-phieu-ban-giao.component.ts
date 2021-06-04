import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { bodyPhieuBanGiao } from 'src/app/models/phieu-ban-giao';
import { NhanvienService } from 'src/app/services/nhanvien.service';
import { PhieuBanGiaoService } from 'src/app/services/phieu-ban-giao.service';
import { PhieuYeuCauService } from 'src/app/services/phieu-yeu-cau.service';

@Component({
  selector: 'app-edit-phieu-ban-giao',
  templateUrl: './edit-phieu-ban-giao.component.html',
  styleUrls: ['./edit-phieu-ban-giao.component.css']
})
export class EditPhieuBanGiaoComponent implements OnInit {
  editForm: FormGroup;
  alerMsg: {[index: string]:any} = {
    "showMsg": false,
    "typeMsg": 'info',
    "contentMsg": ''
  }
  phieuBanGiao = Object.assign({}, bodyPhieuBanGiao);
  listNhanVien: {[index: string]:any}[] = []
  listPhieuYeuCau:  {[index: string]:any}[] = [];
  constructor(
    private fb: FormBuilder,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private phieuYeuCauService: PhieuYeuCauService,
    private nhanVienService: NhanvienService,
    private phieuBanGiaoService: PhieuBanGiaoService
  ) { 
    this.editForm = this.fb.group(
      {
        soPhieuBanGiao:  [{ value: '', disabled: true }, [Validators.required]],
        maNhanVien: [{ value: '', disabled: true }, [Validators.required]],
        ngayLap: [{ value: '', disabled: false }, [Validators.required]],
        soPhieuYeuCau: [{ value: '', disabled: false }, [Validators.required]],
        ghiChu: [{ value: '', disabled: false }],
      }
    );
    this.getListNhanVien();
    this.getListPhieuYeuCau();
  }

  async ngOnInit(): Promise<void> {
    console.log('init')
    await Promise.all([this.getData()]);
    console.log('xong init')
  }

  async getData() {
    // get param on url
    this.activeRoute.params.subscribe((param)=> {
      this.phieuBanGiao.soPhieuBanGiao = param['id'];
    });
    await Promise.all([this.getPhieuBanGiao(this.phieuBanGiao.soPhieuBanGiao)]);
  }

  async getListPhieuYeuCau() {
    const dataGet: any[] = [];
    const getPhieuYeuCau = this.phieuYeuCauService.getListPhieuYeuCau().toPromise().then(
      async (dataResponse) => {
        dataResponse.map((nhanvien) => {
          dataGet.push(nhanvien)
        })
      },
      (error)=>{
        // do notthing
      }
    );
    await Promise.all([getPhieuYeuCau]);
    this.listPhieuYeuCau = dataGet;
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

  async getPhieuBanGiao(id: string) {
    const getPhieuBanGiao = this.phieuYeuCauService.getByIdPhieuYeuCau(id).toPromise().then((pyc: {[index: string]:any}) => {
      // set data for model 
      this.phieuBanGiao.soPhieuYeuCau = pyc['soPhieuBanGiao'];
      this.phieuBanGiao.maNhanVien = pyc['maNhanVien'];
      this.phieuBanGiao.ngayLap = pyc['ngayLap'];
      this.phieuBanGiao.soPhieuYeuCau = pyc['soPhieuYeuCau'];
      this.phieuBanGiao.ghiChu = pyc['ghiChu'];


      this.editForm.get('soPhieuBanGiao')?.setValue(this.phieuBanGiao.soPhieuBanGiao);
      this.editForm.get('maNhanVien')?.setValue(this.phieuBanGiao.maNhanVien);
      this.editForm.get('ngayLap')?.setValue(this.phieuBanGiao.ngayLap); 
      this.editForm.get('soPhieuYeuCau')?.setValue(this.phieuBanGiao.soPhieuYeuCau);
      this.editForm.get('ghiChu')?.setValue(this.phieuBanGiao.ghiChu);
    }, ()=> {
      this.alerMsg['showMsg'] = true;
      this.alerMsg['typeMsg'] = 'danger';
      this.alerMsg['contentMsg'] = 'Get phieu yeu cau error!';
    });
    await Promise.all([getPhieuBanGiao]);
  }

  async editPhieuBanGiao() {
    // Get data from form.
    this.phieuBanGiao.soPhieuBanGiao = this.editForm.get("soPhieuBanGiao")!.value;
    this.phieuBanGiao.maNhanVien = this.editForm.get("maNhanVien")!.value;
    this.phieuBanGiao.ngayLap = this.editForm.get("ngayLap")!.value;
    this.phieuBanGiao.soPhieuYeuCau = this.editForm.get("soPhieuYeuCau")!.value;
    this.phieuBanGiao.ghiChu = this.editForm.get("ghiChu")!.value;

    if (this.editForm.valid) {
      const putPhieuBanGiao = this.phieuBanGiaoService.updatePhieuBanGiao(this.phieuBanGiao.soPhieuBanGiao, this.phieuBanGiao).toPromise().then((data) => {
        this.router.navigateByUrl(
          '/phieu-ban-giao',
          {state: {typeMsg: 'success', contentMsg: "Edit success !"}})
      },
      (error) => {
        this.alerMsg['showMsg'] = true;
        this.alerMsg['typeMsg'] = 'danger';
        this.alerMsg['contentMsg'] = 'Failed update!';
      });
      await Promise.all([putPhieuBanGiao]);
    }
  }


}
