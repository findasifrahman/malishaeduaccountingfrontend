import { NgModule } from '@angular/core';
import { FormBuilder, Validators, FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';

export interface salesrecieptinterface {
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
export class salesrecieptmodels {
  voucherProducts() {
    return this.formBuilder.group({
        incomeType: ['', Validators.required],
        price: [0],
        quantity: [0],
        total: [0]
    });
  }

  modelForms: FormGroup = this.formBuilder.group({
    recieptid: ["", Validators.required],
    issuedemployee: [""],
    loggeduser:[""],
    date: ["", Validators.required],
    clientName: ["",Validators.required],
    incomeType: ['', Validators.required],
    paidAmount: [0]

  });
  constructor(private formBuilder: FormBuilder) {}
}
