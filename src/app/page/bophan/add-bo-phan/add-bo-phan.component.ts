import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { bodyBoPhan } from 'src/app/models/bo-phan';
import { BoPhanService } from 'src/app/services/bo-phan.service';

@Component({
  selector: 'app-add-bo-phan',
  templateUrl: './add-bo-phan.component.html',
  styleUrls: ['./add-bo-phan.component.css']
})
export class AddBoPhanComponent implements OnInit {
  createForm: FormGroup;
  alerMsg: {[index: string]:any} = {
    "showMsg": false,
    "typeMsg": 'info',
    "contentMsg": ''
  }
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private bophanService: BoPhanService
  ) { 
    this.createForm = this.fb.group(
      {
        maBoPhan: [{value: '', disabled: false}, [Validators.required]],
        tenBoPhan: [{value: '', disabled: false}, [Validators.required]]
      }
    );
  }

  ngOnInit(): void {
  }

  async addBoPhan(){
    const bophan = Object.assign({},bodyBoPhan);
    bophan.maBoPhan = this.createForm.get("maBoPhan")!.value;
    bophan.TenBoPhan = this.createForm.get("tenBoPhan")!.value;

    if(this.createForm.valid)
    {
      const postBoPhan = this.bophanService.createBoPhan(bophan).toPromise().then((data) => {
        this.router.navigateByUrl(
          '/bo-phan',
          {state: {typeMsg: 'success', contentMsg: "Success"}}
        )
      },
      (error) => {
        this.alerMsg['showMsg'] = true;
        this.alerMsg['typeMsg'] = 'danger';
        this.alerMsg['contentMsg'] = 'Failed create!';
      });
      await Promise.all([postBoPhan]);
    }
  }

}
