import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {PreprocessOrderDetailComponent} from './preprocess-order-detail.component';

describe('PreprocessOrderDetailComponent', () => {
  let component: PreprocessOrderDetailComponent;
  let fixture: ComponentFixture<PreprocessOrderDetailComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [PreprocessOrderDetailComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(PreprocessOrderDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
