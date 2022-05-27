import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceListBookedComponent } from './service-list-booked.component';

describe('ServiceListBookedComponent', () => {
  let component: ServiceListBookedComponent;
  let fixture: ComponentFixture<ServiceListBookedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiceListBookedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceListBookedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
