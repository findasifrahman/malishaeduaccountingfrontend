import { NgModule } from '@angular/core';
import { FormBuilder, Validators, FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';

export interface nationalityinterface {
  nationality: string,
}
@NgModule({
  imports: [ReactiveFormsModule, FormsModule],
  exports:[]
})
export class nationalitymodels {
  modelForms: FormGroup = this.formBuilder.group({
    nationality: ["", Validators.required],
  });

  constructor(private formBuilder: FormBuilder) {}

}
