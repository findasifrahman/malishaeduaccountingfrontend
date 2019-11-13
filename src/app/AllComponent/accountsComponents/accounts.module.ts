import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'
import { CommonModule } from '@angular/common';
import {  ReactiveFormsModule, FormsModule } from '@angular/forms';
import { salesVouchermodels } from '../../models/salesvouchermodels';
import { purchasemodels } from '../../models/purchasemodels'
const routes: Routes = [
  {
    //path: '',component: AdminlayoutComponent ,children:[]
  }
]
@NgModule({
  declarations:[],
  imports: [CommonModule,FormsModule,//RouterModule.forChild(routes),
   ReactiveFormsModule, salesVouchermodels, purchasemodels],
  exports: []
 })

 export class accountsModule{}
