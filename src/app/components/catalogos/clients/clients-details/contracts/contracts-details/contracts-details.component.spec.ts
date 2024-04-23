import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {ContractsDetailsComponent} from './contracts-details.component';

describe('ContractsDetailsComponent', () => {
  let component: ContractsDetailsComponent;
  let fixture: ComponentFixture<ContractsDetailsComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ContractsDetailsComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
