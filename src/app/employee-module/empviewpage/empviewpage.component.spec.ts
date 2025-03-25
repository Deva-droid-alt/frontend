import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpviewpageComponent } from './empviewpage.component';

describe('EmpviewpageComponent', () => {
  let component: EmpviewpageComponent;
  let fixture: ComponentFixture<EmpviewpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmpviewpageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmpviewpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
