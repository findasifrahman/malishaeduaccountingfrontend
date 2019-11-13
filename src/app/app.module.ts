import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Routes, RouterModule } from '@angular/router';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import 'hammerjs';

import { LoginComponent } from './AllComponent/login/login.component';
import { LogoutComponent } from './AllComponent/logout/logout.component';

import {  ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedmodulesModule } from './commonmodule/sharedmodule/sharedmodules.module';
//import { SharedComponentmoduleModule } from '../sharedComponentModule/shared-componentmodule.module';
import { SharedComponentmoduleModule  } from './sharedComponentModule/shared-componentmodule.module';
@NgModule({
  declarations: [
    AppComponent, LoginComponent, LogoutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,ReactiveFormsModule, FormsModule,SharedmodulesModule,
    SharedComponentmoduleModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
