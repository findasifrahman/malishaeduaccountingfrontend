import { NgModule } from '@angular/core';
import { FormBuilder, Validators, FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';

export interface employeemodels {
  employeename: string,
  employeid: string,
  designation: string,
  roleId: number,
  joiningDate: string,
  salary: number,
  absentDeduction: number,
  catagory:string,
  otherinfo:string,
  email: string,
  password: string,
  phone: string,
  image1: string
}
@NgModule({
  imports: [ReactiveFormsModule, FormsModule],
  exports:[]
})
export class employeemodelsform {
  modelForms: FormGroup = this.formBuilder.group({
    employeename: ["", Validators.required],
    employeid: ["", Validators.required],
    designation: ["", Validators.required],
    joiningDate: [""],
    roleId: [0],
    salary: [0],
    absentDeduction: [0],
    catagory: [""],
    otherinfo: [""],
    email: [""],
    password: [""],
    image1: [""],
    phone: [""]
  });

  constructor(private formBuilder: FormBuilder) {}

}
