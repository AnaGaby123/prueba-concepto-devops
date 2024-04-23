import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SeeBreakdownComponent} from './see-breakdown.component';

describe('SeeBreakdownComponent', () => {
  let component: SeeBreakdownComponent;
  let fixture: ComponentFixture<SeeBreakdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SeeBreakdownComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeeBreakdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
