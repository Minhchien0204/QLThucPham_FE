import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tao-nhan-vien',
  templateUrl: './tao-nhan-vien.component.html',
  styleUrls: ['./tao-nhan-vien.component.css']
})
export class TaoNhanVienComponent implements OnInit {

  createForm: FormGroup;
  constructor(private fb: FormBuilder) { 
    this.createForm=this.fb.group(
      {
        maNhanVien: [{ value: '', disabled: false }, [Validators.required]],
        name: [{ value: '', disabled: false }, [Validators.required]],
        diaChi: [{ value: '', disabled: false }, [Validators.required]],
        dienThoai: [{ value: '', disabled: false }, [Validators.required]],
        ngaySinh: [{ value: '', disabled: false }, [Validators.required]],
        tenBoPhan: [{ value: '', disabled: false }, [Validators.required]],
      }
    ) ;  
  }

  ngOnInit(): void {
  }

}
