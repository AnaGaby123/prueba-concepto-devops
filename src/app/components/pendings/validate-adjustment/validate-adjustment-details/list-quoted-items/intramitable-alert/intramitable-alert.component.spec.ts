import {ComponentFixture, TestBed} from '@angular/core/testing';

import {IntramitableAlertComponent} from './intramitable-alert.component';

describe('IntramitableAlertComponent', () => {
  let component: IntramitableAlertComponent;
  let fixture: ComponentFixture<IntramitableAlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IntramitableAlertComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IntramitableAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
