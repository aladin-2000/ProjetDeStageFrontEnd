import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetsDashBoardComponent } from './assets-dash-board.component';

describe('AssetsDashBoardComponent', () => {
  let component: AssetsDashBoardComponent;
  let fixture: ComponentFixture<AssetsDashBoardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AssetsDashBoardComponent]
    });
    fixture = TestBed.createComponent(AssetsDashBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
