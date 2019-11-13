import { Component, OnInit } from '@angular/core';
import {  FormBuilder, Validators, FormGroup,FormControl } from '@angular/forms';
import { SalesVoucherService } from '../sales-voucher.service';
import { Router, ActivatedRoute } from '@angular/router';
import { __await } from 'tslib';
import { MatSnackBar } from '@angular/material';
import { salesVouchermodels } from '../../../../models/salesvouchermodels';
import { ClientService } from '../../../settingsComponents/NewClient/client.service'
import { IncoomeSourceService } from '../../../settingsComponents/NewIncomeSource/incoome-source.service'
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-sales-voucher-edit',
  templateUrl: './sales-voucher-edit.component.html',
  styleUrls: ['./sales-voucher-edit.component.scss']
})
export class SalesVoucherEditComponent implements OnInit {
  id: any;
  Forms: FormGroup;
  selectFormControl = new FormControl('', Validators.required);
  incomeTypelist: any[];
  clientlist: any[];
  selectsearchval1: string;
  selectsearchval2: string;
  selectsearchval3: string;
  constructor(private salesVoucherservice: SalesVoucherService,private snackBar: MatSnackBar,
    private formBuilder: FormBuilder,private isourceService: IncoomeSourceService, private cliService: ClientService,
     private router: Router,private svModels:salesVouchermodels, private route: ActivatedRoute) { }

     paidamchanges(){
      const pa = this.Forms.get('paidAmount').value
      const ta = this.Forms.get('totalAmount').value
      const pd = this.Forms.get('prevdues').value
      this.Forms.patchValue({
        currentdues: ta - pa + pd,
      });
    }
     onChanges(): void {
      this.Forms.get('clientName').valueChanges.subscribe(val => {
        console.log(val);
        this.salesVoucherservice.getbyClient(val).subscribe((posts) => {
          let ta = 0;
          let pa = 0;
          posts.forEach(function (value) {
             ta = ta + value.totalAmount,
             pa = pa + value.paidAmount
          });
          this.Forms.patchValue({
            prevdues: ta - pa,
          });
        });
      });
      this.Forms.get('paidAmount').valueChanges.subscribe(val => {
        this.paidamchanges()
      })
      this.Forms.get('totalAmount').valueChanges.subscribe(val => {
        this.paidamchanges()
      })
      this.Forms.get('prevdues').valueChanges.subscribe(val => {
        this.paidamchanges()
      })
    }
  ngOnInit() {
      this.Forms = this.svModels.modelForms;
      this.isourceService.getAll().subscribe((posts) => {
        this.incomeTypelist = posts as any;
      });
      this.cliService.getAll().subscribe((posts) => {
        this.clientlist= posts as any;
      });
      this.onChanges()
      this.route.params.subscribe(params => {
        this.id = params['id'];
        console.log("update id--" + params['id']);
        this.salesVoucherservice.getbyid(this.id).subscribe((data) => {
          this.selectsearchval1 = data["clientid"];
          this.selectsearchval2 = data["incomeType"];
          this.selectsearchval3 = data["clientName"];
          console.log("sel ser val--", this.selectsearchval1)
          this.Forms.patchValue(data);
          console.log(this.Forms);
        });
      })
  }

  async FormSubmit() {
    this.Forms.patchValue({
      clientid: this.selectsearchval1,
      incomeType: this.selectsearchval2,
      clientName: this.selectsearchval3,
    })
    const formValue = this.Forms.value;
    console.log(formValue);
    await this.salesVoucherservice.update(this.id, formValue).subscribe(() => {
      console.log("Update req successfull");
      this.snackBar.open('Data Updated Successfully', "Remove", {
        duration: 5000, verticalPosition: 'top', panelClass: ['blue-snackbar']
      });
      this.router.navigate(['/salesVoucher/list']);
    },
      error => {
        console.log("error Update", error);
        this.snackBar.open('Update Unsuccessfull', "Remove", {
          duration: 6000, verticalPosition: 'top', panelClass: ['red-snackbar']
        });
      }
    );
  }

  SelectvalChanged1(val){
    const va =this.clientlist.find(x => x.clientId === val).clientname
    this.Forms.patchValue({clientName: va});
    this.selectsearchval1 = val;
    this.selectsearchval3 = va;
  }
  SelectvalChanged2(val){
    this.selectsearchval2 = val;
  }
  SelectvalChanged3(val){
    console.log("in sel val 3 -- ", val)
    const va =this.clientlist.find(x => x.clientname === val).clientId
    this.Forms.patchValue({clientid: va});
    this.selectsearchval1 = va;
    this.selectsearchval3 = val;
  }
}
