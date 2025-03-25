import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { AdnDashboardComponent } from './adn-dashboard/adn-dashboard.component';
import { AdminViewRqComponent } from './admin-view-rq/admin-view-rq.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { FormsModule } from '@angular/forms';
import { NavbarModule } from '../navbar/navbar.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AdminComponent,
    AdnDashboardComponent,
    AdminViewRqComponent,
    AdminLoginComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    NavbarModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }
