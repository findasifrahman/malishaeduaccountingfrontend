import { NgModule } from '@angular/core';
import { FormBuilder, Validators, FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';

export interface degreeinterface {
  degree: string,
}
@NgModule({
  imports: [ReactiveFormsModule, FormsModule],
  exports:[]
})
export class degreemodels {
  modelForms: FormGroup = this.formBuilder.group({
    degree: ["", Validators.required],
  });

  constructor(private formBuilder: FormBuilder) {}

}
