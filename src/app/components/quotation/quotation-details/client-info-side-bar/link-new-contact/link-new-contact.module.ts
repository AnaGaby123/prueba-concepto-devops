import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LinkNewContactComponent} from './link-new-contact.component';
import {PqfSearchModule} from '@appComponents/shared/pqf-search/pqf-search.module';
import {SearchModule} from '@appComponents/shared/search/search.module';
import {LoadingModule} from '@appComponents/shared/loading/loading.module';
import {VirtualScrollerModule} from '@iharbeck/ngx-virtual-scroller';
import {WithoutResultsModule} from '@appComponents/shared/without-results/without-results.module';
import {LinkNewContactItemModule} from '@appComponents/quotation/quotation-details/client-info-side-bar/link-new-contact/link-new-contact-item/link-new-contact-item.module';

@NgModule({
  declarations: [LinkNewContactComponent],
  imports: [
    CommonModule,
    PqfSearchModule,
    SearchModule,
    LoadingModule,
    VirtualScrollerModule,
    WithoutResultsModule,
    LinkNewContactItemModule,
  ],
  exports: [LinkNewContactComponent],
})
export class LinkNewContactModule {}
