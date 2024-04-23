import {ComponentFixture, TestBed} from '@angular/core/testing';

import {RequestAuthCodeDialogComponent} from './request-auth-code-dialog.component';

describe('RequestAuthCodeDialogComponent', () => {
  let component: RequestAuthCodeDialogComponent;
  let fixture: ComponentFixture<RequestAuthCodeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RequestAuthCodeDialogComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestAuthCodeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
