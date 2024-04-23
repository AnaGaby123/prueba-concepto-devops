import {ComponentFixture, TestBed} from '@angular/core/testing';

import {FreightDetailsComponent} from './freight-details.component';

describe('FreightDetailsComponent', () => {
  let component: FreightDetailsComponent;
  let fixture: ComponentFixture<FreightDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FreightDetailsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FreightDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
