import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {PendingsHomeComponent} from './pendings-home.component';

describe('PendingsHomeComponent', () => {
  let component: PendingsHomeComponent;
  let fixture: ComponentFixture<PendingsHomeComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [PendingsHomeComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingsHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
