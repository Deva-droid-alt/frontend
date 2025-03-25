import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { ReactiveFormsModule } from '@angular/forms';
import { EmployeeModuleRoutingModule } from './employee-module-routing.module';
import { EmployeeModuleComponent } from './employee-module.component';
import { EmployeeLoginComponent } from './employeelogin/employeelogin.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { NewRequestsComponent } from './new-requests/new-requests.component';
import { Navbar1Component } from './navbar1/navbar1.component';
import { RequestFormComponent } from './request-form/request-form.component';
import { RecentRequestsComponent } from './recent-requests/recent-requests.component';
import { FormsModule } from '@angular/forms';
import { EmpviewpageComponent } from './empviewpage/empviewpage.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [  
    EmployeeModuleComponent,
    EmployeeLoginComponent,
    WelcomePageComponent,
    NewRequestsComponent,
    Navbar1Component,
    RequestFormComponent,
    RecentRequestsComponent,
    EmpviewpageComponent,
  ],
  imports: [
    CommonModule,
    EmployeeModuleRoutingModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule
  ],
  exports: [Navbar1Component]
})
export class EmployeeModuleModule {}
