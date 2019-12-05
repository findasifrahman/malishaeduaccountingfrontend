import { NgModule } from '@angular/core';
import { FormBuilder, Validators, FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';

export interface universityinterface {
  university: string,
}
@NgModule({
  imports: [ReactiveFormsModule, FormsModule],
  exports:[]
})
export class universitymodels {
  modelForms: FormGroup = this.formBuilder.group({
    university: ["", Validators.required],
  });

  constructor(private formBuilder: FormBuilder) {}

}
