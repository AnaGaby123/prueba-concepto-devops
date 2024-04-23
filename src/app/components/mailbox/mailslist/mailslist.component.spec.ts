import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {MailslistComponent} from './mailslist.component';

describe('MailslistComponent', () => {
  let component: MailslistComponent;
  let fixture: ComponentFixture<MailslistComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [MailslistComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(MailslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
