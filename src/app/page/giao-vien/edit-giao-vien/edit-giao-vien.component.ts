import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { bodyGiaoVien } from 'src/app/models/giao-vien';
import { GiaoVienService } from 'src/app/services/giao-vien.service';
import { LopService } from 'src/app/services/lop.service';

@Component({
  selector: 'app-edit-giao-vien',
  templateUrl: './edit-giao-vien.component.html',
  styleUrls: ['./edit-giao-vien.component.css']
})
export class EditGiaoVienComponent implements OnInit {
  editForm: FormGroup;
  alerMsg: {[index: string]:any} = {
    "showMsg": false,
    "typeMsg": 'info',
    "contentMsg": ''
  }
  giaoVien = Object.assign({}, bodyGiaoVien);
  listLop: {[index: string]:any}[] = [];
  constructor(
    private giaoVienService: GiaoVienService,
    private lopService:LopService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private fb:FormBuilder
  ) { 
    this.editForm = this.fb.group(
      {
        maGV: [{value: '', disabled: true}, [Validators.required]],
        name: [{value: '', disabled: true}, [Validators.required]],
        trinhDo: [{value: '', disabled: false}, [Validators.required]],
        ngayVao: [{value: '', disabled: false}, [Validators.required]],
        maLop: [{value: '', disabled:false }],
      }
    );
    this.getListLop();
   }

  async ngOnInit(): Promise<void> {
    await Promise.all([this.getData()]);
  }

  async getData(){
    this.activeRoute.params.subscribe((param) => {
      this.giaoVien.maGV = param['id'];
    });
    await Promise.all([this.getGiaoVien(this.giaoVien.maGV)]);
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
    console.log(this.listLop)
  }

  async getGiaoVien(id: string){
      const getGiaoVien = this.giaoVienService.getByIdGiaoVien(id).toPromise().then((giaovien: {[index: string]: any}) =>{
        this.giaoVien.maGV = giaovien['maGV'];
        this.giaoVien.name = giaovien['name'];
        this.giaoVien.trinhDo = giaovien['trinhDo'];
        this.giaoVien.ngayVao = giaovien['ngayVao'];
        this.giaoVien.maLop = giaovien['maLop'];

        this.editForm.get('maGV')?.setValue(this.giaoVien.maGV);
        this.editForm.get('name')?.setValue(this.giaoVien.name);
        this.editForm.get('trinhDo')?.setValue(this.giaoVien.trinhDo);
        this.editForm.get('ngayVao')?.setValue(this.giaoVien.ngayVao);
        this.editForm.get('maLop')?.setValue(this.giaoVien.maLop);
      },
      ()=> {
        this.alerMsg['showMsg'] = true;
        this.alerMsg['typeMsg'] = 'danger';
        this.alerMsg['contentMsg'] = 'Get giao vien error!';
      }
      );
      await Promise.all([getGiaoVien]);
  }


  async editGiaoVien(){
    this.giaoVien.maGV = this.editForm.get("maGV")!.value;
    this.giaoVien.name = this.editForm.get("name")!.value;
    this.giaoVien.trinhDo = this.editForm.get("trinhDo")!.value;
    this.giaoVien.ngayVao = this.editForm.get("ngayVao")!.value;
    this.giaoVien.maLop = this.editForm.get("maLop")!.value;

    if (this.editForm.valid) {
      const putGiaoVien = this.giaoVienService.updateGiaoVien(this.giaoVien.maGV, this.giaoVien).toPromise().then((data) =>{
        this.router.navigateByUrl(
          '/giao-vien',
          {state: {typeMsg: 'success', contentMsg: "Edit success !"}}
        )
      },
      (error) => {
        this.alerMsg['showMsg'] = true;
        this.alerMsg['typeMsg'] = 'danger';
        this.alerMsg['contentMsg'] = 'Failed update!';
      }
      );
      await Promise.all([putGiaoVien]);
    }
  }

}
