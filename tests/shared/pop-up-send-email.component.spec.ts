import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {PopUpSendEmailComponent} from '@appComponents/shared/pop-up-send-email/pop-up-send-email.component';
import {TranslateModule} from '@ngx-translate/core';
import {PopUpGenericModule} from '@appComponents/shared/pop-up-generic/pop-up-generic.module';
import {DropListContactModule} from '@appComponents/shared/drop-list-contact/drop-list-contact.module';
import {MultipleEmailsInputModule} from '@appComponents/shared/multiple-emails-input/multiple-emails-input.module';
import {GenericTextAreaModule} from '@appComponents/shared/generic-text-area/generic-text-area.module';

describe('PopUpSendEmailComponent', () => {
  let component: PopUpSendEmailComponent;
  let fixture: ComponentFixture<PopUpSendEmailComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [PopUpSendEmailComponent],
        imports: [
          TranslateModule.forRoot(),
          PopUpGenericModule,
          DropListContactModule,
          MultipleEmailsInputModule,
          TranslateModule,
          GenericTextAreaModule,
        ],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(PopUpSendEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
