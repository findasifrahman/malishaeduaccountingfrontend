import { NgModule } from '@angular/core';
import { FormBuilder, Validators, FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';

export interface salesVoucherinterface {
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
export class salesVouchermodels {
  voucherProducts() {
    return this.formBuilder.group({
        incomeType: ['', Validators.required],
        price: [0],
        quantity: [0],
        total: [0]
    });
  }

  modelForms: FormGroup = this.formBuilder.group({
    voucherid: ["", Validators.required],
    studentoragentName: [""],//group
    studentname: [""],//against group
    //issuedemployee: [""],
    loggeduser:[""],
    date: ["", Validators.required],
    incomeType: [''],
    packageAmount: [0], //auto generate from client
    paidAmount: [0],
    prevdues: [0],
    currentdues: [0],
    additionalInfo: [""],
    servedby:[""]

  });
  constructor(private formBuilder: FormBuilder) {}
}
