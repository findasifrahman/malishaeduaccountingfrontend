import { Component, OnInit, ViewChild, ɵConsole } from '@angular/core';
import {  FormBuilder, Validators, FormGroup,FormControl,FormArray } from '@angular/forms';
import {  SalesCommissionService  } from '../sales-commission.service';
import { Router } from '@angular/router';
import { __await } from 'tslib';
import { MatSnackBar } from '@angular/material';
import { ClientGroupService } from '../../../settingsComponents/NewClientGroup/client-group.service'
import { LoginService } from '../../../login/login.service'
import { salescommissionmodels } from 'src/app/models/salescommissionmodels';
import {  SalesReturnService  } from '../../newSalesReturn/sales-return.service';
import { SalesRecieptService } from '../../newSalesReciept/sales-reciept.service'
import { ClientService } from '../../../settingsComponents/NewClient/client.service'

@Component({
  selector: 'app-sales-commission-add',
  templateUrl: './sales-commission-add.component.html',
  styleUrls: ['./sales-commission-add.component.scss']
})
export class SalesCommissionAddComponent implements OnInit {
  Forms: FormGroup;
  selectFormControl = new FormControl('', Validators.required);
  incomeTypelist: any[];
  clientgrlist: any[];
  salescomlist: any[];
  saleslist: any[];
  selectsearchval1: string;
  salestabhid: boolean = true;
  fromdatereadonly: boolean = true;
  values:any[] = []

  saverange($event){
    console.log("start---------")
    console.log(this.values)
    console.log($event)
    console.log("end------------")
    this.Forms.patchValue({commission: this.values.reduce((a, b) => a + b, 0)})
  }
  constructor(private scservice: SalesCommissionService,private snackBar: MatSnackBar,
    private formBuilder: FormBuilder, private cligrService: ClientGroupService, private router: Router,
    private salescomodels:salescommissionmodels,private loginService:LoginService,
    private salesReturnservice:  SalesReturnService,
    private salesRecieptservice:  SalesRecieptService, private clientServices:ClientService ) {

    }
    SelectvalChanged1(val){
      this.selectsearchval1 = val;
      this.values = []
      //const va =this.clientlist.find(x => x.clientId === val).clientname
      //this.Forms.patchValue({clientName: va});
      const lst = this.salescomlist.filter(x => x.agentname === val)
      console.log(lst)
      var prevdatetime = new Date(2018, 11, 24, 10, 33, 30, 0)
      if(lst.length ==0){
        this.Forms.patchValue({fromdate: this.formatDate("2019/01/01")})
        this.fromdatereadonly = false
      }
      lst.forEach(val=>{
         var dt =  new Date(val["todate"])
         dt.setDate(dt.getDate() + 1)
         if(dt > prevdatetime){
           this.Forms.patchValue({fromdate: this.formatDate(dt)})
           this.fromdatereadonly = true
           console.log()
         }

         prevdatetime = dt;
      })

      this.changeToatalam()
    }
    changeToatalam(){
      const toval = this.Forms.get('todate').value;
      const frval = this.Forms.get('fromdate').value;
      const serval = this.selectsearchval1;
      if(toval){
        if(this.selectsearchval1){
          this.clientServices.getbydateclient(frval,toval,serval).subscribe(voucherposts =>{
            //
            this.salesRecieptservice.getbydateclient(frval,toval,serval).subscribe(recieptposts =>{
              this.salesReturnservice.getbyclientstudent(this.selectsearchval1,serval).subscribe(returnposts =>{
                  this.saleslist = voucherposts;
                  let ta = 0;
                  let pa = 0; //paid amount
                  let ra = 0;// return amount
                  voucherposts.forEach(function (value) {
                      ta = ta + value.packageAmount
                      //pa = pa + value.paidAmount
                  });
                  recieptposts.forEach(function(value){
                      pa = pa + value.paidAmount
                  })
                  returnposts.forEach(val =>{
                    ra = ra + val.returnAmount
                  })
                  this.Forms.patchValue({
                    totalamount: ta,
                    dueamount: (ta + ra) - pa,
                  });
                  let firindex = 0;
                  this.salestabhid = false
                  this.saleslist.forEach(val=>{
                    let totremam = returnposts.filter(rv =>(rv.studentname == val.studentname && rv.studentoragentName == val.clientgroupname)).reduce((a, b) => a + (b["returnAmount"] || 0), 0);
                    let totsaleam = recieptposts.filter(rv =>(rv.studentname == val.studentname && rv.studentoragentName == val.clientgroupname)).reduce((a, b) => a + (b["paidAmount"] || 0), 0);
                    this.saleslist[firindex]["return"] = totremam
                    //this.saleslist[firindex]["recieptPay"] = recieptposts.filter(rv => (rv.studentname == val.studentname && rv.studentoragentName == val.studentoragentName)).reduce((a, b) => a + (b["paidAmount"] || 0), 0);
                    this.saleslist[firindex]["total"] = totsaleam
                    this.saleslist[firindex]["TotDue"] = (val.packageAmount + totremam) - totsaleam;
                    firindex++;
                  })
              })
            })
            //
          })
        }

      }
    }
    onChanges(): void{
      this.values = []
      this.changeToatalam()
      this.Forms.get('todate').valueChanges.subscribe(val => {
        this.changeToatalam()
      })
    }
    private formatDate(date) {
      const d = new Date(date);
      let month = '' + (d.getMonth() + 1);
      let day = '' + d.getDate();
      const year = d.getFullYear();
      if (month.length < 2) month = '0' + month;
      if (day.length < 2) day = '0' + day;
      return [year, month, day].join('-');
    }
    ngOnInit() {
      this.Forms = this.salescomodels.modelForms;
      this.Forms.reset();
      this.scservice.getAll().subscribe((posts) => {
        this.salescomlist= posts as any;
      });
      this.cligrService.getAll().subscribe((posts) => {
        this.clientgrlist= posts as any;
      });
      this.Forms.patchValue({fromdate: this.formatDate(new Date())})

      this.onChanges();
    }

    async FormSubmit() {
      this.Forms.patchValue({
        agentname: this.selectsearchval1,
        enteredby: this.loginService.getUser()
      })
      if(this.selectsearchval1 == null || this.selectsearchval1 == ""){
        this.snackBar.open('Agent name cant be empty', "Remove", {
          duration: 4000,
          verticalPosition: 'top',
          panelClass: ['red-snackbar']
        });
        return
      }
      const formValue = this.Forms.value;
      try {
        await this.scservice.Add(formValue).subscribe(
          data => {
            console.log("post req successfull");
            this.snackBar.open('Data Added Successfully', "Remove", {
              duration: 6000,
              verticalPosition: 'top',
              panelClass: ['blue-snackbar']
            });
            this.router.navigate(["/salescommission/list"]);
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
