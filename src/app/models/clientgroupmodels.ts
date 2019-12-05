import { NgModule } from '@angular/core';
import { FormBuilder, Validators, FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';

export interface clientgroupinterface {
  clientgroupname: string,
  companyname: string,
  address: string,
  phone: string,
  otherinfo: string
}
@NgModule({
  imports: [ReactiveFormsModule, FormsModule],
  exports:[]
})
export class clientgroupmodels {
  modelForms: FormGroup = this.formBuilder.group({
    clientgroupname: ["", Validators.required],
    companyname: [""],
    address: [""],
    phone: [""],
    otherinfo: [""]
  });

  constructor(private formBuilder: FormBuilder) {}

}
