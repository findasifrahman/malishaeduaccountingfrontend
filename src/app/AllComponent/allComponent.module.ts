import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'
import { CommonModule } from '@angular/common';
import {  ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { HomeComponent} from './home/home.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { RoleGuard } from '../auth/role.guard';
import { AuthGuard } from '../auth/auth.guard';

import { SharedmodulesModule } from '../commonmodule/sharedmodule/sharedmodules.module';
//import { SharedComponentmoduleModule } from '../sharedComponentModule/shared-componentmodule.module';
import { SharedComponentmoduleModule  } from '../sharedComponentModule/shared-componentmodule.module';

import {settingsComponentModule} from './settingsComponents/settingsComponents.module';
import { inventoryModule } from './inventoryComponents/inventory.module';
import { hrModule } from './hrComponents/hr.module';
import { accountsModule } from './accountsComponents/accounts.module';
import { officeCostModule } from './officecostComponent/office-cost.module'


import { AdminlayoutComponent } from '../commonLayout/adminlayout/adminlayout.component';

import { WithoutSidebarlayoutComponent } from '../commonLayout/withoutSidebarlayout/without-sidebarlayout/without-sidebarlayout.component';

import { CompanyEditComponent } from './settingsComponents/NewCompany/company-edit/company-edit.component';
import { CompanyAddComponent } from './settingsComponents/NewCompany/company-add/company-add.component';
import { CompanyListComponent } from './settingsComponents/NewCompany/company-list/company-list.component';
import { EmployeeListComponent } from './settingsComponents/NewEmployee/employee-list/employee-list.component';
import { EmployeeEditComponent } from './settingsComponents/NewEmployee/employee-edit/employee-edit.component';
import { EmployeeAddComponent } from './settingsComponents/NewEmployee/employee-add/employee-add.component';
import { RoleAddComponent } from './settingsComponents/NewRole/role-add/role-add.component';
import { RoleListComponent } from './settingsComponents/NewRole/role-list/role-list.component';
import { IncoomeSourceAddComponent } from './settingsComponents/NewIncomeSource/incoome-source-add/incoome-source-add.component';
import { IncoomeSourceEditComponent } from './settingsComponents/NewIncomeSource/incoome-source-edit/incoome-source-edit.component';
import { IncoomeSourceListComponent } from './settingsComponents/NewIncomeSource/incoome-source-list/incoome-source-list.component';
import { OfficialExpenditureAddComponent } from './settingsComponents/NewOfficialExpenditure/official-expenditure-add/official-expenditure-add.component';
import { OfficialExpenditureListComponent } from './settingsComponents/NewOfficialExpenditure/official-expenditure-list/official-expenditure-list.component';
import { InventoryItemAddComponent } from './settingsComponents/NewInventoryItem/inventory-item-add/inventory-item-add.component';
import { InventoryItemListComponent } from './settingsComponents/NewInventoryItem/inventory-item-list/inventory-item-list.component';

import { InventoryAddComponent } from './inventoryComponents/newInventory/inventory-add/inventory-add.component';
import { InventoryEditComponent } from './inventoryComponents/newInventory/inventory-edit/inventory-edit.component';
import { InventoryListComponent } from './inventoryComponents/newInventory/inventory-list/inventory-list.component';
import { PayrollListComponent } from './hrComponents/newPayroll/payroll-list/payroll-list.component';
import { PayrollAddComponent } from './hrComponents/newPayroll/payroll-add/payroll-add.component';
import { PayrollEditComponent } from './hrComponents/newPayroll/payroll-edit/payroll-edit.component';
import { SalesVoucherAddComponent } from './accountsComponents/newSalesVoucher/sales-voucher-add/sales-voucher-add.component';
import { SalesVoucherEditComponent } from './accountsComponents/newSalesVoucher/sales-voucher-edit/sales-voucher-edit.component';
import { SalesVoucherListComponent } from './accountsComponents/newSalesVoucher/sales-voucher-list/sales-voucher-list.component';

import { ClientAddComponent } from './settingsComponents/NewClient/client-add/client-add.component';
import { ClientEditComponent } from './settingsComponents/NewClient/client-edit/client-edit.component';
import { ClientListComponent } from './settingsComponents/NewClient/client-list/client-list.component';
import { PurchaseAddComponent } from './accountsComponents/newPurchase/purchase-add/purchase-add.component';
import { PurchaseEditComponent } from './accountsComponents/newPurchase/purchase-edit/purchase-edit.component';
import { PurchaseListComponent } from './accountsComponents/newPurchase/purchase-list/purchase-list.component';

import { SummeryReportComponent } from './reports/summery-report/summery-report.component';
import { DashboarCompComponent } from './reports/dashboar-comp/dashboar-comp.component';
import { OfficeCostAddComponent } from './officecostComponent/office-cost-add/office-cost-add.component';
import { OfficeCostEditComponent } from './officecostComponent/office-cost-edit/office-cost-edit.component';
import { OfficeCostListComponent } from './officecostComponent/office-cost-list/office-cost-list.component';
import { ClientGroupAddComponent } from './settingsComponents/NewClientGroup/client-group-add/client-group-add.component';
import { ClientGroupEditComponent } from './settingsComponents/NewClientGroup/client-group-edit/client-group-edit.component';
import { ClientGroupListComponent } from './settingsComponents/NewClientGroup/client-group-list/client-group-list.component';
import { PurposeListComponent } from './settingsComponents/NewPurpose/purpose-list/purpose-list.component';
import { PurposeAddComponent } from './settingsComponents/NewPurpose/purpose-add/purpose-add.component';
import { PurposeEditComponent } from './settingsComponents/NewPurpose/purpose-edit/purpose-edit.component';
import { SalesCommissionEditComponent } from './accountsComponents/newSalesCommission/sales-commission-edit/sales-commission-edit.component';
import { SalesCommissionAddComponent } from './accountsComponents/newSalesCommission/sales-commission-add/sales-commission-add.component';
import { SalesCommissionListComponent } from './accountsComponents/newSalesCommission/sales-commission-list/sales-commission-list.component';
import { SalesRecieptAddComponent } from './accountsComponents/newSalesReciept/sales-reciept-add/sales-reciept-add.component';
import { SalesRecieptEditComponent } from './accountsComponents/newSalesReciept/sales-reciept-edit/sales-reciept-edit.component';
import { SalesRecieptListComponent } from './accountsComponents/newSalesReciept/sales-reciept-list/sales-reciept-list.component';
import { salesrecieptmodels } from '../models/salesrecieptmodels';
import { MajorAddComponent } from './settingsComponents/NewMajor/major-add/major-add.component';
import { MajorListComponent } from './settingsComponents/NewMajor/major-list/major-list.component';
import { NationalityAddComponent } from './settingsComponents/NewNationality/nationality-add/nationality-add.component';
import { NationalityListComponent } from './settingsComponents/NewNationality/nationality-list/nationality-list.component';
import { UniversityListComponent } from './settingsComponents/NewUniversity/university-list/university-list.component';
import { UniversityAddComponent } from './settingsComponents/NewUniversity/university-add/university-add.component';
import { SalesTableComponent } from './reports/tables/sales-table/sales-table.component';
import { DegreeListComponent } from './settingsComponents/NewDegree/degree-list/degree-list.component';
import { DegreeAddComponent } from './settingsComponents/NewDegree/degree-add/degree-add.component';
import { SalesReturnAddComponent } from './accountsComponents/newSalesReturn/sales-return-add/sales-return-add.component';
import { SalesReturnEditComponent } from './accountsComponents/newSalesReturn/sales-return-edit/sales-return-edit.component';
import { SalesReturnListComponent } from './accountsComponents/newSalesReturn/sales-return-list/sales-return-list.component';

const routes: Routes = [

  { path: '', redirectTo: 'login', pathMatch: 'full'
  },
  { path: '',component: AdminlayoutComponent ,children:[
    { path: 'home', component: HomeComponent,
    },
    { path: '', //loadChildren: './settingsComponents/settingsComponents.module#settingsComponentModule'
    children:[
      { path: 'company/add', component: CompanyAddComponent,canActivate: [RoleGuard],
          data: {
            expectedRole: ['admin','accounts','hr']
          }
      },
      { path: 'company/edit/:id', component: CompanyEditComponent,canActivate: [RoleGuard],
          data: {
            expectedRole: ['admin']
          }},
      { path: 'company/list', component: CompanyListComponent,canActivate: [RoleGuard],
          data: {
            expectedRole: ['admin','accounts','hr','counselor']
          }},
      { path: 'employee/add', component: EmployeeAddComponent,canActivate: [RoleGuard],
      data: {
        expectedRole: ['admin']
      }},
      { path: 'employee/edit/:id', component: EmployeeEditComponent,canActivate: [RoleGuard],
      data: {
        expectedRole: ['admin']
      }},
      { path: 'employee/list', component: EmployeeListComponent,canActivate: [RoleGuard],
      data: {
        expectedRole: ['admin']
      }},
      { path: 'role/list', component: RoleListComponent},
      { path: 'role/add', component: RoleAddComponent},
      { path: 'incomesource/add', component: IncoomeSourceAddComponent,canActivate: [RoleGuard],
      data: {
        expectedRole: ['admin','accounts','hr']
      }},
      { path: 'incomesource/list', component: IncoomeSourceListComponent,canActivate: [RoleGuard],
      data: {
        expectedRole: ['admin','accounts','hr']
      }},
      { path: 'officialexpenditure/add', component: OfficialExpenditureAddComponent,canActivate: [RoleGuard],
      data: {
        expectedRole: ['admin','accounts','hr']
      }},
      { path: 'officialexpenditure/list', component: OfficialExpenditureListComponent,canActivate: [RoleGuard],
      data: {
        expectedRole: ['admin','accounts','hr']
      }},
      { path: 'inventoryitem/add', component: InventoryItemAddComponent,canActivate: [RoleGuard],
      data: {
        expectedRole: ['admin','accounts','hr']
      }},
      { path: 'inventoryitem/list', component: InventoryItemListComponent,canActivate: [RoleGuard],
      data: {
        expectedRole: ['admin','accounts','hr']
      }},

      { path: 'inventory/add', component: InventoryAddComponent,canActivate: [RoleGuard],
      data: {
        expectedRole: ['admin','hr']
      }},
      { path: 'inventory/list', component: InventoryListComponent,canActivate: [RoleGuard],
      data: {
        expectedRole: ['admin','hr']
      }},
      { path: 'inventory/edit/:id', component: InventoryEditComponent,canActivate: [RoleGuard],
      data: {
        expectedRole: ['admin','hr']
      }},
      { path: 'payroll/add', component: PayrollAddComponent,canActivate: [RoleGuard],
      data: {
        expectedRole: ['admin','accounts']
      }},
      { path: 'payroll/list', component: PayrollListComponent,canActivate: [RoleGuard],
      data: {
        expectedRole: ['admin','accounts']
      }},
      { path: 'payroll/edit/:id', component: PayrollEditComponent,canActivate: [RoleGuard],
      data: {
        expectedRole: ['admin','accounts']
      }},
      { path: 'salesVoucher/add', component: SalesVoucherAddComponent,canActivate: [RoleGuard],
      data: {
        expectedRole: ['admin','accounts']
      }},
      { path: 'salesVoucher/list', component: SalesVoucherListComponent,canActivate: [RoleGuard],
      data: {
        expectedRole: ['admin']
      }},
      { path: 'salesVoucher/edit/:id', component: SalesVoucherEditComponent,canActivate: [RoleGuard],
      data: {
        expectedRole: ['admin','accounts']
      }},

      { path: 'salesreciept/add', component: SalesRecieptAddComponent,canActivate: [RoleGuard],
      data: {
        expectedRole: ['admin','accounts']
      }},
      { path: 'salesreciept/list', component: SalesRecieptListComponent,canActivate: [RoleGuard],
      data: {
        expectedRole: ['admin']
      }},
      { path: 'salesreciept/edit/:id', component: SalesRecieptEditComponent,canActivate: [RoleGuard],
      data: {
        expectedRole: ['admin','accounts']
      }},


      { path: 'clientgroup/add', component: ClientGroupAddComponent,canActivate: [RoleGuard],
      data: {
        expectedRole: ['admin','accounts']
      }},
      { path: 'clientgroup/edit/:id', component: ClientGroupEditComponent,canActivate: [RoleGuard],
      data: {
        expectedRole: ['admin','accounts']
      }},
      { path: 'clientgroup/list', component: ClientGroupListComponent,canActivate: [RoleGuard],
      data: {
        expectedRole: ['admin','accounts']
      }},
      { path: 'client/add', component: ClientAddComponent,canActivate: [RoleGuard],
      data: {
        expectedRole: ['admin','accounts']
      }},
      { path: 'client/list', component: ClientListComponent,canActivate: [RoleGuard],
      data: {
        expectedRole: ['admin','accounts']
      }},
      { path: 'client/edit/:id', component: ClientEditComponent,canActivate: [RoleGuard],
      data: {
        expectedRole: ['admin','accounts']
      }},

      { path: 'purchase/add', component: PurchaseAddComponent,canActivate: [RoleGuard],
      data: {
        expectedRole: ['admin','accounts']
      }},
      { path: 'purchase/list', component: PurchaseListComponent,canActivate: [RoleGuard],
      data: {
        expectedRole: ['admin','accounts']
      }},
      { path: 'purchase/edit/:id', component: PurchaseEditComponent,canActivate: [RoleGuard],
      data: {
        expectedRole: ['admin','accounts']
      }},

      { path: 'summeryReport', component: SummeryReportComponent,canActivate: [RoleGuard],
      data: {
        expectedRole: ['admin','counselor']
      }},

      { path: 'officecost/add', component: OfficeCostAddComponent,canActivate: [RoleGuard],
      data: {
        expectedRole: ['admin','hr']
      }},
      { path: 'officecost/list', component: OfficeCostListComponent,canActivate: [RoleGuard],
      data: {
        expectedRole: ['admin','hr']
      }},
      { path: 'officecost/edit/:id', component: OfficeCostEditComponent,canActivate: [RoleGuard],
      data: {
        expectedRole: ['admin','hr']
      }},

      { path: 'purpose/add', component: PurposeAddComponent,canActivate: [RoleGuard],
      data: {
        expectedRole: ['admin']
      }},
      { path: 'purpose/list', component: PurposeListComponent,canActivate: [RoleGuard],
      data: {
        expectedRole: ['admin']
      }},
      { path: 'purpose/edit/:id', component: PurposeEditComponent,canActivate: [RoleGuard],
      data: {
        expectedRole: ['admin']
      }},
      { path: 'salescommission/add', component: SalesCommissionAddComponent,canActivate: [RoleGuard],
      data: {
        expectedRole: ['admin']
      }},
      { path: 'salescommission/list', component: SalesCommissionListComponent,canActivate: [RoleGuard],
      data: {
        expectedRole: ['admin']
      }},
      { path: 'salescommission/edit/:id', component: SalesCommissionEditComponent,canActivate: [RoleGuard],
      data: {
        expectedRole: ['admin']
      }},

      { path: 'salesreturn/add', component: SalesReturnAddComponent,canActivate: [RoleGuard],
      data: {
        expectedRole: ['admin']
      }},
      { path: 'salesreturn/list', component: SalesReturnListComponent,canActivate: [RoleGuard],
      data: {
        expectedRole: ['admin']
      }},
      { path: 'salesreturn/edit/:id', component: SalesReturnEditComponent,canActivate: [RoleGuard],
      data: {
        expectedRole: ['admin']
      }},
      { path: 'major/add', component: MajorAddComponent,canActivate: [RoleGuard],
      data: {
        expectedRole: ['admin']
      }},
      { path: 'major/list', component: MajorListComponent,canActivate: [RoleGuard],
      data: {
        expectedRole: ['admin']
      }},
      { path: 'nationality/add', component: NationalityAddComponent,canActivate: [RoleGuard],
      data: {
        expectedRole: ['admin']
      }},
      { path: 'nationality/list', component: NationalityListComponent,canActivate: [RoleGuard],
      data: {
        expectedRole: ['admin']
      }},
      { path: 'university/add', component: UniversityAddComponent,canActivate: [RoleGuard],
      data: {
        expectedRole: ['admin']
      }},
      { path: 'university/list', component: UniversityListComponent,canActivate: [RoleGuard],
      data: {
        expectedRole: ['admin']
      }},
      { path: 'degree/add', component: DegreeAddComponent,canActivate: [RoleGuard],
      data: {
        expectedRole: ['admin']
      }},
      { path: 'degree/list', component: DegreeListComponent,canActivate: [RoleGuard],
      data: {
        expectedRole: ['admin']
      }},
      ]
    },
    ]
  }
]

@NgModule({
 declarations:[AdminlayoutComponent,WithoutSidebarlayoutComponent,HomeComponent,
    EmployeeListComponent,EmployeeEditComponent, EmployeeAddComponent,CompanyEditComponent, CompanyAddComponent, CompanyListComponent
    ,RoleAddComponent, RoleListComponent, IncoomeSourceAddComponent, IncoomeSourceEditComponent, IncoomeSourceListComponent,
    OfficialExpenditureAddComponent, OfficialExpenditureListComponent, InventoryItemAddComponent, InventoryItemListComponent,
    InventoryAddComponent, InventoryEditComponent, InventoryListComponent,
    PayrollListComponent, PayrollAddComponent, PayrollEditComponent,
    SalesVoucherAddComponent, SalesVoucherEditComponent, SalesVoucherListComponent,
    ClientAddComponent, ClientEditComponent, ClientListComponent,
    PurchaseAddComponent, PurchaseEditComponent, PurchaseListComponent, SummeryReportComponent, DashboarCompComponent,
    OfficeCostAddComponent, OfficeCostEditComponent, OfficeCostListComponent, ClientGroupAddComponent, ClientGroupEditComponent, ClientGroupListComponent,
    PurposeListComponent, PurposeAddComponent, PurposeEditComponent, SalesCommissionEditComponent, SalesCommissionAddComponent, SalesCommissionListComponent,
    SalesRecieptAddComponent, SalesRecieptEditComponent, SalesRecieptListComponent,
    MajorAddComponent, MajorListComponent, NationalityAddComponent, NationalityListComponent, UniversityListComponent, UniversityAddComponent, SalesTableComponent,
    DegreeListComponent, DegreeAddComponent, SalesReturnAddComponent, SalesReturnEditComponent, SalesReturnListComponent],

  imports: [CommonModule,FormsModule,RouterModule.forChild(routes),SharedComponentmoduleModule,
    ReactiveFormsModule,HttpClientModule,CKEditorModule,SharedmodulesModule,
    settingsComponentModule,inventoryModule,hrModule,accountsModule,officeCostModule],

  exports: [AdminlayoutComponent,WithoutSidebarlayoutComponent,HomeComponent,// LoginComponent,LogoutComponent,
  EmployeeListComponent,EmployeeEditComponent, EmployeeAddComponent,CompanyEditComponent,
  CompanyAddComponent, CompanyListComponent,RoleAddComponent, RoleListComponent,
  IncoomeSourceAddComponent, IncoomeSourceEditComponent, IncoomeSourceListComponent,
  OfficialExpenditureAddComponent, OfficialExpenditureListComponent,InventoryItemAddComponent, InventoryItemListComponent,
  InventoryAddComponent, InventoryEditComponent, InventoryListComponent,
  PayrollListComponent, PayrollAddComponent, PayrollEditComponent,
  SalesVoucherAddComponent, SalesVoucherEditComponent, SalesVoucherListComponent,
  ClientAddComponent, ClientEditComponent, ClientListComponent,
  PurchaseAddComponent, PurchaseEditComponent, PurchaseListComponent, SummeryReportComponent, DashboarCompComponent,
  OfficeCostAddComponent, OfficeCostEditComponent, OfficeCostListComponent,
  ClientGroupAddComponent, ClientGroupEditComponent, ClientGroupListComponent,
  PurposeListComponent, PurposeAddComponent, PurposeEditComponent, SalesCommissionEditComponent, SalesCommissionAddComponent, SalesCommissionListComponent,
  SalesRecieptAddComponent, SalesRecieptEditComponent, SalesRecieptListComponent,
  MajorAddComponent, MajorListComponent, NationalityAddComponent, NationalityListComponent, UniversityListComponent, UniversityAddComponent,
  DegreeListComponent, DegreeAddComponent, SalesReturnAddComponent, SalesReturnEditComponent, SalesReturnListComponent],
 providers: [AuthGuard,RoleGuard]

})

export class allComponentModule{}
