import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProviderContactsComponent} from './provider-contacts.component';
import {TranslateModule} from '@ngx-translate/core';
import {ContactItemModule} from '@appComponents/shared/contact-item/contact-item.module';
import {VirtualScrollerModule} from '@iharbeck/ngx-virtual-scroller';
import {ProviderContactPopModule} from '@appComponents/catalogos/providers/providers-details/sections/general-data/provider-contact-pop/provider-contact-pop.module';

@NgModule({
  declarations: [ProviderContactsComponent],
  exports: [ProviderContactsComponent],
  imports: [
    CommonModule,
    TranslateModule,
    ContactItemModule,
    VirtualScrollerModule,
    ProviderContactPopModule,
  ],
})
export class ProviderContactsModule {}
