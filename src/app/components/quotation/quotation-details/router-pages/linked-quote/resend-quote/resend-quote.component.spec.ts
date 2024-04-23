import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {ResendQuoteComponent} from './resend-quote.component';

describe('ResendQuoteComponent', () => {
  let component: ResendQuoteComponent;
  let fixture: ComponentFixture<ResendQuoteComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ResendQuoteComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ResendQuoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
