import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LogisticComponent} from '@appComponents/catalogos/products/products-details/logistic/logistic.component';
import {LogisticRoutingModule} from '@appComponents/catalogos/products/products-details/logistic/logistic-routing.module';
import {TranslateModule} from '@ngx-translate/core';
import {ProductItemGeneralInfoComponent} from '@appComponents/catalogos/products/products-details/product-item-general-info/product-item-general-info.component';
import {DropDownListModule} from '@appComponents/shared/drop-down-list/drop-down-list.module';
import {GenericInputFileModule} from '@appComponents/shared/generic-input-file/generic-input-file.module';
import {GenericInputModule} from '@appComponents/shared/generic-input/generic-input.module';
import {RadioButtonModule} from '@appComponents/shared/radio-button/radio-button.module';
import {WithoutResultsModule} from '@appComponents//shared/without-results/without-results.module';
import {DateFormatModule} from '@appPipes/date-format.module';
import {EffectsModule} from '@ngrx/effects';
import {ProductsFormLogisticEffects} from '@appEffects/forms/product-form/product-details-form/logistic/logistic.effects';

@NgModule({
  declarations: [LogisticComponent, ProductItemGeneralInfoComponent],
  imports: [
    CommonModule,
    LogisticRoutingModule,
    TranslateModule,
    DropDownListModule,
    GenericInputFileModule,
    GenericInputModule,
    RadioButtonModule,
    WithoutResultsModule,
    DateFormatModule,
    EffectsModule.forFeature([ProductsFormLogisticEffects]),
  ],
  exports: [LogisticComponent, ProductItemGeneralInfoComponent],
})
export class LogisticModule {}
