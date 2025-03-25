import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MngViewpageComponent } from './mng-viewpage.component';

describe('MngViewpageComponent', () => {
  let component: MngViewpageComponent;
  let fixture: ComponentFixture<MngViewpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MngViewpageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MngViewpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
