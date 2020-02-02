import { Component, OnInit, ViewChild, ɵConsole } from '@angular/core';
import {  FormBuilder, Validators, FormGroup,FormControl,FormArray } from '@angular/forms';
import {  SalesReturnService  } from '../sales-return.service';
import { Router,ActivatedRoute } from '@angular/router';
import { __await } from 'tslib';
import { MatSnackBar } from '@angular/material';
import { salesReturnmodels } from '../../../../models/salesreturnmodels';
import { ClientGroupService } from '../../../settingsComponents/NewClientGroup/client-group.service';
import { ClientService } from '../../../settingsComponents/NewClient/client.service'
import { LoginService } from '../../../login/login.service'
import { SalesRecieptService } from '../../newSalesReciept/sales-reciept.service'
@Component({
  selector: 'app-sales-return-edit',
  templateUrl: './sales-return-edit.component.html',
  styleUrls: ['./sales-return-edit.component.scss']
})
export class SalesReturnEditComponent implements OnInit {
  id: any;
  Forms: FormGroup;
  selectFormControl = new FormControl('', Validators.required);
  clientgrouplist: any[];
  allstudentlist: any[];
  studentlist: any[];
  selectsearchval1: string;
  selectsearchval3: string;
  moneyunit: string = "";
  constructor(private salesReturnservice:  SalesReturnService ,private snackBar: MatSnackBar,private salesRecieptService:SalesRecieptService,
    private formBuilder: FormBuilder, //private salesvocherservice: SalesVoucherService,
    private clientgroupService: ClientGroupService,private clientService: ClientService, private router: Router,
    private salesreturnmodels:salesReturnmodels, private loginService:LoginService, private route: ActivatedRoute) { }

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
        returnAmount:0
      });
      this.clientService.getbyclientstudent(this.selectsearchval1,val).subscribe((voucherposts) => {
        this.salesRecieptService.getbyclientstudent(this.selectsearchval1,val).subscribe(recieptposts =>{
          this.salesReturnservice.getbyclientstudent(this.selectsearchval1,val).subscribe(returnposts =>{
              let ta = 0;
              let pa = 0; //paid amount
              let ra = 0;// return amount
              voucherposts.forEach(function (value) {
                  ta = ta + value.packageAmount
              });
              recieptposts.forEach(function(value){
                  pa = pa + value.paidAmount
              })
              returnposts.forEach(val =>{
                ra = ra + val.returnAmount
              })
              this.Forms.patchValue({
                prevdues: (ta + ra) - pa,
              });
              this.moneyunit = voucherposts[0].unit
            })
        })
      });
    }
    returnamchanges(){
      const ra = this.Forms.get('returnAmount').value
      const pd = this.Forms.get('prevdues').value
      this.Forms.patchValue({
        currentdues: pd + ra,
      });
    }
    onChanges(): void {
      this.Forms.get('returnAmount').valueChanges.subscribe(val => {
        this.returnamchanges()
      })
      this.Forms.get('prevdues').valueChanges.subscribe(val => {
        this.returnamchanges()
      })
    }
    ngOnInit() {
      this.Forms = this.salesreturnmodels.modelForms;
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
        this.salesReturnservice.getbyid(this.id).subscribe((data) => {
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
        await this.salesReturnservice.update(this.id, formValue).subscribe(
          data => {
            console.log("Update req successfull");
            this.snackBar.open('Data Updated Successfully', "Remove", {
              duration: 6000,
              verticalPosition: 'top',
              panelClass: ['blue-snackbar']
            });
            this.router.navigate(["/salesreturn/list"]);
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
