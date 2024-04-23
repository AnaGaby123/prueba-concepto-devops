import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MailboxComponent} from './mailbox.component';
import {HeaderBarModule} from '@appComponents/shared/header-bar/header-bar.module';
import {MailboxRoutingModule} from '@appComponents/mailbox/mailbox-routing.module';
import {StoreModule} from '@ngrx/store';
import {mailboxReducer} from '@appReducers/mailbox/mailbox.reducer';
import {MAILBOX_FEATURE_KEY} from '@appUtil/common.protocols';
import {EffectsModule} from '@ngrx/effects';
import {MailboxEffects} from '@appEffects/mailbox/mailbox.effects';

@NgModule({
  declarations: [MailboxComponent],
  imports: [
    CommonModule,
    HeaderBarModule,
    MailboxRoutingModule,
    StoreModule.forFeature(MAILBOX_FEATURE_KEY, mailboxReducer),
    EffectsModule.forFeature([MailboxEffects]),
  ],
  exports: [MailboxComponent],
})
export class MailboxModule {}
