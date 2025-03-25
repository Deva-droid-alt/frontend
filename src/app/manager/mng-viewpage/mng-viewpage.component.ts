import { Component, OnInit } from '@angular/core';
import { ManagerService } from '../../services/manager.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-mng-viewpage',
  templateUrl: './mng-viewpage.component.html',
  styleUrl: './mng-viewpage.component.css'
})
export class MngViewpageComponent implements OnInit {
    isModalVisible = false;
    sModalVisible = false;
    selectedRequest: any = {};
    travelRequests: any[] = [];
    filteredTravelRequests: any[] = [];
    managerName = '';
    resubmitNote = '';

    filterForm: FormGroup;

    constructor(
        private fb: FormBuilder, 
        private managerservice: ManagerService
    ) {
        this.filterForm = this.fb.group({
            status: [''],
            name: [''],
            from_date: [''],
            to_date: ['']
        });
    }

    ngOnInit() {
        this.loadTravelRequests();
        this.fetchManagerName();
    }

    loadTravelRequests() {
        const authToken = localStorage.getItem('authToken') || '';

        if (!authToken) {
            console.error("No authentication token found.");
            return;
        }

        this.managerservice.getManagerTravelRequests(authToken).subscribe({
            next: (data) => {
                this.travelRequests = data || [];
                this.filteredTravelRequests = [...this.travelRequests];
                console.log("Fetched Travel Requests:", this.travelRequests);
            },
            error: (error) => {
                console.error("Error fetching travel requests:", error);
                this.travelRequests = [];
            }
        });
    }

    applyFilters(): void {
        const filters = this.filterForm.value;
        console.log('Applying filters:', filters);

        // Client-side filtering if server-side filtering is not available
        this.filteredTravelRequests = this.travelRequests.filter(request => {
            const matchesStatus = !filters.status || 
                request.status.toLowerCase() === filters.status.toLowerCase();
            
            const matchesName = !filters.name || 
                request.name.toLowerCase().includes(filters.name.toLowerCase());
            
            const matchesFromDate = !filters.from_date || 
                new Date(request.from_date) >= new Date(filters.from_date);
            
            const matchesToDate = !filters.to_date || 
                new Date(request.to_date) <= new Date(filters.to_date);

            return matchesStatus && matchesName && matchesFromDate && matchesToDate;
        });

        // Optional: Sort the filtered requests by date submitted
        this.filteredTravelRequests.sort((a, b) => 
            new Date(b.date_submitted).getTime() - new Date(a.date_submitted).getTime()
        );
    }

    resetFilters(): void {
        this.filterForm.reset({
            status: '',
            name: '',
            from_date: '',
            to_date: ''
        });
        this.filteredTravelRequests = [...this.travelRequests];
    }

    updateStatus(request: any, newStatus: string) {
      console.log("Starting")
        this.managerservice.updateTravelRequestStatus(request.id, newStatus).subscribe({
            next: (response) => {
                console.log(`Status updated to ${newStatus} successfully!`, response);
                request.status = newStatus;
                alert(`Status updated to ${newStatus} successfully!`);
                this.applyFilters(); // Reapply filters after status change
            },
            error: (error) => {
                console.error(`Error updating status to ${newStatus}:`, error);
                alert(`Failed to update status to ${newStatus}.`);
            }
        });
    }

    openResubmitModal(request: any): void {
        this.selectedRequest = request;
        this.sModalVisible = true;
        this.resubmitNote = '';
    }
  
    confirmResubmit(): void {
        if (!this.resubmitNote.trim()) {
            alert('Please enter a reason for resubmission.');
            return;
        }
    
        this.managerservice.updateTravelRequestStatus(
            this.selectedRequest.id, 
            'resubmit', 
            this.resubmitNote
        ).subscribe({
            next: () => {
                this.selectedRequest.status = 'resubmit';
                alert('Request resubmitted successfully!');
                this.sModalVisible = false;
                this.applyFilters(); // Reapply filters after resubmission
            },
            error: (error) => {
                console.error('Error updating request:', error);
                alert('Failed to resubmit request.');
            }
        });
    }    

    fetchManagerName() {
        this.managerservice.getManagerName().subscribe({
            next: (response: any) => {
                this.managerName = response.manager_name;
                console.log('Manager Name:', this.managerName);
            },
            error: (error) => console.error('Error fetching manager:', error)
        });
    }
    
    viewRequest(request: any) {
        console.log('Viewing Request:', request);
        this.selectedRequest = { ...request };
        this.isModalVisible = true;
    }

    closeModal() {
        this.isModalVisible = false;
        this.selectedRequest = {};
    }
}