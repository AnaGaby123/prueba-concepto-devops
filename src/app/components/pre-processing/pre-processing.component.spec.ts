import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {PreProcessingComponent} from './pre-processing.component';

describe('PreProcessingComponent', () => {
  let component: PreProcessingComponent;
  let fixture: ComponentFixture<PreProcessingComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [PreProcessingComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(PreProcessingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
