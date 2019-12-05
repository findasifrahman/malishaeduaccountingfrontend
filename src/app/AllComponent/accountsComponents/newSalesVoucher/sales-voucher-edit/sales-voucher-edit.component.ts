import { Component, OnInit } from '@angular/core';
import {  FormBuilder, Validators, FormGroup,FormControl } from '@angular/forms';
import { SalesVoucherService } from '../sales-voucher.service';
import { Router, ActivatedRoute } from '@angular/router';
import { __await } from 'tslib';
import { MatSnackBar } from '@angular/material';
import { salesVouchermodels } from '../../../../models/salesvouchermodels';
import { ClientGroupService } from '../../../settingsComponents/NewClientGroup/client-group.service';
import { ClientService } from '../../../settingsComponents/NewClient/client.service'
import { IncoomeSourceService } from '../../../settingsComponents/NewIncomeSource/incoome-source.service'
import {  SalesRecieptService  } from '../../newSalesReciept/sales-reciept.service';

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
  clientgrouplist: any[];
  allstudentlist: any[];
  studentlist: any[];
  selectsearchval1: string;
  selectsearchval2: string;
  selectsearchval3: string;
  constructor(private salesVoucherservice: SalesVoucherService,private snackBar: MatSnackBar,
    private formBuilder: FormBuilder,private isourceService: IncoomeSourceService,private salesRecieptservice: SalesRecieptService,
    private clientgroupService: ClientGroupService,private clientService: ClientService,
     private router: Router,private svModels:salesVouchermodels, private route: ActivatedRoute) { }

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
  ngOnInit() {

      this.Forms = this.svModels.modelForms;
      this.isourceService.getAll().subscribe((posts) => {
        this.incomeTypelist = posts as any;
        console.log(posts);
      });
      this.clientService.getAll().subscribe((posts) => {
        this.allstudentlist = posts as any;
        this.studentlist = posts as any;
      });
      this.clientgroupService.getAll().subscribe((posts) =>{
        this.clientgrouplist = posts as any;
      })
      this.onChanges()
      this.route.params.subscribe(params => {
        this.id = params['id'];
        console.log("update id--" + params['id']);
        this.salesVoucherservice.getbyid(this.id).subscribe((data) => {
          this.selectsearchval1 = data["studentoragentName"];
          this.selectsearchval2 = data["incomeType"];
          this.selectsearchval3 = data["studentname"];
          console.log("sel ser val--", this.selectsearchval1)
          this.Forms.patchValue(data);
          console.log(this.Forms);
        });
      })
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
    this.Forms.patchValue({
      studentoragentName: this.selectsearchval1,
      incomeType: this.selectsearchval2,
      studentname: this.selectsearchval3,
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
      const packamount = this.studentlist.find(x=> x.studentname == val)
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
}
