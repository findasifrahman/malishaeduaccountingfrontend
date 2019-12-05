import { NgModule } from '@angular/core';
import { FormBuilder, Validators, FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';

export interface majorinterface {
  major: string,
}
@NgModule({
  imports: [ReactiveFormsModule, FormsModule],
  exports:[]
})
export class majormodels {
  modelForms: FormGroup = this.formBuilder.group({
    major: ["", Validators.required],
  });

  constructor(private formBuilder: FormBuilder) {}

}
