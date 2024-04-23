import {ComponentFixture, TestBed} from '@angular/core/testing';

import {RequestFeaDialogComponent} from './request-fea-dialog.component';

describe('RequestFeaDialogComponent', () => {
  let component: RequestFeaDialogComponent;
  let fixture: ComponentFixture<RequestFeaDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RequestFeaDialogComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestFeaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
