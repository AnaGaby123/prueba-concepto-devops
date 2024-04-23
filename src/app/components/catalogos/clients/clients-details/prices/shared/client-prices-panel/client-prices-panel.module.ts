import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ClientPricesPanelComponent} from '@appComponents/catalogos/clients/clients-details/prices/shared/client-prices-panel/client-prices-panel.component';
import {TranslateModule} from '@ngx-translate/core';
import {AccountingModule} from '@appPipes/accounting/accounting.module';
import {WithoutResultsModule} from '@appComponents/shared/without-results/without-results.module';
import {SearchModule} from '@appComponents/shared/search/search.module';
import {CustomPositionPopUpModule} from '@appComponents/shared/custom-position-pop-up/custom-position-pop-up.module';

@NgModule({
  declarations: [ClientPricesPanelComponent],
  imports: [
    CommonModule,
    TranslateModule,
    AccountingModule,
    WithoutResultsModule,
    SearchModule,
    CustomPositionPopUpModule,
  ],
  exports: [ClientPricesPanelComponent],
})
export class ClientPricesPanelModule {}
