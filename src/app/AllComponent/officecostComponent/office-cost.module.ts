import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'

//import {  ReactiveFormsModule, FormsModule } from '@angular/forms';
import { officecostmodels } from '../../models/officecostmodels';
const routes: Routes = [
  {
    //path: '',component: AdminlayoutComponent ,children:[]
  }
]
@NgModule({
  declarations:[],
  imports: [officecostmodels],
  exports: []
 })

 export class officeCostModule{}
