import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCveComponent } from './list-cve.component';

describe('ListCveComponent', () => {
  let component: ListCveComponent;
  let fixture: ComponentFixture<ListCveComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListCveComponent]
    });
    fixture = TestBed.createComponent(ListCveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
