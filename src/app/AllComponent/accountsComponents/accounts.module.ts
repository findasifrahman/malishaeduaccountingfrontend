import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'
import { CommonModule } from '@angular/common';
import {  ReactiveFormsModule, FormsModule } from '@angular/forms';
import { salesVouchermodels } from '../../models/salesvouchermodels';
import { salesrecieptmodels } from '../../models/salesrecieptmodels';
import { salescommissionmodels } from '../../models/salescommissionmodels';
import { purchasemodels } from '../../models/purchasemodels'
import { salesReturnmodels } from '../../models/salesreturnmodels'
const routes: Routes = [
  {
    //path: '',component: AdminlayoutComponent ,children:[]
  }
]
@NgModule({
  declarations:[],
  imports: [CommonModule,FormsModule,//RouterModule.forChild(routes),
   ReactiveFormsModule, salesVouchermodels, purchasemodels, salescommissionmodels,salesrecieptmodels,salesReturnmodels],
  exports: []
 })

 export class accountsModule{}
