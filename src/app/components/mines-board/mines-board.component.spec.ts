import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinesBoardComponent } from './mines-board.component';

describe('MinesBoardComponent', () => {
  let component: MinesBoardComponent;
  let fixture: ComponentFixture<MinesBoardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MinesBoardComponent]
    });
    fixture = TestBed.createComponent(MinesBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
