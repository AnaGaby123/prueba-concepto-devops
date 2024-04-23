import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {RebillComponent} from './rebill.component';

describe('RebillComponent', () => {
  let component: RebillComponent;
  let fixture: ComponentFixture<RebillComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [RebillComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(RebillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
