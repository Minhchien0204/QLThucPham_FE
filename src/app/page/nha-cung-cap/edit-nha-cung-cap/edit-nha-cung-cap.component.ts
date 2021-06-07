import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { bodyNhaCungCap } from 'src/app/models/nha-cung-cap';
import { NhaCungCapService } from 'src/app/services/nha-cung-cap.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-edit-nha-cung-cap',
  templateUrl: './edit-nha-cung-cap.component.html',
  styleUrls: ['./edit-nha-cung-cap.component.css']
})
export class EditNhaCungCapComponent implements OnInit {
  editForm: FormGroup;
  alerMsg: {[index: string]:any} = {
    "showMsg": false,
    "typeMsg": 'info',
    "contentMsg": ''
  }
  nhacungcapOject = Object.assign({}, bodyNhaCungCap);
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private titleService: Title,
    private nhaCungCapService: NhaCungCapService,
    private activeRote:ActivatedRoute
  ) { 
    this.titleService.setTitle('Sửa nhà cung cấp');
    this.editForm = this.fb.group({
      maNhaCungCap: [{value: '', disabled: true}, [Validators.required]],
      tenNhaCungCap: [{value: '', disabled: false}, [Validators.required]],
      dienThoai: [{value: '', disabled: false}, [Validators.required]],
      diaChi: [{value: '', disabled: false}, [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.activeRote.params.subscribe((param) => {
      this.nhacungcapOject.maNhaCungCap = param['id'];
    });
    this.getNhaCungCap(this.nhacungcapOject.maNhaCungCap);
  }

  async getNhaCungCap(id: string){
    const getNhaCungCap = this.nhaCungCapService.getByIdNhaCungCap(id).toPromise().then((nhacungcap : {[index: string]: any}) => {
      this.nhacungcapOject.maNhaCungCap = nhacungcap['maNhaCungCap'];
      this.nhacungcapOject.tenNhaCungCap = nhacungcap['tenNhaCungCap'];
      this.nhacungcapOject.dienThoai = nhacungcap['dienThoai'];
      this.nhacungcapOject.diaChi = nhacungcap['diaChi'];

      this.editForm.get('maNhaCungCap')?.setValue(this.nhacungcapOject.maNhaCungCap);
      this.editForm.get('tenNhaCungCap')?.setValue(this.nhacungcapOject.tenNhaCungCap);
      this.editForm.get('dienThoai')?.setValue(this.nhacungcapOject.dienThoai);
      this.editForm.get('diaChi')?.setValue(this.nhacungcapOject.diaChi);
    } ,() => {
      this.alerMsg['showMsg'] = true;
      this.alerMsg['typeMsg'] = 'danger';
      this.alerMsg['contentMsg'] = 'Get NhaCungCap error!';
    }
    );
    await Promise.all([getNhaCungCap]);
  }

  async editNhaCungCap(){
    this.nhacungcapOject.maNhaCungCap = this.editForm.get("maNhaCungCap")!.value;
    this.nhacungcapOject.tenNhaCungCap = this.editForm.get("tenNhaCungCap")!.value;
    this.nhacungcapOject.dienThoai = this.editForm.get("dienThoai")!.value;
    this.nhacungcapOject.diaChi = this.editForm.get("diaChi")!.value;

    if(this.editForm.valid){
      const putNhaCungCap = this.nhaCungCapService.updateNhaCungCap(this.nhacungcapOject.maNhaCungCap, this.nhacungcapOject).toPromise().then((data) => {
        this.router.navigateByUrl(
          '/nha-cung-cap',
          {state: {typeMsg: 'success', contentMsg: "Edit success !"}}
        )
      },
      (error) => {
        this.alerMsg['showMsg'] = true;
        this.alerMsg['typeMsg'] = 'danger';
        this.alerMsg['contentMsg'] = 'Failed update!';
      }
      );
      await Promise.all([putNhaCungCap]);
    }
  }

}
