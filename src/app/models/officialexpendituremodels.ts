import { NgModule } from '@angular/core';
import { FormBuilder, Validators, FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';

export interface officialexpenditureinterface {
  officialexpendituretype: string,
}
@NgModule({
  imports: [ReactiveFormsModule, FormsModule],
  exports:[]
})
export class officialexpendituremodels {
  modelForms: FormGroup = this.formBuilder.group({
    officialexpendituretype: ["", Validators.required],
  });
  constructor(private formBuilder: FormBuilder) {}
}
