import { Component, OnInit, ViewChild, ɵConsole } from '@angular/core';
import {  FormBuilder, Validators, FormGroup,FormControl,FormArray } from '@angular/forms';
import {  SalesRecieptService  } from '../sales-reciept.service';
import { Router,ActivatedRoute } from '@angular/router';
import { __await } from 'tslib';
import { MatSnackBar } from '@angular/material';
import { salesrecieptmodels } from '../../../../models/salesrecieptmodels';
import { ClientGroupService } from '../../../settingsComponents/NewClientGroup/client-group.service';
import { ClientService } from '../../../settingsComponents/NewClient/client.service'
import { LoginService } from '../../../login/login.service'
import { SalesVoucherService } from '../../newSalesVoucher/sales-voucher.service';

@Component({
  selector: 'app-sales-reciept-edit',
  templateUrl: './sales-reciept-edit.component.html',
  styleUrls: ['./sales-reciept-edit.component.scss']
})
export class SalesRecieptEditComponent implements OnInit {
  id: any;
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
    private srModels:salesrecieptmodels, private loginService:LoginService, private route: ActivatedRoute) { }

    SelectvalChanged1(val){
      // client group changed
      this.studentlist =this.allstudentlist.filter(x => x.clientgroupname === val)
      this.selectsearchval1 = val;

    }

    SelectvalChanged3(val){
      this.selectsearchval3 = val;
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
      this.clientService.getAll().subscribe((posts) => {
        this.allstudentlist = posts as any;
        this.studentlist = posts as any;
      });
      this.clientgroupService.getAll().subscribe((posts) =>{
        this.clientgrouplist = posts as any;
      })
      this.onChanges();
      this.route.params.subscribe(params => {
        this.id = params['id'];
        console.log("update id--" + params['id']);
        this.salesRecieptservice.getbyid(this.id).subscribe((data) => {
          this.selectsearchval1 = data["studentoragentName"];
          this.selectsearchval3 = data["studentname"];
          this.Forms.patchValue(data);
          console.log(data);
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
      this.Forms.patchValue({
        studentoragentName: this.selectsearchval1,
        studentname: this.selectsearchval3
      })
      const formValue = this.Forms.value;
      try {
        await this.salesRecieptservice.update(this.id, formValue).subscribe(
          data => {
            console.log("Update req successfull");
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
