import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeLoginComponent } from './employeelogin.component';

describe('EmployeeloginComponent', () => {
  let component: EmployeeLoginComponent;
  let fixture: ComponentFixture<EmployeeLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmployeeLoginComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmployeeLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
