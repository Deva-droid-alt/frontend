import { Component } from '@angular/core';

interface TravelRequest {
  id: number;
  name: string;
  requestedDate: string;
  fromLocation: string;
  toLocation: string;
  fromDate: string;
  toDate: string;
  status: string;
}

@Component({
  selector: 'app-recent-requests',
  templateUrl:'./recent-requests.component.html',
  styleUrl: './recent-requests.component.css'
})
export class RecentRequestsComponent {
  travelRequests: TravelRequest[] = [
    { id: 1, name: 'Mark', requestedDate: '12-2-2025', fromLocation: 'NY', toLocation: 'Tvm', fromDate: '20-2-2025', toDate: '23-2-2025', status: 'Pending' },
    { id: 2, name: 'Lekha', requestedDate: '13-2-2025', fromLocation: 'Tvm', toLocation: 'Blg', fromDate: '10-2-2025', toDate: '16-2-2025', status: 'Approved' }
  ];

  filteredRequests: TravelRequest[] = [...this.travelRequests];

  applyFilters(filters: any) {
    this.filteredRequests = this.travelRequests.filter(request => {
      const matchesDate = (!filters.dateFrom || request.fromDate >= filters.dateFrom) &&
                        (!filters.dateTo || request.toDate <= filters.dateTo);
      const matchesStatus = filters.statusFilter === 'all' || request.status === filters.statusFilter;
      return matchesDate && matchesStatus;
    });
  }


}
