import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient,HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private baseUrl = 'http://127.0.0.1:8000/api/'; // Ensure the correct API endpoint

  constructor(private http: HttpClient) {}

  /** Login method */
  login(username: string, password: string): Observable<any> {
    return this.http.post<{ token: string }>('http://127.0.0.1:8000/api/login/', { username, password }).pipe(
      tap(response => {
        localStorage.setItem('authToken', response.token); // Store token
        // localStorage.setItem('employeeId', response.employeeId);
        console.log('Login successful, token stored:', response.token);
        console.log('Username:', username, 'Password:', password);
      }),
      map(() => true), // Return true on successful login
      catchError((error: any) => {
        console.error('Login failed:', error);
        return throwError(() => new Error('Invalid username or password'));
      })
    );
  }
  

  /** Logout method */
  logout() {
    localStorage.removeItem('authToken');
    console.log('User logged out');
  }

  /** Get token from localStorage */
  private getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  /** 🔹 Generate headers */
  private getHeaders(): HttpHeaders {
    const token = this.getToken();
    if (!token) {
      console.error('User not authenticated');
      return new HttpHeaders();
    }
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Token ${token}`
    });
  }

  /** Create travel request */
  createTravelRequest(requestData: any): Observable<any> {
    const token = this.getToken();
    
    if (!token) {
      console.error('User not authenticated');
      return throwError(() => new Error('User not authenticated'));
    }

    const headers = new HttpHeaders().set('Authorization', `Token ${token}`);

    return this.http.post(`${this.baseUrl}employee/travel_requests_new`, requestData, { headers }).pipe(
      tap(response => console.log('Travel request submitted:', response)),
      catchError((error: any) => {
        console.error('Error submitting request:', error);
        return throwError(() => new Error('Failed to submit request'));
      })
    );
  }

  /** Get logged-in employee's manager */
  getManagerName(): Observable<any> {
    const token = this.getToken();

    if (!token) {
      console.error('User not authenticated');
      return throwError(() => new Error('User not authenticated'));
    }

    const headers = new HttpHeaders().set('Authorization', `Token ${token}`);

    return this.http.get('http://127.0.0.1:8000/api/employee/manager/', { headers }).pipe(
      tap(response => console.log('Manager fetched:', response)),
      catchError((error:any) => {
        console.error('Error fetching manager:', error);
        return throwError(() => new Error('Failed to fetch manager'));
      })
    );
  }

  // Submit Travel Request
  submitTravelRequest(requestData: any): Observable<any> {
    const token = localStorage.getItem('authToken');
    if (!token) {
      console.error('Authentication token is missing.');
      return throwError(() => new Error('Authentication token is missing.'));
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Token ${token}`,
    });

    return this.http.post(`${this.baseUrl}employee/travel_requests_new`, requestData, { headers }).pipe(
      catchError((error) => {
        console.error('Error submitting travel request:', error);
        return throwError(() => new Error('Failed to submit travel request.'));
      })
    );
  }

  // // Fetch travel requests with filters
  // getTravelRequests(status?: string, fromDate?: string, sortBy?: string, order?: string): Observable<any> {
  //   let params = new HttpParams();
    
  //   if (status) params = params.set('status', status);
  //   if (fromDate) params = params.set('from_date', fromDate);
  //   if (sortBy) params = params.set('sort', sortBy);
  //   if (order) params = params.set('order', order);

  //   return this.http.get(`${'http://127.0.0.1:8000/api/view-requests'}filter/`, { params }).pipe(
  //     tap(response => console.log('Travel requests fetched:', response)),
  //     catchError(error => {
  //       console.error('Error fetching travel requests:', error);
  //       return throwError(() => new Error('Failed to fetch travel requests'));
  //     })
  //   );
  // }

  // /** Delete a travel request */
  // deleteTravelRequest(requestId: number): Observable<any> {
  //   return this.http.delete(`${this.baseUrl}edit/${requestId}/`).pipe(
  //     tap(() => console.log(`Travel request ${requestId} deleted`)),
  //     catchError(error => {
  //       console.error(`Error deleting request ${requestId}:`, error);
  //       return throwError(() => new Error('Failed to delete travel request'));
  //     })
  //   );
  // }

  // /** Update a travel request */
  // updateTravelRequest(requestId: number, data: any): Observable<any> {
  //   return this.http.patch(`${this.baseUrl}edit/${requestId}/`, data).pipe(
  //     tap(response => console.log(`Travel request ${requestId} updated:`, response)),
  //     catchError(error => {
  //       console.error(`Error updating request ${requestId}:`, error);
  //       return throwError(() => new Error('Failed to update travel request'));
  //     })
  //   );
  // }

  // deleteRequest(requestId: number): Observable<any> {
  //   return this.http.delete<any>(`${''}/travel-requests/${requestId}`);
  // }


  /** 🔹 Fetch all travel requests */
  getTravelRequests(status?: string, fromDate?: string, sortBy?: string, order?: string): Observable<any[]> {
    let params = new HttpParams();
    
    if (status) params = params.set('status', status);
    if (fromDate) params = params.set('from_date', fromDate);
    if (sortBy) params = params.set('sort', sortBy);
    if (order) params = params.set('order', order);

    return this.http.get<any[]>(`${this.baseUrl}view-requests`, { headers: this.getHeaders(), params }).pipe(
      tap(response => console.log('Travel requests fetched:', response)),
      catchError(error => {
        console.error('Error fetching travel requests:', error);
        return throwError(() => new Error('Failed to fetch travel requests'));
      })
    );
  }

  // /** 🔹 Fetch travel requests with filters */
  // filterTravelRequests(status: string, fromDate?: string): Observable<any[]> {
  //   let params = new HttpParams().set('status', status);
  //   if (fromDate) params = params.set('from_date', fromDate);

  //   return this.http.get<any[]>(`${this.baseUrl}filter-requests/`, { headers: this.getHeaders(), params }).pipe(
  //     tap(response => console.log('Filtered requests:', response)),
  //     catchError(error => {
  //       console.error('Error filtering travel requests:', error);
  //       return throwError(() => new Error('Failed to filter travel requests'));
  //     })
  //   );
  // }

  /** 🔹 Delete a travel request */
  deleteRequest(requestId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}employee/request/${requestId}/delete`, { headers: this.getHeaders() }).pipe(
      tap(() => console.log(`Travel request ${requestId} deleted`)),
      catchError(error => {
        console.error(`Error deleting request ${requestId}:`, error);
        return throwError(() => new Error('Failed to delete travel request'));
      })
    );
  }

  /** 🔹 Update a travel request */
  

  // Fetch employee travel request by ID
  getEmployeeRequestById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/travel-requests/${id}/`);
  }

  updateEmployeeRequest(requestId: number, updatedData: any): Observable<any> {
    return this.http.put(`${this.baseUrl}edit-travel-request/${requestId}/`, updatedData, { headers: this.getHeaders() })
      .pipe(
        tap(response => console.log(`Travel request ${requestId} updated:`, response)),
        catchError(error => {
          console.error(`Error updating request ${requestId}:`, error);
          return throwError(() => new Error('Failed to update travel request'));
        })
      );
  }
  
  getRequest(requestId: number): Observable<any> {
    const token = this.getToken();
    if (!token) return throwError(() => new Error('User not authenticated'));
  
    return this.http.get(`${this.baseUrl}employee/request/${requestId}`, { headers: this.getHeaders() }).pipe(
      tap(response => console.log('Request fetched:', response)),
      catchError(error => {
        console.error('Error fetching request:', error);
        return throwError(() => error);
      })
    );
  }
  


  getEmployeeDetails(): Observable<any> {
    const token = this.getToken();
  
    if (!token) {
      console.error('User not authenticated');
      return throwError(() => new Error('User not authenticated'));
    }
  
    const headers = new HttpHeaders().set('Authorization', `Token ${token}`);
  
    return this.http.get(`${this.baseUrl}get-employee-name`, { headers }).pipe(
      tap(response => console.log('Employee details fetched:', response)),
      catchError(error => {
        console.error('Error fetching employee details:', error);
        return throwError(() => new Error('Failed to fetch employee details'));
      })
    );
  }

  updateresubmission(requestId: number, updatedData: any): Observable<any> {
    const token = this.getToken();
  
    if (!token) {
      console.error('User not authenticated');
      return throwError(() => new Error('User not authenticated'));
    }
  
    const headers = new HttpHeaders().set('Authorization', `Token ${token}`); 

    const url = `${this.baseUrl}update-request/${requestId}/`; // Ensure the endpoint matches your backend
    return this.http.put(url, updatedData,{ headers });
  }
  

}
  


