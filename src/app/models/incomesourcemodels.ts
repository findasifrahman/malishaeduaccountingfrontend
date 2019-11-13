import { NgModule } from '@angular/core';
import { FormBuilder, Validators, FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';

export interface incomesourceinterface {
  incomesourcename: string,
}
@NgModule({
  imports: [ReactiveFormsModule, FormsModule],
  exports:[]
})
export class incomesourcemodels {
  modelForms: FormGroup = this.formBuilder.group({
    incomesourcename: ["", Validators.required],
  });

  constructor(private formBuilder: FormBuilder) {}

}
