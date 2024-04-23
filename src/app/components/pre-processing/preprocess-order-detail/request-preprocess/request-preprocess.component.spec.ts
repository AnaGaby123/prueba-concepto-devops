import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {RequestPreprocessComponent} from './request-preprocess.component';

describe('RequestPreprocessComponent', () => {
  let component: RequestPreprocessComponent;
  let fixture: ComponentFixture<RequestPreprocessComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [RequestPreprocessComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestPreprocessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
