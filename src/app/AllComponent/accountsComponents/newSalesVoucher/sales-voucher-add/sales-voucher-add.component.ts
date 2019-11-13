import { Component, OnInit, ViewChild, ɵConsole } from '@angular/core';
import {  FormBuilder, Validators, FormGroup,FormControl,FormArray } from '@angular/forms';
import {  SalesVoucherService  } from '../sales-voucher.service';
import { Router } from '@angular/router';
import { __await } from 'tslib';
import { MatSnackBar } from '@angular/material';
import { salesVouchermodels } from '../../../../models/salesvouchermodels';
import { ClientService } from '../../../settingsComponents/NewClient/client.service'
import { IncoomeSourceService } from '../../../settingsComponents/NewIncomeSource/incoome-source.service'
import { LoginService } from '../../../login/login.service'

import { SelectSearchComponent} from '../../../../sharedComponentModule/select-search/select-search.component';
@Component({
  selector: 'app-sales-voucher-add',
  templateUrl: './sales-voucher-add.component.html',
  styleUrls: ['./sales-voucher-add.component.scss']
})
export class SalesVoucherAddComponent implements OnInit {
  Forms: FormGroup;
  selectFormControl = new FormControl('', Validators.required);
  incomeTypelist: any[];
  clientlist: any[];
  selectsearchval1: string;
  selectsearchval2: string;
  selectsearchval3: string;
  constructor(private salesVoucherservice: SalesVoucherService,private snackBar: MatSnackBar,
    private formBuilder: FormBuilder, private isourceService: IncoomeSourceService, private cliService: ClientService, private router: Router,
    private svModels:salesVouchermodels, private loginService:LoginService) { }

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
        const va =this.clientlist.find(x => x.clientname === val).clientId
        this.salesVoucherservice.getbyClient(val).subscribe((posts) => {
          console.log(posts)
          let ta = 0;
          let pa = 0;
          posts.forEach(function (value) {
             ta = ta + value.totalAmount,
             pa = pa + value.paidAmount
          });
          this.Forms.patchValue({
            prevdues: ta - pa,
            //clientid: va
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
    ngOnInit() {
      this.Forms = this.svModels.modelForms;
      this.Forms.reset();
      this.isourceService.getAll().subscribe((posts) => {
        this.incomeTypelist = posts as any;
        console.log(posts);
      });
      this.cliService.getAll().subscribe((posts) => {
        this.clientlist= posts as any;
      });
      this.onChanges();
    }

    async FormSubmit() {
      this.Forms.patchValue({
        clientid: this.selectsearchval1,
        incomeType: this.selectsearchval2,
        clientName: this.selectsearchval3,
        loggeduser: this.loginService.getUser()
      })
      const formValue = this.Forms.value;
      try {
        await this.salesVoucherservice.Add(formValue).subscribe(
          data => {
            console.log("post req successfull");
            this.snackBar.open('Data Added Successfully', "Remove", {
              duration: 6000,
              verticalPosition: 'top',
              panelClass: ['blue-snackbar']
            });
            this.router.navigate(["/salesVoucher/list"]);
          },
          error => {
            console.log("error post", error);
            this.snackBar.open('Unsuccessfull', "Remove", {
              duration: 6000,
              verticalPosition: 'top',
              panelClass: ['red-snackbar']
            });
          }
        );

      }
      catch (err) {
      }
    }

}
