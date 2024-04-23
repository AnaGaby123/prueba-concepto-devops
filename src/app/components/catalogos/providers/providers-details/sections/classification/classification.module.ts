import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ClassificationComponent} from '@appComponents/catalogos/providers/providers-details/sections/classification/classification.component';
import {CardModule} from '@appComponents/shared/card/card.module';
import {GenericInputModule} from '@appComponents/shared/generic-input/generic-input.module';
import {TranslateModule} from '@ngx-translate/core';
import {WithoutResultsModule} from '@appComponents/shared/without-results/without-results.module';
import {EffectsModule} from '@ngrx/effects';
import {ProviderFormStep7ClassificationEffects} from '@appEffects/forms/providers/providers-details/provider-form-step-7-classification.effects';
import {ProviderFormStep7ClassificationMethodsEffects} from '@appEffects/forms/providers/providers-details/provider-details-methods/provider-form-step-7-classification-methods.effects';
import {PqfCardModule} from '@appComponents/shared/pqf-card/pqf-card.module';
import {ConfirmDialogModule} from '@appComponents/shared/confirm-dialog/confirm-dialog.module';

@NgModule({
  declarations: [ClassificationComponent],
  exports: [ClassificationComponent],
  imports: [
    CommonModule,
    CardModule,
    GenericInputModule,
    TranslateModule,
    WithoutResultsModule,
    EffectsModule.forFeature([
      ProviderFormStep7ClassificationEffects,
      ProviderFormStep7ClassificationMethodsEffects,
    ]),
    PqfCardModule,
    ConfirmDialogModule,
  ],
})
export class ClassificationModule {}
