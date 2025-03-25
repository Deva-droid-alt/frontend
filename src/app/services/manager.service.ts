import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient,HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ManagerService {

  constructor(private http: HttpClient) { }

  private baseUrl = 'http://127.0.0.1:8000/api/'; // Ensure the correct API endpoint

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
        /** 🔹 Get details of a specific travel request */
  getTravelRequestDetail(requestId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}travel-requests/${requestId}/`, { headers: this.getHeaders() });
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

  // Fetch employee travel request by ID
  getEmployeeRequestById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/travel-requests/${id}/`);
  }

  
  
  get_request(request_id:number): Observable<any>{
    const token = this.getToken();

    if (!token) {
      console.error('User not authenticated');
      return throwError(() => new Error('User not authenticated'));
    }
    const headers = new HttpHeaders().set('Authorization', `Token ${token}`);
    return this.http.get(`http://127.0.0.1:8000/api/employee/request/${request_id}`,{headers})
  }

  // Get travel requests assigned to the logged-in manager
  getManagerTravelRequests(token: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Token ${token}`,
    });
    return this.http.get(`${this.baseUrl}manager-view/requests/`, { headers });
  }
  

  // Send note to an employee regarding a travel request
  // sendNoteToEmployee(token: string, requestId: number, note: string): Observable<any> {
  //   const headers = new HttpHeaders({
  //     Authorization: `Token ${token}`,
  //     'Content-Type': 'application/json',
  //   });

  //   return this.http.post(
  //     `${this.baseUrl}/send-note/${requestId}/`,
  //     { manager_note: note },
  //     { headers }
  //   );
  // }


  /** Fetch travel requests assigned to the manager */
  getTravelRequestsformanager(): Observable<any> {
    return this.http.get(`${this.baseUrl}view-requests/manager`, { headers: this.getHeaders() });
  }

  updateTravelRequestStatus(requestId: number, status: string, note = ''): Observable<any> {
    console.log("startign 2")
    if (!requestId) {
      console.error("Invalid Request ID");
      return throwError(() => new Error("Invalid request ID"));
    }
  
    const url = `http://127.0.0.1:8000/api/update-status/${requestId}`;  // API Endpoint
  
    const headers = new HttpHeaders({
      'Authorization': `Token ${localStorage.getItem('authToken')}`,
      'Content-Type': 'application/json'
    });
  
    const body = { status, note };

    console.log("starign 3")
    return this.http.put(url, body, { headers }).pipe(
      tap(response => console.log(" API Response:", response)),
      catchError((error) => {
        console.error(" Error updating travel request status:", error);
        return throwError(() => new Error(error.message || 'Something went wrong'));
      })
    );
  }
  
  

//   getFilteredTravelRequests(filters: any): Observable<any[]> {
//     let params = new HttpParams();
    
//     if (filters.status) params = params.set('status', filters.status);
//     if (filters.employee) params = params.set('employee', filters.employee);
//     if (filters.start_date) params = params.set('start_date', filters.start_date);
//     if (filters.end_date) params = params.set('end_date', filters.end_date);
  
//     // Additional filters can be added here (like sorting)
//     if (filters.sortBy) params = params.set('sort', filters.sortBy);
//     if (filters.order) params = params.set('order', filters.order);

//     // Manually setting headers with the token
//     const headers = new HttpHeaders({
//       'Authorization': `Token ${localStorage.getItem('authToken')}`,
//       'Content-Type': 'application/json'
//     });

//     return this.http.get<any[]>(`${this.baseUrl}flterview-req/`, { headers, params }).pipe(
//       tap(response => console.log('Filtered travel requests fetched:', response)),
//       catchError(error => {
//         console.error('Error fetching filtered travel requests:', error);
//         return throwError(() => new Error('Failed to fetch filtered travel requests'));
//       })
//     );
// }



  


  

  
  

  
  

  
  
  

  // /** Send a note to an employee */
  // sendNote(requestId: number, note: string): Observable<any> {
  //   return this.http.post(`${this.sendNoteUrl}${requestId}/`, { note }, { headers: this.getHeaders() });
  // }

}








  
  


