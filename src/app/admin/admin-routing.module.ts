import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdnDashboardComponent } from './adn-dashboard/adn-dashboard.component';
import { AdminViewRqComponent } from './admin-view-rq/admin-view-rq.component';

const routes: Routes = [{ path: 'ad-dashboard', component: AdnDashboardComponent },
  { path: 'login', component: AdminLoginComponent },
  { path: 'view-trvl', component: AdminViewRqComponent }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
