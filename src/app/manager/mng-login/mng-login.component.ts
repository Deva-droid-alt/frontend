import { Component } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-mng-login',
  templateUrl: './mng-login.component.html',
  styleUrl: './mng-login.component.css'
})
export class MngLoginComponent {

  username = '';
    password = '';
  
  
    constructor(private employeeService: EmployeeService, private router: Router) {}
  
    onLogin() {  // Call service function
      this.employeeService.login(this.username, this.password).subscribe({
        next: (success) => {
          if (success) {
            console.log('Redirecting to travel request form');
            this.router.navigate(['/dashboard']); // Redirect to Travel Request Page
          }
        },
        error: (error) => {
          console.error('Login failed:', error); //  Correct placement
          alert(error.message);
        }
      });
    }

}
