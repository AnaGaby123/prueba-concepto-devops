import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {DatePickerComponent} from '@appComponents/shared/date-picker/date-picker.component';
import {Store, StoreModule} from '@ngrx/store';
import {provideMockStore} from '@ngrx/store/testing';
import {AppState, reducers} from '@appCore/core.state';

describe('DatePickerComponent', () => {
  let component: DatePickerComponent;
  let fixture: ComponentFixture<DatePickerComponent>;
  let store: Store<AppState>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [DatePickerComponent],
        imports: [StoreModule.forRoot(reducers)],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(DatePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    store = TestBed.inject(Store);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
