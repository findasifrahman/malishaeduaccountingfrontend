import { NgModule } from '@angular/core';
import { FormBuilder, Validators, FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';

export interface payrollinterface {
  employeename: string,
  employeeid: string,
  date: string,
  allocatedSalay: number,
  bonus: number,
  absentDays: number,
  lateDays:number,
  otherDeduction: number,
  SalaryPayable: number,
  additionalInfo: string
}
@NgModule({
  imports: [ReactiveFormsModule, FormsModule],
  exports:[]
})
export class payrollmodels {
  modelForms: FormGroup = this.formBuilder.group({
    employeename: ["", Validators.required],
    employeeid: ["", ],
    date: ["", Validators.required],
    allocatedSalay: [0,Validators.required],
    bonus: [0],
    absentDays: [0],
    lateDays: [0],
    otherDeduction: [0],
    SalaryPayable: [0],
    additionalInfo: [""]

  });
  constructor(private formBuilder: FormBuilder) {}
}
