import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MngLoginComponent } from './mng-login.component';

describe('MngLoginComponent', () => {
  let component: MngLoginComponent;
  let fixture: ComponentFixture<MngLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MngLoginComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MngLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
