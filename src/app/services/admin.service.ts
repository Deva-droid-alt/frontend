import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient,HttpHeaders,HttpParams } from '@angular/common/http';
import { catchError,map,tap,throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminService {


  private hardcodedUsername = 'admin@gmail.com';
  private hardcodedPassword = 'Admin123@';
  private hardcodedToken = 'c61ec1aa075d10c4e19d67b5cbc20a8fc7c1f0ba'; // Hardcoded token

private admUrl = 'http://127.0.0.1:8000/api/'; // Ensure the correct API endpoint

  constructor(private http: HttpClient,private router: Router) {}

  /** Login method */
  login(username: string, password: string): Observable<any> {
    return new Observable(observer => {
      if (username === this.hardcodedUsername && password === this.hardcodedPassword) {
        localStorage.setItem('authToken', this.hardcodedToken);
        console.log('Login successful, token stored:', this.hardcodedToken);
        observer.next({ token: this.hardcodedToken });
        observer.complete();
      } else {
        console.error('Login failed: Invalid username or password');
        observer.error(new Error('Invalid username or password'));
      }
    });
  }

  /** Admin logout method */
  logout() {
    localStorage.removeItem('authToken');
    console.log('User logged out');
    this.router.navigate(['/admin/login']);
  }


  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken'); // Get token from localStorage
    if (!token) {
      console.error('Admin token not found.');
      throw new Error('Authentication token is missing.');
    }
  
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Token ${token}` // Some APIs require `Bearer ${token}`
    });
  }

  createEmployee(employeeData: any): Observable<any> {
    return this.http.post(`${this.admUrl}employee_management`, employeeData, { headers: this.getHeaders() });
  }

  createManager(managerData: any): Observable<any> {
    return this.http.post(`${this.admUrl}manager_management`, managerData, { headers: this.getHeaders() });
  }


    // Fetch all travel requests
    getTravelRequests(): Observable<any[]> {
      const token = localStorage.getItem('authToken');  // Assuming the token is stored in localStorage
  
      const headers = new HttpHeaders().set('Authorization', `Token ${token}`);
  
      return this.http.get<any[]>(`${this.admUrl}full-reqs`, { headers });
    }

  // Resubmit a request with the reason
  resubmitRequest(requestId: number, data: { note: string }): Observable<any> {
    const token = localStorage.getItem("authToken"); // Retrieve token from local storage
    if (!token) {
        console.error("❌ No authentication token found!");
        alert("Authentication error! Please log in again.");
        return throwError(() => new Error("Authentication required"));
    }

    const headers = new HttpHeaders({
        "Authorization": `Token ${token}`,  // Attach token
        "Content-Type": "application/json"
    });

    return this.http.post(
        `${this.admUrl}travel-requests/${requestId}/resubmit`,
        data,
        { headers }
    );
}


  // Close a travel request
  closeRequest(requestId: number): Observable<any> {
    return this.http.post(`${this.admUrl}requests/${requestId}/close`, {});
  }

        /** 🔹 Get details of a specific travel request */
  getTravelRequestDetail(requestId: number): Observable<any> {
    return this.http.get(`${this.admUrl}travel-requests/${requestId}/`, { headers: this.getHeaders() });
  }

  filterTravelRequests(filters: any): Observable<any> {
    const params = new HttpParams()
        .set('status', filters.status ? String(filters.status) : '')  // Ensure status is a string
        .set('employee', filters.employee || '')
        .set('from_date', filters.from_date || '')
        .set('to_date', filters.to_date || '')
        .set('sort_by', filters.sort_by || 'date_submitted')  // Default sorting
        .set('order', filters.order || 'desc');

    const url = `http://127.0.0.1:8000/api/view-requests?${params.toString()}`;
    
    return this.http.get(url).pipe(
        catchError((error) => {
            console.error("Error fetching travel requests:", error);
            return throwError(() => new Error('Failed to fetch travel requests'));
        })
    );
}


  

}

