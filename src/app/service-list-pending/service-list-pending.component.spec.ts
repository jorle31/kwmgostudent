import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceListPendingComponent } from './service-list-pending.component';

describe('ServiceListPendingComponent', () => {
  let component: ServiceListPendingComponent;
  let fixture: ComponentFixture<ServiceListPendingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiceListPendingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceListPendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
