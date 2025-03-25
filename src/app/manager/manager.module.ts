import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagerRoutingModule } from './manager-routing.module';
import { ManagerComponent } from './manager.component';
import { MngViewpageComponent } from './mng-viewpage/mng-viewpage.component';
import { MngLoginComponent } from './mng-login/mng-login.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MngDashboardComponent } from './mng-dashboard/mng-dashboard.component';
import { EmployeeModuleModule } from '../employee-module/employee-module.module';
import { NavbarModule } from '../navbar/navbar.module';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ManagerComponent,
    MngViewpageComponent,
    MngLoginComponent,
    MngDashboardComponent
  ],
  imports: [
    CommonModule,
    ManagerRoutingModule,
    FormsModule,
    RouterModule,
    EmployeeModuleModule,
    NavbarModule,
    ReactiveFormsModule
  ]
})
export class ManagerModule { }

