import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BrandsDetailsComponent} from '@appComponents/catalogos/brands/brands-details/brands-details.component';
import {BrandsDetailsRoutingModule} from './brands-details-routing.module';
import {CardModule} from '@appComponents/shared/card/card.module';
import {TranslateModule} from '@ngx-translate/core';
import {PqfDropDownListModule} from '@appComponents/shared/pqf-drop-down-list/pqf-drop-down-list.module';
import {VirtualScrollerModule} from '@iharbeck/ngx-virtual-scroller';
import {CardWithToggleModule} from '@appComponents/catalogos/brands/brands-details/card-with-toggle/card-with-toggle.module';
import {PqfCheckBoxModule} from '@appComponents/shared/pqf-check-box/pqf-check-box.module';
import {ChecksListComponent} from './checks-list/checks-list.component';
import {EffectsModule} from '@ngrx/effects';
import {BrandFormDetailsMethodsEffects} from '@appEffects/forms/brand-form/brand-form-details/brand-form-details-methods.effects';
import {PqfGenericInputModule} from '@appComponents/shared/pqf-generic-input/pqf-generic-input.module';
import {PopUpGenericModule} from '@appComponents/shared/pop-up-generic/pop-up-generic.module';
import {DateFormatModule} from '@appPipes/date-format.module';
import {PqfPopUpDialogModule} from '@appComponents/shared/pqf-pop-up-dialog/pqf-pop-up-dialog.module';

@NgModule({
  declarations: [BrandsDetailsComponent, ChecksListComponent],
  imports: [
    CommonModule,
    BrandsDetailsRoutingModule,
    CardModule,
    TranslateModule,
    PqfDropDownListModule,
    VirtualScrollerModule,
    CardWithToggleModule,
    PqfCheckBoxModule,
    EffectsModule.forFeature([BrandFormDetailsMethodsEffects]),
    PqfGenericInputModule,
    PopUpGenericModule,
    PqfPopUpDialogModule,
    DateFormatModule,
  ],
  exports: [BrandsDetailsComponent],
})
export class BrandsDetailsModule {}
