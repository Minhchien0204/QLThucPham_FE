import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { bodyDinhLuong } from 'src/app/models/dinh-luong';
import { MonAnService } from 'src/app/services/mon-an-service.service';
import { ThucPhamService } from 'src/app/services/thuc-pham.service';

@Component({
  selector: 'app-add-dinh-luong1',
  templateUrl: './add-dinh-luong1.component.html',
  styleUrls: ['./add-dinh-luong1.component.css']
})
export class AddDinhLuong1Component implements OnInit {
  createForm: FormGroup;
  alerMsg: {[index: string]:any} = {
    "showMsg": false,
    "typeMsg": 'info',
    "contentMsg": ''
  }
  listThucPham: {[index: string]: any}[]=[];
  dinhLuong = Object.assign({}, bodyDinhLuong);
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private thucPhamService: ThucPhamService,
    private monAnService: MonAnService,
    private activeRoute: ActivatedRoute
  ) {
    this.createForm = this.fb.group(
      {
        maMonAn: [{value: '', disabled: true}, [Validators.required]],
        maThucPham: [{value: '', disabled: false}, [Validators.required]],
        soLuong: [{value: '', disabled: false}, [Validators.required] ],
      }
    );
    this.getListThucPham();
   }
  

   async ngOnInit(): Promise<void> {
    console.log('init')
    await Promise.all([this.getData()]);
    console.log('xong init')
  }

  async getData(){
    this.activeRoute.params.subscribe((param) => {
      this.dinhLuong.maMonAn = param['id'];
    });
    await Promise.all([this.createForm.get('maMonAn')?.setValue(this.dinhLuong.maMonAn)]);
  }


  async getListThucPham() {
    const dataGet: any[] = [];
    const getThucPham = this.thucPhamService.getListThucPham().toPromise().then(
      async (dataResponse) => {
        dataResponse.map((thucpham) => {
          dataGet.push(thucpham)
        })
      },
      (error)=>{
        // do notthing
      }
    );
    await Promise.all([getThucPham]);
    this.listThucPham = dataGet;
  }

  async addDinhLuong() {
    this.dinhLuong.maMonAn = this.createForm.get("maMonAn")!.value;
    this.dinhLuong.maThucPham = this.createForm.get("maThucPham")!.value;
    this.dinhLuong.soLuong = this.createForm.get("soLuong")!.value;
    if (this.createForm.valid) {
      const postDinhLuong = this.monAnService.addDinhLuong(this.dinhLuong).toPromise().then((data) => {
        this.router.navigateByUrl(
          '/mon-an',
          {state: {typeMsg: 'success', contentMsg: "Success"}})
      },
      (error) => {
        this.alerMsg['showMsg'] = true;
        this.alerMsg['typeMsg'] = 'danger';
        this.alerMsg['contentMsg'] = 'Failed create!';
      });
      await Promise.all([postDinhLuong]);
    }
  }


}
