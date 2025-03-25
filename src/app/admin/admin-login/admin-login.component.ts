import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.css'
})
export class AdminLoginComponent {
  username = '';
    password = '';
  
  
    constructor(private adminService: AdminService, private router: Router) {}
  // onLogin() {  // Call service function
  //   this.adminService.login(this.username, this.password).subscribe({
  //     next: (success) => {
  //       if (success) {
  //         console.log('Redirecting to travel request');
  //         this.router.navigate(['/***********']); // Redirect to Welcome Travel Request Page
  //       }
  //     },
  //     error: (error) => {
  //       console.error('Login failed:', error); //  Correct placement
  //       alert(error.message);
  //     }
  //   });
  // }

  onLogin() {  
    this.adminService.login(this.username, this.password).subscribe({
      next: (response) => {
        if (response) {
          console.log('Login successful, token stored:', response.token);
          this.router.navigate(['/admin/ad-dashboard']); // Redirect to Admin Dashboard
        }
      },
      error: (error) => {
        console.error('Login failed:', error);
        alert('Invalid username or password');
      }
    });
  }

  logout() {
    this.adminService.logout();
  }




}
