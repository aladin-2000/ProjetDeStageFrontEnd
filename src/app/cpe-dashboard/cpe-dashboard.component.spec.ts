import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CpeDashboardComponent } from './cpe-dashboard.component';

describe('CpeDashboardComponent', () => {
  let component: CpeDashboardComponent;
  let fixture: ComponentFixture<CpeDashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CpeDashboardComponent]
    });
    fixture = TestBed.createComponent(CpeDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
