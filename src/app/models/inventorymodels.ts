import { NgModule } from '@angular/core';
import { FormBuilder, Validators, FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';

export interface inventoryinterface {
  itemname: string,
  itemid: string,
  date: string,
  unitPrice: number,
  additionalPrice: number,
  quantity:number,
  totalPrice: number,
  otherinfo:string
}
@NgModule({
  imports: [ReactiveFormsModule, FormsModule],
  exports:[]
})
export class inventorymodels {
  modelForms: FormGroup = this.formBuilder.group({
    itemname: ["", Validators.required],
    itemid: ["", ],
    date: ["", Validators.required],
    unitPrice: [0,Validators.required],
    additionalPrice: [0, Validators.required],
    quantity: [0, Validators.required],
    totalPrice: [0, Validators.required],
    otherinfo: [""]

  });
  constructor(private formBuilder: FormBuilder) {}
}
