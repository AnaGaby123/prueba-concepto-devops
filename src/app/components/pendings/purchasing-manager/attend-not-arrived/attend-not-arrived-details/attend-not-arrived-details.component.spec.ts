import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AttendNotArrivedDetailsComponent} from './attend-not-arrived-details.component';

describe('AttendNotArrivedDetailsComponent', () => {
  let component: AttendNotArrivedDetailsComponent;
  let fixture: ComponentFixture<AttendNotArrivedDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AttendNotArrivedDetailsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AttendNotArrivedDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
