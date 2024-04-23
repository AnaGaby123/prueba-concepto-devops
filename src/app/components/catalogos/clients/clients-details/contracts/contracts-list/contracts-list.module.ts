import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ContractsListComponent} from '@appComponents/catalogos/clients/clients-details/contracts/contracts-list/contracts-list.component';
import {TabsModule} from '@appComponents/shared/tabs/tabs.module';
import {TranslateModule} from '@ngx-translate/core';
import {SearchModule} from '@appComponents/shared/search/search.module';
import {WithoutResultsModule} from '@appComponents/shared/without-results/without-results.module';
import {DateFormatModule} from '@appPipes/date-format.module';
import {UploadViewFileModule} from '@appComponents/shared/upload-view-file/upload-view-file.module';
import {PopUpAlertModule} from '@appComponents/shared/pop-up-alert/pop-up-alert.module';
import {LoadingModule} from '@appComponents/shared/loading/loading.module';
import {EffectsModule} from '@ngrx/effects';
import {ClientContractsFormEffects} from '@appEffects/forms/client-form/clients-details-form/contracts/client-contracts-form.effects';

@NgModule({
  declarations: [ContractsListComponent],
  imports: [
    CommonModule,
    TabsModule,
    TranslateModule,
    SearchModule,
    WithoutResultsModule,
    DateFormatModule,
    UploadViewFileModule,
    PopUpAlertModule,
    LoadingModule,
    EffectsModule.forFeature([ClientContractsFormEffects]),
  ],
  exports: [ContractsListComponent],
})
export class ContractsListModule {}
