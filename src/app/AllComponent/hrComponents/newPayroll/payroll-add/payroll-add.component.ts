import { Component, OnInit } from '@angular/core';
import {  FormBuilder, Validators, FormGroup,FormControl } from '@angular/forms';
import { PayrollService } from '../payroll.service';
import { Router } from '@angular/router';
import { __await } from 'tslib';
import { MatSnackBar } from '@angular/material';
import { payrollmodels, payrollinterface} from '../../../../models/payrollmodels';
import { EmployeeService } from '../../../settingsComponents/NewEmployee/employee.service'
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-payroll-add',
  templateUrl: './payroll-add.component.html',
  styleUrls: ['./payroll-add.component.scss']
})
export class PayrollAddComponent implements OnInit {

  Forms: FormGroup;
  selectFormControl = new FormControl('', Validators.required);
  employee: any[];
  constructor(private payservice: PayrollService,private snackBar: MatSnackBar,
    private formBuilder: FormBuilder, private empServices: EmployeeService, private router: Router,
    private payModels: payrollmodels) { }

  calculateSalary(val){
      const iid = this.Forms.get('employeeid').value
      console.log("slapgiving-- ", iid)
      const lday = this.Forms.get('lateDays').value
      console.log("slapgiving-- ", lday)
      const absday = this.Forms.get('absentDays').value
      const salpayable = this.Forms.get('allocatedSalay').value//this.employee.find(x => x.employeid === iid).salary
      const abdedec = this.employee.find(x => x.employeid === iid).absentDeduction
      const bonus = this.Forms.get('bonus').value
      const othdeduction = this.Forms.get('otherDeduction').value
      this.Forms.patchValue({
        SalaryPayable: (salpayable + bonus) - ((Math.floor(lday/3) * abdedec )+ (absday * abdedec )) - othdeduction
      });
    }
    onChanges(): void {
      this.Forms.get('employeeid').valueChanges.subscribe(val => {
        this.Forms.patchValue({
          employeename: this.employee.find(x => x.employeid === val).employeename,
          allocatedSalay: this.employee.find(x => x.employeid === val).salary
        });
      });
      this.Forms.get('absentDays').valueChanges.subscribe(val => {
        this.calculateSalary(val)
      });
      this.Forms.get('lateDays').valueChanges.subscribe(val => {
        this.calculateSalary(val)
      });
      this.Forms.get('bonus').valueChanges.subscribe(val => {
        this.calculateSalary(val)
      });
      this.Forms.get('otherDeduction').valueChanges.subscribe(val => {
        this.calculateSalary(val)
      });
      this.Forms.get('allocatedSalay').valueChanges.subscribe(val => {
        this.calculateSalary(val)
      });
    }
    ngOnInit() {
      this.Forms = this.payModels.modelForms;
      this.Forms.reset();
      this.empServices.getAll().subscribe((posts) => {
        this.employee = posts as any;
        console.log(posts);
      });
      this.onChanges();
    }

    async FormSubmit() {
       const formValue = this.Forms.value;
       try {
         await this.payservice.Add(formValue).subscribe(
           data => {
             console.log("post req successfull");
             this.snackBar.open('Data Added Successfully', "Remove", {
               duration: 6000,
               verticalPosition: 'top',
               panelClass: ['blue-snackbar']
             });
             this.router.navigate(["/payroll/list"]);
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
