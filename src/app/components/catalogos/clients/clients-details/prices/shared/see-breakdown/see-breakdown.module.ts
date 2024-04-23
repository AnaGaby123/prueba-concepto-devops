import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SeeBreakdownComponent} from '@appComponents/catalogos/clients/clients-details/prices/shared/see-breakdown/see-breakdown.component';
import {CustomPositionPopUpModule} from '@appComponents/shared/custom-position-pop-up/custom-position-pop-up.module';
import {SearchModule} from '@appComponents/shared/search/search.module';
import {AccountingModule} from '@appPipes/accounting/accounting.module';
import {TranslateModule} from '@ngx-translate/core';
import {WithoutResultsModule} from '@appComponents/shared/without-results/without-results.module';
import {LoadingModule} from '@appComponents/shared/loading/loading.module';
import {PopUpGenericModule} from '@appComponents/shared/pop-up-generic/pop-up-generic.module';

@NgModule({
  declarations: [SeeBreakdownComponent],
  imports: [
    CommonModule,
    CustomPositionPopUpModule,
    SearchModule,
    AccountingModule,
    TranslateModule,
    WithoutResultsModule,
    LoadingModule,
    PopUpGenericModule,
  ],
  exports: [SeeBreakdownComponent],
})
export class SeeBreakdownModule {}
