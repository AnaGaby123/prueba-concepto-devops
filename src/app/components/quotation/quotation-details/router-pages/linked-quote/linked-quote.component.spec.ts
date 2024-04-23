import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {LinkedQuoteComponent} from './linked-quote.component';

describe('LinkedQuoteComponent', () => {
  let component: LinkedQuoteComponent;
  let fixture: ComponentFixture<LinkedQuoteComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [LinkedQuoteComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkedQuoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
