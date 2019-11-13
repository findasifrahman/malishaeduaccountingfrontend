import { NgModule } from '@angular/core';
import { FormBuilder, Validators, FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';

export interface purchaseinterface {
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
export class purchasemodels {

  modelForms: FormGroup = this.formBuilder.group({
    serialid: ["", Validators.required],
    purchasedby: [""],
    loggeduser:[""],
    date: ["", Validators.required],
    clientid: [""],
    clientName: [""],
    incomeType: [''],
    price: [0],
    quantity: [0],
    additionalPrice: [0],
    discount: [0],
    totalPrice: [0],
    additionalInfo: [""]

  });
  constructor(private formBuilder: FormBuilder) {}
}
