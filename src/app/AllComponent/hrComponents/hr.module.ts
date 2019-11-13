import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'
import { CommonModule } from '@angular/common';
import {  ReactiveFormsModule, FormsModule } from '@angular/forms';
import { payrollmodels } from '../../models/payrollmodels';
const routes: Routes = [
  {
    //path: '',component: AdminlayoutComponent ,children:[]
  }
]
@NgModule({
  declarations:[],
  imports: [CommonModule,FormsModule,//RouterModule.forChild(routes),
   ReactiveFormsModule,payrollmodels],
  exports: []
 })

 export class hrModule{}
