import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {LinkmailComponent} from './linkmail.component';

describe('LinkmailComponent', () => {
  let component: LinkmailComponent;
  let fixture: ComponentFixture<LinkmailComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [LinkmailComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
