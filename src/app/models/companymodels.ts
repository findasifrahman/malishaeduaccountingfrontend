import { NgModule } from '@angular/core';
import { FormBuilder, Validators, FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';

export interface companyinterface {
  companyname: string,
  address: string,
  phone: string,
  tel: string,
  logo: string
}
@NgModule({
  imports: [ReactiveFormsModule, FormsModule],
  exports:[]
})
export class companymodels {
  modelForms: FormGroup = this.formBuilder.group({
    companyname: ["", Validators.required],
    address:[""],
    phone: [""],
    tel: [""],
    logo: [""]
  });

  constructor(private formBuilder: FormBuilder) {}

}
