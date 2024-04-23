import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {TrademarkComponent} from './trademark.component';

describe('TrademarkComponent', () => {
  let component: TrademarkComponent;
  let fixture: ComponentFixture<TrademarkComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [TrademarkComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(TrademarkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
