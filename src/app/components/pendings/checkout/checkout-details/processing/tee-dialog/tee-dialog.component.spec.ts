import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TeeDialogComponent} from './tee-dialog.component';

describe('TeeDialogComponent', () => {
  let component: TeeDialogComponent;
  let fixture: ComponentFixture<TeeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TeeDialogComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
