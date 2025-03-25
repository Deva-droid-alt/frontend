import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrl: './welcome-page.component.css'
})
export class WelcomePageComponent {
  constructor(private router: Router) {}

  navigateTo(route: string) {
    this.router.navigate([route]);
  }

}

// Ill give the the html code for each one 
// i have navbar1 , emp-table , view-modal and emp-filter components 
// all these selectors are given as self closing tags in recent-requests.
// So when recent requests is called you get everything inside it