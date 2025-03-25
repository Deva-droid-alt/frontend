import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginSelectionComponent } from './login-selection/login-selection.component';
// import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { EmployeeModuleModule } from './employee-module/employee-module.module';
import { RouterModule } from '@angular/router';
import { ManagerModule } from './manager/manager.module';


@NgModule({
  declarations: [
    AppComponent,
    LoginSelectionComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // FormsModule,
    HttpClientModule,
    EmployeeModuleModule,
    RouterModule,
    ManagerModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
