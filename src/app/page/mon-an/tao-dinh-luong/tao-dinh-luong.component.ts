import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { bodyMonAn } from '../../../models/mon-an';
import { bodyDinhLuong } from '../../../models/dinh-luong';
import {MonAnService} from '../../../services/mon-an-service.service';
import {ThucPhamService} from '../../../services/thuc-pham.service';

@Component({
  selector: 'app-tao-dinh-luong',
  templateUrl: './tao-dinh-luong.component.html',
  styleUrls: ['./tao-dinh-luong.component.css']
})
export class TaoDinhLuongComponent implements OnInit {
  createForm: FormGroup;
  alerMsg: {[index: string]:any} = {
    "showMsg": false,
    "typeMsg": 'info',
    "contentMsg": ''
  }
  listThucPham: {[index: string]:any}[] = [];
  monAnObject = Object.assign({}, bodyMonAn);
  dinhLuong = Object.assign({}, bodyDinhLuong)
  constructor(private fb: FormBuilder,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private monAnService: MonAnService,
    private thucPhamService: ThucPhamService) {
      this.createForm = this.fb.group(
        {
          maMonAn: [{ value: '', disabled: true }, [Validators.required]],
          maThucPham: [{ value: '', disabled: false }, [Validators.required]],
          soLuong: [{ value: '', disabled: false }, [Validators.required]],
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
  

  async addDinhLuongMA() {
   this.dinhLuong.maMonAn = this.createForm.get("maMonAn")!.value;
   this.dinhLuong.maThucPham = this.createForm.get("maThucPham")!.value;
   this.dinhLuong.soLuong = this.createForm.get("soLuong")!.value;
   if(this.createForm.valid){
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
