import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManagerComponent } from './manager.component';
import { MngLoginComponent } from './mng-login/mng-login.component';
import { MngViewpageComponent } from './mng-viewpage/mng-viewpage.component';
import { MngDashboardComponent } from './mng-dashboard/mng-dashboard.component';

const routes: Routes = [{ path: 'dashboard', component: MngDashboardComponent },
  { path: 'login', component:MngLoginComponent},
  { path: 'view-rq', component: MngViewpageComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagerRoutingModule { }
