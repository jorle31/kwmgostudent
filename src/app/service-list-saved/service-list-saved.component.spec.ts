import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceListSavedComponent } from './service-list-saved.component';

describe('ServiceListSavedComponent', () => {
  let component: ServiceListSavedComponent;
  let fixture: ComponentFixture<ServiceListSavedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiceListSavedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceListSavedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
