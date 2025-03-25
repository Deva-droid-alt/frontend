import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { FormBuilder, FormGroup } from '@angular/forms';

interface TravelRequest {
  id: number;
  name: string;
  from_location: string;
  to_location: string;
  from_date: string;
  to_date: string;
  date_submitted: string;
  status: string;
  employee?: {
    name: string;
    last_name: string;
  };
  manager?: {
    name: string;
  };
  islodging_needed?: boolean;
  travel_mode?: string;
  accommodation_name?: string;
  accommodation_type?: string;
  purpose?: string;
  additional_note?: string;
}

@Component({
  selector: 'app-admin-view-rq',
  templateUrl: './admin-view-rq.component.html',
  styleUrls: ['./admin-view-rq.component.css']
})
export class AdminViewRqComponent implements OnInit {
  // Travel Requests
  travelRequests: TravelRequest[] = [];
  filteredTravelRequests: TravelRequest[] = [];
  selectedRequest: TravelRequest | null = null;

  // Modal Controls
  sModalVisible = false;
  resubmitNote = '';

  // User Creation Fields
  name = '';
  email = '';
  password = '';
  manager_id?: string;
  username = '';

  // Filter Form
  filterForm: FormGroup;

  constructor(
    private fb: FormBuilder, 
    private adminService: AdminService
  ) {
    // Initialize filter form
    this.filterForm = this.fb.group({
      status: [''],
      searchTerm: [''],
      from_date: [''],
      to_date: ['']
    });

    // Subscribe to form changes for real-time filtering
    this.filterForm.valueChanges.subscribe(() => {
      this.applyFilters();
    });
  }

  ngOnInit() {
    this.getTravelRequests();
  }

  // Fetch Travel Requests
  getTravelRequests() {
    this.adminService.getTravelRequests().subscribe(
      (response: TravelRequest[]) => {
        this.travelRequests = response;
        this.filteredTravelRequests = [...this.travelRequests];
        this.applyFilters();
      },
      (error) => {
        console.error('Error fetching travel requests:', error);
        alert('Failed to load travel requests');
      }
    );
  }

  // Advanced Filtering Method
  applyFilters(): void {
    const filters = this.filterForm.value;
    
    this.filteredTravelRequests = this.travelRequests.filter(request => {
      // Status Filter
      const matchesStatus = !filters.status || 
        request.status.toLowerCase() === filters.status.toLowerCase();
      
      // Safe search term filter with null checks
const searchTerm = filters?.searchTerm?.toLowerCase() || '';
const matchesSearchTerm = !searchTerm || 
    (request.name && request.name.toLowerCase().includes(searchTerm));
      // Date Filters
      const fromDate = filters.from_date ? new Date(filters.from_date) : null;
      const toDate = filters.to_date ? new Date(filters.to_date) : null;
      
      const matchesFromDate = !fromDate || 
        (request.from_date && new Date(request.from_date) >= fromDate);
      
      const matchesToDate = !toDate || 
        (request.to_date && new Date(request.to_date) <= toDate);

      return matchesStatus && matchesSearchTerm && matchesFromDate && matchesToDate;
    });

    // Sort by most recent submission date
    this.filteredTravelRequests.sort((a, b) => 
      new Date(b.date_submitted).getTime() - new Date(a.date_submitted).getTime()
    );
  }

  // Reset Filters
  resetFilters(): void {
    this.filterForm.reset({
      status: '',
      searchTerm: '',
      from_date: '',
      to_date: ''
    });
    this.filteredTravelRequests = [...this.travelRequests];
  }

  // Open Resubmit Modal
  openResubmitModal(request: TravelRequest) {
    if (!request || !request.id) {
      console.error("Invalid request: ID is missing");
      alert("Error: Invalid request.");
      return;
    }
  
    this.selectedRequest = request;
    this.sModalVisible = true;
    this.resubmitNote = ''; // Clear previous note
  }

  // Confirm Resubmission
  confirmResubmit() {
    if (!this.selectedRequest || !this.selectedRequest.id) {
      console.error("❌ Error: Request ID is missing");
      alert("Error: Request ID is missing.");
      return;
    }
  
    const requestId = this.selectedRequest.id;
    const resubmitData = {
      status: "resubmitted",
      note: this.resubmitNote.trim()
    };
  
    this.adminService.resubmitRequest(requestId, resubmitData).subscribe(
      (response) => {
        console.log("✔ Resubmission confirmed:", response);
        alert("Resubmission sent successfully");
        this.updateRequestStatus(requestId, "resubmitted");
        this.sModalVisible = false;
        this.getTravelRequests(); // Refresh list
      },
      (error) => {
        console.error("❌ Error resubmitting request:", error);
        alert("Error resubmitting request");
      }
    );
  }

  // View Request Details
  viewRequest(request: TravelRequest) {
    this.selectedRequest = request;
  }

  // Update Request Status
  updateRequestStatus(requestId: number, newStatus: string) {
    const requestIndex = this.travelRequests.findIndex(req => req.id === requestId);
    if (requestIndex !== -1) {
      this.travelRequests[requestIndex].status = newStatus;
    }
  }

  // Close Request
  closeRequest(requestId: number) {
    if (!requestId) {
      console.error("Request ID is undefined!");
      return;
    }
    this.adminService.closeRequest(requestId).subscribe(
      (response) => {
        console.log("Request closed successfully:", response);
        this.getTravelRequests(); // Refresh the list
      },
      (error) => {
        console.error("Error closing request:", error);
        alert("Failed to close request");
      }
    );
  }

  // User Creation Methods
  onCreateUser(event: Event, role: string) {
    event.preventDefault();
    
    const userData: any = {
      name: this.name,
      username: this.username,
      email: this.email,
      password: this.password,
    };
    
    if (role === 'employee') {
      userData.manager_id = this.manager_id;
      this.adminService.createEmployee(userData).subscribe(
        (response) => {
          console.log('Employee Created:', response);
          alert('Employee Created Successfully');
          this.resetUserForm();
        },
        (error) => {
          console.error('Error creating employee:', error);
          alert('Error Creating Employee');
        }
      );
    } else if (role === 'manager') {
      this.adminService.createManager(userData).subscribe(
        (response) => {
          console.log('Manager Created:', response);
          alert('Manager Created Successfully');
          this.resetUserForm();
        },
        (error) => {
          console.error('Error creating manager:', error);
          alert('Error Creating Manager');
        }
      );
    }
  }

  // Reset User Form Fields
  private resetUserForm() {
    this.name = '';
    this.username = '';
    this.email = '';
    this.password = '';
    this.manager_id = undefined;
  }
}