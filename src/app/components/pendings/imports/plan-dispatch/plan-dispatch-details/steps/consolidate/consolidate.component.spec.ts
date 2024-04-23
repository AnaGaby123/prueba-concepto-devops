import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {ConsolidateComponent} from './consolidate.component';

describe('ConsolidateComponent', () => {
  let component: ConsolidateComponent;
  let fixture: ComponentFixture<ConsolidateComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ConsolidateComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsolidateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
