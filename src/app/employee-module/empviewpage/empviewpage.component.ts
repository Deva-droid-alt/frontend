import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee.service'; // Adjust the path if needed

@Component({
  selector: 'app-empviewpage',
  templateUrl: './empviewpage.component.html',
  styleUrls: ['./empviewpage.component.css']
})
export class EmpviewpageComponent implements OnInit {
  isModalVisible = false;
  selectedRequest: any = {};
  request_data:any=[];
  travelRequests: any[] = [];
  filteredTravelRequests: any[] = [];
  managerName: string | null = this.getManagerNameFromLocalStorage()
  fromDate = '';
  toDate = '';
  sortOrder = 'asc';
  statusFilter = 'all';
  editModalVisible = false;


  
  
  constructor(private employeeService: EmployeeService) {}

  ngOnInit() {
    this.managerName = this.getManagerNameFromLocalStorage();
    this.loadRequests();
    this.fetchManagerName();
  }

  loadRequests(): void {
    this.fetchManagerName();
    this.employeeService.getTravelRequests().subscribe({
      next: (data: any[]) => {
        if (data.length > 0) {
          this.travelRequests = data;
          console.log(this.travelRequests)
          this.filteredTravelRequests = [...data]; // Create a copy for filtering
          // this.managerName = data[0]?.manager ?? ''; // Ensure safe access
        }
      },
      error: (error) => console.error('Error fetching travel requests:', error)
    });
  }

  filterRequests(): void {
    let filteredRequests = [...this.travelRequests];

    if (this.statusFilter !== 'all') {
      filteredRequests = filteredRequests.filter(request => request.status === this.statusFilter);
    }

    if (this.fromDate) {
      filteredRequests = filteredRequests.filter(request => new Date(request.from_date) >= new Date(this.fromDate));
    }

    if (this.toDate) {
      filteredRequests = filteredRequests.filter(request => new Date(request.to_date) <= new Date(this.toDate));
    }

    this.filteredTravelRequests = this.sortRequests(filteredRequests);
  }

  sortRequests(requests: any[]): any[] {
    return requests.sort((a, b) => {
      const dateA = new Date(a.date_submitted).getTime();
      const dateB = new Date(b.date_submitted).getTime();
      return this.sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    });
  }
  editRequest(request: any): void {
    console.log('Editing Request:', request);
    this.openEditModal(request)
  }

  openEditModal(request: any): void {
    if (request?.status === 'resubmit') {
      this.selectedRequest = request ; // Assign request data
      console.log("Opening modal");
      console.log("fetched Data", this.selectedRequest); // Now it contains request data
      this.editedRequest = { ...request };  // ✅ Ensure a copy is used
      console.log(this.editedRequest)
      this.editModalVisible = true; // Show the edit modal
    } else {
      console.warn('Request is not eligible for resubmission.');
    }
  }
  


  // Close the edit modal
  closeEditModal(): void {
    this.editModalVisible = false;
    this.editedRequest = {}; // Reset form
  }

  // Save edited request (send update API call)
  submitEditRequest(): void {
    if (!this.editedRequest || !this.editedRequest.id) {
      console.error("❌ No request selected for editing");
      return;
    }

    console.log("🔍 Edited Request Before Submission:", this.editedRequest);

    const updatedRequest = {
      from_location: this.editedRequest.from_location,
      to_location: this.editedRequest.to_location,
      from_date: this.editedRequest.from_date,
      to_date: this.editedRequest.to_date,
      purpose: this.editedRequest.purpose,
      updatereq_asked_by_admin: this.editedRequest.updatereq_asked_by_admin,  // ✅ Make sure it's there
      updatereq_asked_by_manager: this.editedRequest.updatereq_asked_by_manager,
    };

    console.log("🚀 Sending Request Payload:", updatedRequest);

    this.employeeService.updateresubmission(this.editedRequest.id, updatedRequest).subscribe({
      next: (response) => {
        console.log("✅ Request Updated Successfully:", response);
        this.loadRequests();
        this.closeEditModal();
      },
      error: (error) => {
        console.error("❌ Error Updating Request:", error);
      }
    });
}


  
  

  deleteRequest(requestId: number): void {
    this.employeeService.deleteRequest(requestId).subscribe({
      next: () => {
        console.log(`Deleted request with ID: ${requestId}`);
        this.loadRequests(); // Reload after deletion
      },
      error: (error) => console.error('Error deleting request:', error)
    });
  }

  onFilterChange(): void {
    this.filterRequests();
  }

  onSortChange(): void {
    this.filterRequests();
  }

  fetchManagerName() {
    this.employeeService.getManagerName().subscribe({
      next: (response: any) => {
        this.managerName = response.manager_name;
        console.log('Manager Name:', this.managerName);
        this.saveManagerNameToLocalStorage(this.managerName);
      },
      error: (error) => console.error('Error fetching manager:', error)
    });
  }

  saveManagerNameToLocalStorage(name: any) {
    localStorage.setItem('managerName', name);
  }

  getManagerNameFromLocalStorage(): string | null {
    return localStorage.getItem('managerName');
  }
  
  viewRequest(request_id: any) {
    this.selectedRequest = request_id;
    this.getSelectedRequestData();
    this.isModalVisible = true;
    

  }

  getSelectedRequestData(): void {
    if (!this.selectedRequest) return;
  
    this.employeeService.getRequest(this.selectedRequest).subscribe({
      next: (response) => {
        console.log('Fetched request successfully:', response);
        this.selectedRequest = response; 
      },
      error: (error) => console.error('Error fetching request:', error)
    });
  }
  

  getSelectedRequest() {
    return this.selectedRequest;  

  }

  closeModal() {
    this.isModalVisible = false;
    this.selectedRequest = {};
  }

  saveChanges() {
    if (this.selectedRequest) {
      this.employeeService.updateEmployeeRequest(this.selectedRequest.id, this.selectedRequest).subscribe(
        response => {
          console.log('Request updated successfully:', response);
          this.loadRequests();
          this.closeModal();
        },
        error => console.error('Error updating request:', error)
      );
    }
  }

noteToManager = '';  // New field for manager note
noteToAdmin = '';    // New field for admin note
editedRequest: any = {}; // Stores the request being edited


updateManagerNote(): void {
  if (this.selectedRequest) {
    const updatedData = { note_to_manager: this.noteToManager };

    this.employeeService.updateEmployeeRequest(this.selectedRequest.id, updatedData).subscribe(
      response => {
        console.log('Manager Note updated successfully:', response);
        this.closeModal();
      },
      error => console.error('Error updating manager note:', error)
    );
  }
}

updateAdminNote(): void {
  if (this.selectedRequest) {
    const updatedData = { note_to_admin: this.noteToAdmin };

    this.employeeService.updateEmployeeRequest(this.selectedRequest.id, updatedData).subscribe(
      response => {
        console.log('Admin Note updated successfully:', response);
        this.closeModal();
      },
      error => console.error('Error updating admin note:', error)
    );
  }
}
}




