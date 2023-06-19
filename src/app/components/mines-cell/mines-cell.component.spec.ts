import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinesCellComponent } from './mines-cell.component';

describe('MinesCellComponent', () => {
  let component: MinesCellComponent;
  let fixture: ComponentFixture<MinesCellComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MinesCellComponent]
    });
    fixture = TestBed.createComponent(MinesCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
