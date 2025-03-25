import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdnDashboardComponent } from './adn-dashboard.component';

describe('AdnDashboardComponent', () => {
  let component: AdnDashboardComponent;
  let fixture: ComponentFixture<AdnDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdnDashboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdnDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
