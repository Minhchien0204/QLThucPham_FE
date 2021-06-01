import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import {bodyMonAn} from '../../../models/mon-an';
import {bodyDinhLuong} from '../../../models/dinh-luong';
import {bodyThucPham} from '../../../models/thuc-pham';
import {MonAnService} from '../../../services/mon-an-service.service';
import {ThucPhamService} from '../../../services/thuc-pham.service';

@Component({
  selector: 'app-edit-dinh-luong',
  templateUrl: './edit-dinh-luong.component.html',
  styleUrls: ['./edit-dinh-luong.component.css']
})
export class EditDinhLuongComponent implements OnInit {
  editForm: FormGroup;
  alerMsg: {[index: string]:any} = {
    "showMsg": false,
    "typeMsg": 'info',
    "contentMsg": ''
  }
  monAnObject = Object.assign({}, bodyMonAn);
  thucPhamObject = Object.assign({}, bodyThucPham);
  listThucPham: {[index: string]:any}[] = [];
  dinhLuongObject = Object.assign({}, bodyDinhLuong);
  constructor(private fb: FormBuilder,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private monAnService: MonAnService,
    private thucPhamService: ThucPhamService) {
      this.editForm=this.fb.group(
        {
          tenThucPham: [{ value: '', disabled: false }, [Validators.required]],
          soLuong: [{ value: '', disabled: false }, [Validators.required]],
        }
      );
     }

  ngOnInit(): void {
    this.getData()
    this.getListThucPham()
  }

  getData() {
    // get param on url
    this.activeRoute.params.subscribe((param)=> {
      this.monAnObject.maMonAn = param['id'];
      this.thucPhamObject.maThucPham = param['idThucPham']
    });
    this.getDinhLuong(this.monAnObject.maMonAn, this.thucPhamObject.maThucPham);
  }

  async getDinhLuong(idMA: string, idTP: string) {
    const getDL = this.monAnService.getDetailDinhLuong(idMA, idTP).toPromise().then((dinhLuong: {[index: string]:any}) => {
      // set data for model nhan vien
      // console.log(dinhLuong)
      this.dinhLuongObject.maMonAn = dinhLuong['maMonAn'];
      this.dinhLuongObject.tenMonAn = dinhLuong['tenMonAn'];
      this.dinhLuongObject.maThucPham = dinhLuong['maThucPham'];
      this.dinhLuongObject.tenThucPham = dinhLuong['tenThucPham'];
      this.dinhLuongObject.soLuong = dinhLuong['soLuong'];
    }, ()=> {
      this.alerMsg['showMsg'] = true;
      this.alerMsg['typeMsg'] = 'danger';
      this.alerMsg['contentMsg'] = 'Get định lượng error!';
    });
    await Promise.all([getDL]);
    this.editForm.get('tenThucPham')?.setValue(this.dinhLuongObject.maMonAn);
    this.editForm.get('soLuong')?.setValue(this.dinhLuongObject.soLuong);
  }

  async editDinhLuong() {
    // Get data from form.
    this.dinhLuongObject.maThucPham = this.editForm.get("tenThucPham")!.value;
    this.dinhLuongObject.soLuong = this.editForm.get("soLuong")!.value;

    if (this.editForm.valid) {
    console.log(this.dinhLuongObject)
      const putDL = this.monAnService.putDinhLuong(this.dinhLuongObject.maMonAn, this.dinhLuongObject.maThucPham, this.dinhLuongObject).toPromise().then((data) => {
        this.router.navigateByUrl(
          '/mon-an/' + this.dinhLuongObject.maMonAn + '/dinh-luong',
          {state: {typeMsg: 'success', contentMsg: "Edit success !"}})
      },
      () => {
        this.alerMsg['showMsg'] = true;
        this.alerMsg['typeMsg'] = 'danger';
        this.alerMsg['contentMsg'] = 'Failed update!';
      });
      await Promise.all([putDL]);
    }
  }
  async getListThucPham() {
    const getListTP = this.thucPhamService.getListThucPham().toPromise().then(
      async (dataResponse) => {
        this.listThucPham = dataResponse
        console.log(dataResponse)
      },
      (error)=>{
        // do notthing
      }
    );
    await Promise.all([getListTP]);
    this.editForm.get('tenThucPham')?.setValue(this.dinhLuongObject.maThucPham);
  }
}
