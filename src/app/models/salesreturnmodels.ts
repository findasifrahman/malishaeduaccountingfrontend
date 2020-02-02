import { NgModule } from '@angular/core';
import { FormBuilder, Validators, FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';

export interface salesReturninterface {
}

@NgModule({
  imports: [ReactiveFormsModule, FormsModule],
  exports:[]
})
export class salesReturnmodels {

  modelForms: FormGroup = this.formBuilder.group({
    returnid: ["", Validators.required],
    studentoragentName: [""],//group
    studentname: [""],//against group
    loggeduser:[""],
    date: ["", Validators.required],
    returnAmount: [0],
    prevdues: [0],
    currentdues: [0],
    additionalInfo: [""],
    servedby:[""]
  });
  constructor(private formBuilder: FormBuilder) {}
}
