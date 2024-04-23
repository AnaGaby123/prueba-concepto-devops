import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GeneralDataComponent} from './general-data.component';
import {GeneralDataRoutingModule} from '@appComponents/pendings/close-offer/close-offer-details/general-data/general-data-routing.module';
import {TranslateModule} from '@ngx-translate/core';
import {VirtualScrollerModule} from '@iharbeck/ngx-virtual-scroller';
import {ProgressBarModule} from '@appComponents/shared/progress-bar/progress-bar.module';
import {CardModule} from '@appComponents/shared/card/card.module';
import {PercentageBarModule} from '@appComponents/shared/percentage-bar/percentage-bar.module';
import {DateFormatModule} from '@appPipes/date-format.module';
import {PqfCardModule} from '@appComponents/shared/pqf-card/pqf-card.module';
import {ProgressBarDetailsModule} from '@appComponents/shared/progress-bar-details/progress-bar-details.module';

@NgModule({
  declarations: [GeneralDataComponent],
  imports: [
    CommonModule,
    GeneralDataRoutingModule,
    TranslateModule,
    VirtualScrollerModule,
    ProgressBarModule,
    CardModule,
    PercentageBarModule,
    DateFormatModule,
    PqfCardModule,
    ProgressBarDetailsModule,
  ],
  exports: [GeneralDataComponent],
})
export class GeneralDataModule {}
