import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {PiecesArrivedComponent} from './pieces-arrived.component';

describe('PiecesArrivedComponent', () => {
  let component: PiecesArrivedComponent;
  let fixture: ComponentFixture<PiecesArrivedComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [PiecesArrivedComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(PiecesArrivedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
