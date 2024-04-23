import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {CancelFormComponent} from './cancel-form.component';

describe('CancelFormComponent', () => {
  let component: CancelFormComponent;
  let fixture: ComponentFixture<CancelFormComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [CancelFormComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(CancelFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
