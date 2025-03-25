import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminViewRqComponent } from './admin-view-rq.component';

describe('AdminViewRqComponent', () => {
  let component: AdminViewRqComponent;
  let fixture: ComponentFixture<AdminViewRqComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminViewRqComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminViewRqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
