import { NgModule } from '@angular/core';
import { FormBuilder, Validators, FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';

export interface salescommissioninterface {
  agentname: string,
  enteredby: string,
  fromdate: string,
  todate: string,
  additionalInfo: string,
  totalamount: number,
  dueamount: number,
  commission: number,
}
@NgModule({
  imports: [ReactiveFormsModule, FormsModule],
  exports:[]
})
export class salescommissionmodels {
  modelForms: FormGroup = this.formBuilder.group({
    agentname: ["", ],
    enteredby: [""],
    fromdate: ["", Validators.required],
    todate: ["",Validators.required],
    totalamount: [0],
    dueamount: [0],
    commission: [0],
    additionalInfo: [""]

  });
  constructor(private formBuilder: FormBuilder) {}
}
