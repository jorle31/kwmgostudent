import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceListOwnedComponent } from './service-list-owned.component';

describe('ServiceListOwnedComponent', () => {
  let component: ServiceListOwnedComponent;
  let fixture: ComponentFixture<ServiceListOwnedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiceListOwnedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceListOwnedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
