import { Component } from '@angular/core';
import { Router} from '@angular/router';

@Component({
  selector: 'app-shared-nav',
  templateUrl: './shared-nav.component.html',
  styleUrl: './shared-nav.component.css'
})
export class SharedNavComponent {
   constructor(private router: Router) {}
  
    goBack() {
      this.router.navigate(['/welcome']); // Update with your correct route
    }
  
    logout() {
      alert('Logging out...');
      this.router.navigate(['/user-selection']); // Redirect to login page
    }

}
