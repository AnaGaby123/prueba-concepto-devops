import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {DateRangeComponent} from '@appComponents/shared/date-range/date-range.component';
import {StoreModule} from '@ngrx/store';
import {provideMockStore} from '@ngrx/store/testing';

describe('DateRangeComponent', () => {
  let component: DateRangeComponent;
  let fixture: ComponentFixture<DateRangeComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [DateRangeComponent],
        imports: [StoreModule.forRoot(provideMockStore)],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(DateRangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
