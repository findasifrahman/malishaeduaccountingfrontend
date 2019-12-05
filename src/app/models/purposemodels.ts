import { NgModule } from '@angular/core';
import { FormBuilder, Validators, FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';

export interface purposeinterface {
  purpose: string,
}
@NgModule({
  imports: [ReactiveFormsModule, FormsModule],
  exports:[]
})
export class purposemodels {
  modelForms: FormGroup = this.formBuilder.group({
    purpose: ["", Validators.required],
  });

  constructor(private formBuilder: FormBuilder) {}

}
