import { NgModule } from '@angular/core';
import { FormBuilder, Validators, FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';

export interface inventoryiteminterface {
  inventoryitemname: string,
}
@NgModule({
  imports: [ReactiveFormsModule, FormsModule],
  exports:[]
})
export class inventoryitemmodels {
  modelForms: FormGroup = this.formBuilder.group({
    inventoryitemname: ["", Validators.required],
  });
  constructor(private formBuilder: FormBuilder) {}
}
