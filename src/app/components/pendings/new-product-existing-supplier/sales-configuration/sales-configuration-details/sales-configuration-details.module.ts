import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SalesConfigurationDetailsRoutingModule} from './sales-configuration-details-routing.module';
import {SalesConfigurationDetailsComponent} from '@appComponents/pendings/new-product-existing-supplier/sales-configuration/sales-configuration-details/sales-configuration-details.component';
import {VirtualScrollerModule} from '@iharbeck/ngx-virtual-scroller';
import {DateFormatModule} from '@appPipes/date-format.module';
import {TranslateModule} from '@ngx-translate/core';
import {PqfGenericInputModule} from '@appComponents/shared/pqf-generic-input/pqf-generic-input.module';
import {PqfCheckBoxModule} from '@appComponents/shared/pqf-check-box/pqf-check-box.module';
import {PqfSearchModule} from '@appComponents/shared/pqf-search/pqf-search.module';
import {PqfFilterOptionsModule} from '@appComponents/shared/pqf-filter-options/pqf-filter-options.module';
import {PqfSecureCodePopUpModule} from '@appComponents/shared/pqf-secure-code-pop-up/pqf-secure-code-pop-up.module';
import {LoadingModule} from '@appComponents/shared/loading/loading.module';
import {WithoutResultsModule} from '@appComponents/shared/without-results/without-results.module';
import {PqfPopUpModule} from '@appComponents/shared/pqf-pop-up/pqf-pop-up.module';

@NgModule({
  declarations: [SalesConfigurationDetailsComponent],
  imports: [
    CommonModule,
    SalesConfigurationDetailsRoutingModule,
    VirtualScrollerModule,
    DateFormatModule,
    TranslateModule,
    PqfGenericInputModule,
    PqfCheckBoxModule,
    PqfSearchModule,
    PqfFilterOptionsModule,
    PqfSecureCodePopUpModule,
    LoadingModule,
    WithoutResultsModule,
    PqfPopUpModule,
  ],
  exports: [SalesConfigurationDetailsComponent],
})
export class SalesConfigurationDetailsModule {}
