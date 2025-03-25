import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-employeelogin',
  templateUrl: './employeelogin.component.html',
  styleUrls: ['./employeelogin.component.css']
})
export class EmployeeLoginComponent {
  username = '';
  password = '';


  constructor(private employeeService: EmployeeService, private router: Router) {}

  onLogin() {  // Call service function
    this.employeeService.login(this.username, this.password).subscribe({
      next: (success) => {
        if (success) {
          console.log('Redirecting to travel request');
          this.router.navigate(['/welcome']); // Redirect to Welcome Travel Request Page
        }
      },
      error: (error) => {
        console.error('Login failed:', error); //  Correct placement
        alert(error.message);
      }
    });
  }

  
}
