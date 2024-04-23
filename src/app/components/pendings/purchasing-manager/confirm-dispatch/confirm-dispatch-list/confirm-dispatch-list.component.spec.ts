import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {ConfirmDispatchListComponent} from './confirm-dispatch-list.component';

describe('ConfirmDispatchListComponent', () => {
  let component: ConfirmDispatchListComponent;
  let fixture: ComponentFixture<ConfirmDispatchListComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ConfirmDispatchListComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmDispatchListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
