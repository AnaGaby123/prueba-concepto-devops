import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SeeCampaignsComponent} from './see-campaigns.component';
import {TranslateModule} from '@ngx-translate/core';
import {TabsModule} from '@appComponents/shared/tabs/tabs.module';
import {SearchModule} from '@appComponents/shared/search/search.module';
import {WithoutResultsModule} from '@appComponents/shared/without-results/without-results.module';
import {LoadingModule} from '@appComponents/shared/loading/loading.module';
import {VirtualScrollerModule} from '@iharbeck/ngx-virtual-scroller';
import {DateFormatModule} from '@appPipes/date-format.module';
import {AccountingModule} from '@appPipes/accounting/accounting.module';

@NgModule({
  declarations: [SeeCampaignsComponent],
  imports: [
    CommonModule,
    TranslateModule,
    TabsModule,
    SearchModule,
    WithoutResultsModule,
    LoadingModule,
    VirtualScrollerModule,
    DateFormatModule,
    AccountingModule,
  ],
  exports: [SeeCampaignsComponent],
})
export class SeeCampaignsModule {}
