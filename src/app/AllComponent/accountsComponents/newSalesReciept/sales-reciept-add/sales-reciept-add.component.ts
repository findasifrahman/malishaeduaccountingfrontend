import { Component, OnInit, ViewChild, ɵConsole } from '@angular/core';
import {  FormBuilder, Validators, FormGroup,FormControl,FormArray } from '@angular/forms';
import {  SalesRecieptService  } from '../sales-reciept.service';
import { Router } from '@angular/router';
import { __await } from 'tslib';
import { MatSnackBar } from '@angular/material';
import { salesrecieptmodels } from '../../../../models/salesrecieptmodels';
import { ClientGroupService } from '../../../settingsComponents/NewClientGroup/client-group.service';
import { ClientService } from '../../../settingsComponents/NewClient/client.service'
import { LoginService } from '../../../login/login.service'
import { SalesVoucherService } from '../../newSalesVoucher/sales-voucher.service';

@Component({
  selector: 'app-sales-reciept-add',
  templateUrl: './sales-reciept-add.component.html',
  styleUrls: ['./sales-reciept-add.component.scss']
})
export class SalesRecieptAddComponent implements OnInit {
  Forms: FormGroup;
  selectFormControl = new FormControl('', Validators.required);
  clientgrouplist: any[];
  allstudentlist: any[];
  studentlist: any[];
  selectsearchval1: string;
  selectsearchval3: string;
  constructor(private salesRecieptservice:  SalesRecieptService ,private snackBar: MatSnackBar,
    private formBuilder: FormBuilder, private salesvocherservice: SalesVoucherService,
    private clientgroupService: ClientGroupService,private clientService: ClientService, private router: Router,
    private srModels:salesrecieptmodels, private loginService:LoginService) { }
    private formatDate(date) {
      const d = new Date(date);
      let month = '' + (d.getMonth() + 1);
      let day = '' + d.getDate();
      const year = d.getFullYear();
      if (month.length < 2) month = '0' + month;
      if (day.length < 2) day = '0' + day;
      return [year, month, day].join('-');
    }
    SelectvalChanged1(val){
      // client group changed
      this.studentlist =this.allstudentlist.filter(x => x.clientgroupname === val)
      this.selectsearchval1 = val;
    }

    SelectvalChanged3(val){// student changes
      this.selectsearchval3 = val;
      if(!this.selectsearchval1){
        return
      }
      this.Forms.patchValue({
        prevdues: 0,
        currentdues: 0,
        paidAmount:0
      });
      this.salesvocherservice.getbyclientstudent(this.selectsearchval1,val).subscribe((voucherposts) => {
        this.salesRecieptservice.getbyclientstudent(this.selectsearchval1,val).subscribe(recieptposts =>{

          let ta = 0;
          let pa = 0; //paid amount
          voucherposts.forEach(function (value) {
              ta = ta + value.packageAmount,
              pa = pa + value.paidAmount
          });
          recieptposts.forEach(function(value){
              pa = pa + value.paidAmount
          })
          this.Forms.patchValue({
            prevdues: ta - pa,
          });
        })
      });
    }
    paidamchanges(){
      const pa = this.Forms.get('paidAmount').value
      const pd = this.Forms.get('prevdues').value
      this.Forms.patchValue({
        currentdues: pd - pa,
      });
    }
    onChanges(): void {
      this.Forms.get('paidAmount').valueChanges.subscribe(val => {
        this.paidamchanges()
      })
      this.Forms.get('prevdues').valueChanges.subscribe(val => {
        this.paidamchanges()
      })
    }
    ngOnInit() {
      this.Forms = this.srModels.modelForms;
      this.Forms.reset();
      this.clientService.getAll().subscribe((posts) => {
        this.allstudentlist = posts as any;
      });
      this.clientgroupService.getAll().subscribe((posts) =>{
        this.clientgrouplist = posts as any;
      })
      this.Forms.patchValue({date: this.formatDate(new Date())})
      this.onChanges();
    }
    async FormSubmit() {
      if(this.selectsearchval1 == undefined || this.selectsearchval1 == "" || this.selectsearchval1 == null){
        this.snackBar.open('Please select a valid group', "Remove", {
          duration: 4000,
          verticalPosition: 'top',
          panelClass: ['red-snackbar']
        });
        return
      }
      if(this.selectsearchval3 == undefined || this.selectsearchval3 == "" || this.selectsearchval3 == null){
        this.snackBar.open('Please select a valid student name', "Remove", {
          duration: 4000,
          verticalPosition: 'top',
          panelClass: ['red-snackbar']
        });
        return
      }
      if(!this.studentlist.find(x=> x.studentname == this.selectsearchval3)){
        this.snackBar.open('Served By value empty', "Remove", {
          duration: 4000,
          verticalPosition: 'top',
          panelClass: ['red-snackbar']
        });
        return
      }
      const Servedby = this.studentlist.find(x=> x.studentname == this.selectsearchval3).servedby
      this.Forms.patchValue({
        studentoragentName: this.selectsearchval1,
        studentname: this.selectsearchval3,
        loggeduser: this.loginService.getUser(),
        servedby: Servedby
      })
      const formValue = this.Forms.value;
      try {
        await this.salesRecieptservice.Add(formValue).subscribe(
          data => {
            console.log("post req successfull");
            this.snackBar.open('Data Added Successfully', "Remove", {
              duration: 6000,
              verticalPosition: 'top',
              panelClass: ['blue-snackbar']
            });
            this.router.navigate(["/salesreciept/list"]);
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
