import { Component, OnInit } from '@angular/core';
import {  FormBuilder, Validators, FormGroup,FormControl } from '@angular/forms';
import { PayrollService } from '../payroll.service';
import { Router, ActivatedRoute } from '@angular/router';
import { __await } from 'tslib';
import { MatSnackBar } from '@angular/material';
import { payrollmodels, payrollinterface} from '../../../../models/payrollmodels';
import { EmployeeService } from '../../../settingsComponents/NewEmployee/employee.service'
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-payroll-edit',
  templateUrl: './payroll-edit.component.html',
  styleUrls: ['./payroll-edit.component.scss']
})
export class PayrollEditComponent implements OnInit {
  id: any;
  Forms: FormGroup;
  selectFormControl = new FormControl('', Validators.required);
  employee: any[];

  constructor(private payservice: PayrollService,private snackBar: MatSnackBar,
    private formBuilder: FormBuilder, private empServices: EmployeeService, private router: Router,
    private payModels: payrollmodels, private route: ActivatedRoute) { }
  compareThem(o1, o2): boolean{
      console.log('compare with');
      return o1.name === o2.name;
  }
  defval:any;
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
    this.empServices.getAll().subscribe((posts) => {
      this.employee = posts as any;
      console.log(posts);
    });
    this.onChanges();
    this.route.params.subscribe(params => {
      this.id = params['id'];
      console.log("update id--" + params['id']);
      this.payservice.getbyid(this.id).subscribe((data) => {
        this.Forms.patchValue(data);
        console.log(this.Forms);
      });
    })
  }

  async FormSubmit() {

    const formValue = this.Forms.value;
    console.log(formValue);
    await this.payservice.update(this.id, formValue).subscribe(() => {
      console.log("Update req successfull");
      this.snackBar.open('Data Updated Successfully', "Remove", {
        duration: 5000, verticalPosition: 'top', panelClass: ['blue-snackbar']
      });
      this.router.navigate(['/payroll/list']);
    },
      error => {
        console.log("error Update", error);
        this.snackBar.open('Update Unsuccessfull', "Remove", {
          duration: 6000, verticalPosition: 'top', panelClass: ['red-snackbar']
        });
      }
    );
  }

}
