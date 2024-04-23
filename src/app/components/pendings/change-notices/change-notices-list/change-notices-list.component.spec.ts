import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {ChangeNoticesListComponent} from './change-notices-list.component';

describe('ChangeNoticesListComponent', () => {
  let component: ChangeNoticesListComponent;
  let fixture: ComponentFixture<ChangeNoticesListComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ChangeNoticesListComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeNoticesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
