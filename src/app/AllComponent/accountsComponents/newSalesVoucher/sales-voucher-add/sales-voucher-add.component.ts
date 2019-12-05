import { Component, OnInit, ViewChild, ɵConsole } from '@angular/core';
import {  FormBuilder, Validators, FormGroup,FormControl,FormArray } from '@angular/forms';
import {  SalesVoucherService  } from '../sales-voucher.service';
import { Router } from '@angular/router';
import { __await } from 'tslib';
import { MatSnackBar } from '@angular/material';
import { salesVouchermodels } from '../../../../models/salesvouchermodels';
import { ClientGroupService } from '../../../settingsComponents/NewClientGroup/client-group.service';
import { ClientService } from '../../../settingsComponents/NewClient/client.service'
import { IncoomeSourceService } from '../../../settingsComponents/NewIncomeSource/incoome-source.service'
import { LoginService } from '../../../login/login.service'
import {  SalesRecieptService  } from '../../newSalesReciept/sales-reciept.service';
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
  clientgrouplist: any[];
  allstudentlist: any[];
  salesvoucherexist = false;
  studentlist: any[];
  selectsearchval1: string;
  selectsearchval2: string;
  selectsearchval3: string;
  constructor(private salesVoucherservice: SalesVoucherService,private snackBar: MatSnackBar,
    private formBuilder: FormBuilder, private isourceService: IncoomeSourceService,private salesRecieptservice: SalesRecieptService,
    private clientgroupService: ClientGroupService,private clientService: ClientService, private router: Router,
    private svModels:salesVouchermodels, private loginService:LoginService) { }
    private formatDate(date) {
      const d = new Date(date);
      let month = '' + (d.getMonth() + 1);
      let day = '' + d.getDate();
      const year = d.getFullYear();
      if (month.length < 2) month = '0' + month;
      if (day.length < 2) day = '0' + day;
      return [year, month, day].join('-');
    }
    paidamchanges(){
      const pa = this.Forms.get('paidAmount').value
      const ta = this.Forms.get('packageAmount').value
      const pd = this.Forms.get('prevdues').value
      this.Forms.patchValue({
        currentdues: ta - pa + pd,
      });
    }
    onChanges(): void {

      this.Forms.get('paidAmount').valueChanges.subscribe(val => {
        this.paidamchanges()
      })
      this.Forms.get('packageAmount').valueChanges.subscribe(val => {
        this.paidamchanges()
      })
      this.Forms.get('prevdues').valueChanges.subscribe(val => {
        this.paidamchanges()
      })
    }
    SelectvalChanged1(val){
      // client group changed
      this.studentlist =this.allstudentlist.filter(x => x.clientgroupname === val)
      console.log(this.studentlist)
      //this.Forms.patchValue({clientName: va});
      this.selectsearchval1 = val;

    }
    SelectvalChanged2(val){
      this.selectsearchval2 = val;
    }
    SelectvalChanged3(val){
      // student selected
      console.log(this.studentlist)
      const packamount = this.studentlist.find(x=> x.studentname == val).packageamount
      console.log(packamount)
      this.Forms.patchValue({ packageAmount: packamount});
      this.selectsearchval3 = val;
      if(!this.selectsearchval1){
        return
      }
      this.Forms.patchValue({
        prevdues: 0,
        currentdues: 0,
        paidAmount:0
      });
      this.salesVoucherservice.getbyclientstudent(this.selectsearchval1,val).subscribe((voucherposts) => {
        if(voucherposts){
          this.salesvoucherexist = true
        }
        this.salesRecieptservice.getbyclientstudent(this.selectsearchval1,val).subscribe(recieptposts =>{
          let ta = 0;
          let pa = 0;
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
    ngOnInit() {
      this.Forms = this.svModels.modelForms;
      this.Forms.reset();
      this.isourceService.getAll().subscribe((posts) => {
        this.incomeTypelist = posts as any;
        console.log(posts);
      });
      this.clientService.getAll().subscribe((posts) => {
        this.studentlist = posts as any;
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
      if(this.selectsearchval2 == undefined || this.selectsearchval2 == "" || this.selectsearchval2 == null){
        this.snackBar.open('Please select income source', "Remove", {
          duration: 4000,
          verticalPosition: 'top',
          panelClass: ['red-snackbar']
        });
        return
      }
      console.log(this.selectsearchval3)
      console.log(this.selectsearchval1)
      console.log(this.studentlist)
      console.log(this.studentlist.find(x=> x.studentname == this.selectsearchval3))
      console.log(this.allstudentlist.filter(x=> (x.studentname == this.selectsearchval3 && x.studentoragentName == this.selectsearchval1)))
      if(!this.studentlist.find(x=> x.studentname == this.selectsearchval3)){
        this.snackBar.open('Served By value empty', "Remove", {
          duration: 4000,
          verticalPosition: 'top',
          panelClass: ['red-snackbar']
        });
        return
      }
      const Servedby = this.studentlist.find(x=> x.studentname == this.selectsearchval3).servedby
      /*if(this.salesvoucherexist){
        this.snackBar.open('This student data already exist', "Remove", {
          duration: 4000,
          verticalPosition: 'top',
          panelClass: ['red-snackbar']
        });
        return
      }*/
      this.Forms.patchValue({
        studentoragentName: this.selectsearchval1,
        incomeType: this.selectsearchval2,
        studentname: this.selectsearchval3,
        loggeduser: this.loginService.getUser(),
        servedby: Servedby
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
