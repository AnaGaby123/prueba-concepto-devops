import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {ChangeNoticesComponent} from './change-notices.component';

describe('ChangeNoticesComponent', () => {
  let component: ChangeNoticesComponent;
  let fixture: ComponentFixture<ChangeNoticesComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ChangeNoticesComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeNoticesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
