import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavbarRoutingModule } from './navbar-routing.module';
import { NavbarComponent } from './navbar.component';
import { SharedNavComponent } from './shared-nav/shared-nav.component';


@NgModule({
  declarations: [
    NavbarComponent,
    SharedNavComponent
  ],
  imports: [
    CommonModule,
    NavbarRoutingModule
  ],
  exports: [SharedNavComponent] // Export for use in other modules
})
export class NavbarModule { }
