import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {EditBatchComponent} from './edit-batch.component';

describe('EditBatchComponent', () => {
  let component: EditBatchComponent;
  let fixture: ComponentFixture<EditBatchComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [EditBatchComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(EditBatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
