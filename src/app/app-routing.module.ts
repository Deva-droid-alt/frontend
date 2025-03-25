import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginSelectionComponent } from './login-selection/login-selection.component';


const routes: Routes = [
  { path: '', redirectTo: 'user-selection', pathMatch: 'full' }, // Redirect root to Login Selection
  { path: 'user-selection', component: LoginSelectionComponent }, // First page (Login Selection)
  { 
    path: 'employee',  
    loadChildren: () => import('./employee-module/employee-module.module').then(m => m.EmployeeModuleModule) 
  },
  { path: 'manager', loadChildren: () => import('./manager/manager.module').then(m => m.ManagerModule) },
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },
  { path: 'navbar', loadChildren: () => import('./navbar/navbar.module').then(m => m.NavbarModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
