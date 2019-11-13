import { NgModule } from '@angular/core';
import { FormBuilder, Validators, FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';

export interface officecostinterface {
  itemname: string,
  itemid: string,
  date: string,
  cost: number,
  additionalCost: number,
  deduction:number,
  totalCost: number,
  otherinfo:string
}
@NgModule({
  imports: [ReactiveFormsModule, FormsModule],
  exports:[]
})
export class officecostmodels {
  modelForms: FormGroup = this.formBuilder.group({
    itemname: ["", Validators.required],
    itemid: ["", ],
    date: ["", Validators.required],
    cost: [0,Validators.required],
    additionalCost: [0, Validators.required],
    deduction:[0],
    totalCost: [0, Validators.required],
    otherinfo: [""]

  });
  constructor(private formBuilder: FormBuilder) {}
}
