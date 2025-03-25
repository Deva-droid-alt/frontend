import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../../services/employee.service';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-request-form',
  templateUrl: './request-form.component.html',
  styleUrls: ['./request-form.component.css']
})
export class RequestFormComponent implements OnInit {
  requestForm!: FormGroup;
  managerName = '';
  employeeName = '';
   // Example, replace with actual logic

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService
  ) {}

  initializeForm() {
    this.requestForm = this.fb.group({
      // firstName: ['', Validators.required],
      // lastName: [''],
      fromLocation: ['', Validators.required],
      toLocation: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      modeOfTravel: ['', Validators.required],
      purpose: ['', Validators.required],
      lodgingRequired: [false],
      accommodationName: [''],
      accommodationType: [''],
      additionalRequests: [''],
      managerNote: [''],
    });


    

    this.fetchManagerName();
    this.handleLodgingRequirement();
  }

  fetchManagerName() {
    this.employeeService.getManagerName().subscribe({
      next: (response: any) => {
        this.managerName = response.manager_name;
      },
      error: (error) => console.error('Error fetching manager:', error)
    });
  }

  handleLodgingRequirement() {
    this.requestForm.get('lodgingRequired')?.valueChanges.subscribe((value) => {
      if (value) {
        this.requestForm.get('accommodationName')?.setValidators(Validators.required);
        this.requestForm.get('accommodationType')?.setValidators(Validators.required);
      } else {
        this.requestForm.get('accommodationName')?.clearValidators();
        this.requestForm.get('accommodationType')?.clearValidators();
      }
      this.requestForm.get('accommodationName')?.updateValueAndValidity();
      this.requestForm.get('accommodationType')?.updateValueAndValidity();
    });
  }


  ngOnInit(): void {
    this.employeeService.getEmployeeDetails().subscribe({
      next: (data) => {
        console.log(' Employee details received:', data);
  
        if (data?.name) {
          this.employeeName = data.name.trim(); // Ensure no extra spaces
        } else {
          console.warn(' Employee name not found in response:', data);
          this.employeeName = 'Unknown Employee';
        }
      },
      error: (error) => {
        console.error(' Error fetching employee details:', error);
        this.employeeName = 'Error Loading Name';
      }
    });
  
    this.initializeForm();
  }
  

  submitForm() {
    if (this.requestForm.invalid) {
      alert('Please fill all required fields.');
      return;
    }

    const formData = {
      // first_name: this.requestForm.value.firstName.trim(),
      // last_name: this.requestForm.value.lastName.trim(),
      manager_name: this.managerName,
      from_location: this.requestForm.value.fromLocation.trim(),
      to_location: this.requestForm.value.toLocation.trim(),
      from_date: this.requestForm.value.startDate,
      to_date: this.requestForm.value.endDate,
      travel_mode: this.requestForm.value.modeOfTravel,
      purpose: this.requestForm.value.purpose.trim(),
      lodging_required: this.requestForm.value.lodgingRequired,
      accommodation_name: this.requestForm.value.lodgingRequired
        ? this.requestForm.value.accommodationName.trim()
        : '',
      accommodation_type: this.requestForm.value.lodgingRequired
        ? this.requestForm.value.accommodationType.trim()
        : '',
      additional_note: this.requestForm.value.additionalRequests?.trim() || '',
      manager_note: this.requestForm.value.managerNote?.trim() || '',
    };

    this.employeeService.submitTravelRequest(formData).subscribe({
      next: (response) => {
        alert('Travel request submitted successfully!');
        this.requestForm.reset();
      },
      error: (err) => {
        console.error('Error submitting request:', err);
        alert('Failed to submit travel request.');
      },
    });
  }
}






//   requestForm!: FormGroup;
//   managerName: string = ''; 

//   constructor(private fb: FormBuilder, private employeeService: EmployeeService) {}

//   ngOnInit() {
//     this.requestForm = this.fb.group({
//       firstName: ['', Validators.required],
//       lastName:[''],
//       fromLocation: ['', Validators.required],
//       toLocation: ['', Validators.required],
//       startDate: ['', Validators.required],
//       endDate: ['', Validators.required],
//       modeOfTravel: ['', Validators.required],
//       lodgingRequired: [false],
//       accommodationName: [''],
//       accommodationType: [''],
//       purpose: ['', Validators.required],
//       additionalRequests: ['']
//     });

//     this.fetchManagerName();
//   }

//   fetchManagerName() {
//     this.employeeService.getManagerName().subscribe({
//       next: (response: any) => {
//         this.managerName = response.manager_name;
//       },
//       error: (error) => console.error('Error fetching manager:', error)
//     });
//   }

//   submitForm() {
//     if (this.requestForm.invalid) {
//       alert("Please fill all required fields.");
//       return;
//     }

//     const formatDate = (date: string): string => {
//       return date ? new Date(date).toISOString().split('T')[0] : ''; 
//     };

//     const formData = {
//       first_name: this.requestForm.value.firstName.trim(),
//       last_name: this.requestForm.value.lastName.trim(),
//       manager_name: this.managerName,
//       from_location: this.requestForm.value.fromLocation.trim(),
//       to_location: this.requestForm.value.toLocation.trim(),
//       from_date: formatDate(this.requestForm.value.startDate),
//       to_date: formatDate(this.requestForm.value.endDate),
//       travel_mode: this.requestForm.value.modeOfTravel,
//       purpose: this.requestForm.value.purpose.trim(),
//       lodging_required: this.requestForm.value.lodgingRequired,
//       accommodation_name: this.requestForm.value.lodgingRequired ? this.requestForm.value.accommodationName.trim() : '',
//       accommodation_type: this.requestForm.value.lodgingRequired ? this.requestForm.value.accommodationType.trim() : '',
//       additional_note: this.requestForm.value.additionalRequests?.trim() || '',
//       manager_note: this.requestForm.value.additionalRequirements?.trim() || '',
//     };    

//     console.log("Submitting request:", formData);

//     this.employeeService.submitTravelRequest(formData).subscribe({
//       next: (response) => {
//         console.log('Request submitted successfully!', response);
//         alert("Travel request submitted successfully!");
//       },
//       error: (error) => {
//         console.error('Error submitting request:', error);
//         alert("Failed to submit the request. Please try again.");
//       }
//     });
//   }
// }


