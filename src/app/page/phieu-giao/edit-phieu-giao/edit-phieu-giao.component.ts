import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { bodyPhieuGiao } from 'src/app/models/phieu-giao';
import { NhanvienService } from 'src/app/services/nhanvien.service';
import { PhieuCungCapService } from 'src/app/services/phieu-cung-cap.service';
import { PhieuGiaoService } from 'src/app/services/phieu-giao.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-edit-phieu-giao',
  templateUrl: './edit-phieu-giao.component.html',
  styleUrls: ['./edit-phieu-giao.component.css']
})
export class EditPhieuGiaoComponent implements OnInit {
  editForm: FormGroup;
  alerMsg: {[index: string]:any} = {
    "showMsg": false,
    "typeMsg": 'info',
    "contentMsg": ''
  }
  phieuGiao = Object.assign({}, bodyPhieuGiao);
  listNhanVien: {[index: string]:any}[] = []
  listPhieuCungCap:  {[index: string]:any}[] = [];
  constructor(
    private fb: FormBuilder,
    private activeRoute: ActivatedRoute,
    private titleService: Title,
    private router: Router,
    private phieuCungCapService: PhieuCungCapService,
    private nhanVienService: NhanvienService,
    private phieuGiaoService: PhieuGiaoService
  ) { 
    this.titleService.setTitle('Sửa phiếu giao');
    this.editForm = this.fb.group(
      {
        soPhieuGiao:  [{ value: '', disabled: true }, [Validators.required]],
        maNhanVien: [{ value: '', disabled: true }, [Validators.required]],
        ngayLap: [{ value: '', disabled: false }, [Validators.required]],
        soPhieuCugCap: [{ value: '', disabled: false }, [Validators.required]],
        ghiChu: [{ value: '', disabled: false }],
      }
    );
    this.getListNhanVien();
    this.getListPhieuCungCap();
  }

  async ngOnInit(): Promise<void> {
    console.log('init')
    await Promise.all([this.getData()]);
    console.log('xong init')
  }

  async getData() {
    // get param on url
    this.activeRoute.params.subscribe((param)=> {
      this.phieuGiao.soPhieuGiao = param['id'];
    });
    await Promise.all([this.getPhieuGiao(this.phieuGiao.soPhieuGiao)]);
  }

  async getListPhieuCungCap() {
    const dataGet: any[] = [];
    const getPhieuCungCap = this.phieuCungCapService.getListPhieuCungCap().toPromise().then(
      async (dataResponse) => {
        dataResponse.map((phieucungcap) => {
          dataGet.push(phieucungcap)
        })
      },
      (error)=>{
        // do notthing
      }
    );
    await Promise.all([getPhieuCungCap]);
    this.listPhieuCungCap = dataGet;
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

  async getPhieuGiao(id: string) {
    const getPhieuGiao = this.phieuGiaoService.getByIdPhieuGiao(id).toPromise().then((pg: {[index: string]:any}) => {
      // set data for model 
      this.phieuGiao.soPhieuGiao = pg['soPhieuGiao'];
      this.phieuGiao.maNhanVien = pg['maNhanVien'];
      this.phieuGiao.ngayLap = pg['ngayLap'];
      this.phieuGiao.soPhieuCugCap = pg['soPhieuCugCap'];
      this.phieuGiao.ghiChu = pg['ghiChu'];


      this.editForm.get('soPhieuGiao')?.setValue(this.phieuGiao.soPhieuGiao);
      this.editForm.get('maNhanVien')?.setValue(this.phieuGiao.maNhanVien);
      this.editForm.get('ngayLap')?.setValue(this.phieuGiao.ngayLap); 
      this.editForm.get('soPhieuCugCap')?.setValue(this.phieuGiao.soPhieuCugCap);
      this.editForm.get('ghiChu')?.setValue(this.phieuGiao.ghiChu);
    }, ()=> {
      this.alerMsg['showMsg'] = true;
      this.alerMsg['typeMsg'] = 'danger';
      this.alerMsg['contentMsg'] = 'Get phieu giao error!';
    });
    await Promise.all([getPhieuGiao]);
  }

  async editPhieuGiao() {
    // Get data from form.
    this.phieuGiao.soPhieuGiao = this.editForm.get("soPhieuGiao")!.value;
    this.phieuGiao.maNhanVien = this.editForm.get("maNhanVien")!.value;
    this.phieuGiao.ngayLap = this.editForm.get("ngayLap")!.value;
    this.phieuGiao.soPhieuCugCap = this.editForm.get("soPhieuCugCap")!.value;
    this.phieuGiao.ghiChu = this.editForm.get("ghiChu")!.value;

    if (this.editForm.valid) {
      const putPhieuGiao = this.phieuGiaoService.updatePhieuGiao(this.phieuGiao.soPhieuGiao, this.phieuGiao).toPromise().then((data) => {
        this.router.navigateByUrl(
          '/phieu-giao',
          {state: {typeMsg: 'success', contentMsg: "Edit success !"}})
      },
      (error) => {
        this.alerMsg['showMsg'] = true;
        this.alerMsg['typeMsg'] = 'danger';
        this.alerMsg['contentMsg'] = 'Failed update!';
      });
      await Promise.all([putPhieuGiao]);
    }
  }


}
