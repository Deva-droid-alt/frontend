import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar1',
  templateUrl: './navbar1.component.html',
  styleUrl: './navbar1.component.css'
})
export class Navbar1Component {
  constructor(private router: Router) {}

  goBack() {
    this.router.navigate(['/welcome']); // Update with your correct route
  }

  logout() {
    alert('Logging out...');
    this.router.navigate(['/user-selection']); // Redirect to login page
  }

}
