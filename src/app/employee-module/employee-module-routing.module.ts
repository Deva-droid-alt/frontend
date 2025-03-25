import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeLoginComponent } from './employeelogin/employeelogin.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { NewRequestsComponent } from './new-requests/new-requests.component';
import { RecentRequestsComponent } from './recent-requests/recent-requests.component';

const routes: Routes = [
  { path: 'login', component: EmployeeLoginComponent },
  { path: 'welcome', component: WelcomePageComponent },
  { path: 'new-requests', component: NewRequestsComponent },
  { path: 'recent-requests', component: RecentRequestsComponent }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmployeeModuleRoutingModule {}
