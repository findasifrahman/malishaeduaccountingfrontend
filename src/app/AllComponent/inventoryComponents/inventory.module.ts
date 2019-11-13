import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'

//import {  ReactiveFormsModule, FormsModule } from '@angular/forms';
import { inventorymodels } from '../../models/inventorymodels';
const routes: Routes = [
  {
    //path: '',component: AdminlayoutComponent ,children:[]
  }
]
@NgModule({
  declarations:[],
  imports: [inventorymodels],
  exports: []
 })

 export class inventoryModule{}
