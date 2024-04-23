import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {ChangeNoticesDetailsComponent} from './change-notices-details.component';

describe('ChangeNoticesDetailsComponent', () => {
  let component: ChangeNoticesDetailsComponent;
  let fixture: ComponentFixture<ChangeNoticesDetailsComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ChangeNoticesDetailsComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeNoticesDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
