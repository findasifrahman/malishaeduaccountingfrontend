import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'
import { CommonModule } from '@angular/common';
import {  ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SharedmodulesModule } from '../../commonmodule/sharedmodule/sharedmodules.module';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

import { companymodels } from '../../models/companymodels';
import { employeemodelsform } from '../../models/employeemodels';
import { rolemodels } from '../../models/rolemodels';
import { incomesourcemodels} from '../../models/incomesourcemodels';
import { officialexpendituremodels } from '../../models/officialexpendituremodels';
import { inventoryitemmodels } from '../../models/inventoryitemmodels';
import { clientmodels } from '../../models/clientmodels';
import { clientgroupmodels} from '../../models/clientgroupmodels';
import { purposemodels } from '../../models/purposemodels'
import { majormodels } from '../../models/majormodels'
import { nationalitymodels } from '../../models/nationalitymodels'
import { universitymodels } from '../../models/universitymodels'
import { degreemodels } from '../../models/degreemodels'
import { SharedComponentmoduleModule } from '../../sharedComponentModule/shared-componentmodule.module';
import { AdminlayoutComponent } from '../../commonLayout/adminlayout/adminlayout.component';

const routes: Routes = [
  {
    path: '',component: AdminlayoutComponent ,children:[
    ]
  }
]
@NgModule({
  declarations:[],
  imports: [CommonModule,FormsModule,//RouterModule.forChild(routes),
   ReactiveFormsModule,HttpClientModule,SharedmodulesModule,companymodels,employeemodelsform,inventoryitemmodels,
   majormodels,nationalitymodels,universitymodels,degreemodels,
   rolemodels,incomesourcemodels,clientgroupmodels,purposemodels,officialexpendituremodels,CKEditorModule,clientmodels,
   SharedComponentmoduleModule],
  exports: []
 })

 export class settingsComponentModule{}
