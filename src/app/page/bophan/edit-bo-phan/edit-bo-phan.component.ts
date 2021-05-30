import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { bodyBoPhan } from 'src/app/models/bo-phan';
import { BoPhanService } from 'src/app/services/bo-phan.service';

@Component({
  selector: 'app-edit-bo-phan',
  templateUrl: './edit-bo-phan.component.html',
  styleUrls: ['./edit-bo-phan.component.css']
})
export class EditBoPhanComponent implements OnInit {
  editForm: FormGroup; 
  alerMsg: {[index: string]:any} = {
    "showMsg": false,
    "typeMsg": 'info',
    "contentMsg": ''
  }
  bophanOject = Object.assign({}, bodyBoPhan);
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private bophanService: BoPhanService,
    private activeRoute: ActivatedRoute
  ) { 
    this.editForm = this.fb.group(
      {
        maBoPhan: [{value: '', disabled: true}, [Validators.required]],
        tenBoPhan: [{value: '', disabled: false}, [Validators.required]],
      }
    );
  }

  ngOnInit(): void {
    this.getData();
  }

  getData(){
    this.activeRoute.params.subscribe((param) => {
      this.bophanOject.maBoPhan = param['id'];
    });
    this.getBoPhan(this.bophanOject.maBoPhan);
  }


  async getBoPhan(id: string){
    const getBoPhan = this.bophanService.getBoPhanDetail(id).toPromise().then((bophan: {[index: string]: any}) =>{
      this.bophanOject.maBoPhan = bophan['maBoPhan'];
      this.bophanOject.tenBoPhan = bophan['tenBoPhan'];
      
      console.log(bophan);
      this.editForm.get('maBoPhan')?.setValue(this.bophanOject.maBoPhan);
      this.editForm.get('tenBoPhan')?.setValue(this.bophanOject.tenBoPhan);
    }, () => {
      this.alerMsg['showMsg'] = true;
      this.alerMsg['typeMsg'] = 'danger';
      this.alerMsg['contentMsg'] = 'Get Bộ Phận error!';
    }
    );
    await Promise.all([getBoPhan]);
  }

  async editboPhan(){
    this.bophanOject.maBoPhan = this.editForm.get("maBoPhan")!.value;
    this.bophanOject.tenBoPhan = this.editForm.get("tenBoPhan")!.value;
    if(this.editForm.valid){
      const putBoPhan = this.bophanService.updateBoPhan(this.bophanOject.maBoPhan, this.bophanOject).toPromise().then((data) =>{
        this.router.navigateByUrl(
          '/bo-phan',
          {state: {typeMsg: 'success', contentMsg: "Edit success !"}}
        )
      },
      (error) => {
        this.alerMsg['showMsg'] = true;
        this.alerMsg['typeMsg'] = 'danger';
        this.alerMsg['contentMsg'] = 'Failed update!';
      }
      );
      await Promise.all([putBoPhan]);
    }
  }

}
