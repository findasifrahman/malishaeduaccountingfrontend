import { NgModule } from '@angular/core';
import { FormBuilder, Validators, FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';

export interface clientinterface {
  clientgroupname,
  clientname: string,
  address: string,
  phone: string,
  otherinfo: string,
  studentname: string,
  nationality:string,
  passport: string,
  university: string,
  degree: string,
  majour: string,
  amount: number
}
@NgModule({
  imports: [ReactiveFormsModule, FormsModule],
  exports:[]
})
export class clientmodels {
  modelForms: FormGroup = this.formBuilder.group({
    clientgroupname: [""],
    clientname: [""],// not used
    clientId: [""], //not used
    address: [""],
    source:[""], // facebook source
    servedby:[""], // employee who served
    phone: [""],
    otherinfo: [""],
    studentname: [""],
    nationality:[""],
    passport:[""],
    university:[""],
    degree:[""],
    major:[""],
    packageamount:[0]
  });

  constructor(private formBuilder: FormBuilder) {}

}
