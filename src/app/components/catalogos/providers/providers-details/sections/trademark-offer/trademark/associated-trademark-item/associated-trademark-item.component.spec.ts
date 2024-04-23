import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {AssociatedTrademarkItemComponent} from './associated-trademark-item.component';

describe('AssociatedTrademarkItemComponent', () => {
  let component: AssociatedTrademarkItemComponent;
  let fixture: ComponentFixture<AssociatedTrademarkItemComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [AssociatedTrademarkItemComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(AssociatedTrademarkItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
