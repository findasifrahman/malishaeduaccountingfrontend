import { NgModule } from '@angular/core';
import { FormBuilder, Validators, FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';

export interface clientinterface {
  clientname: string,
  address: string,
  phone: string,
  otherinfo: string
}
@NgModule({
  imports: [ReactiveFormsModule, FormsModule],
  exports:[]
})
export class clientmodels {
  modelForms: FormGroup = this.formBuilder.group({
    clientname: ["", Validators.required],
    clientId: ["", Validators.required],
    address: [""],
    phone: [""],
    otherinfo: [""]
  });

  constructor(private formBuilder: FormBuilder) {}

}
