import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GeneralDataComponent} from '@appComponents/catalogos/clients/clients-details/general-data/general-data.component';
import {GeneralDataRoutingModule} from '@appComponents/catalogos/clients/clients-details/general-data/general-data-routing.module';
import {CheckBoxModule} from '@appComponents/shared/check-box/check-box.module';
import {GenericInputModule} from '@appComponents/shared/generic-input/generic-input.module';
import {DropDownListModule} from '@appComponents/shared/drop-down-list/drop-down-list.module';
import {VirtualScrollerModule} from '@iharbeck/ngx-virtual-scroller';
import {ContactItemModule} from '@appComponents/shared/contact-item/contact-item.module';
import {WithoutResultsModule} from '@appComponents/shared/without-results/without-results.module';
import {TranslateModule} from '@ngx-translate/core';
import {DateFormatModule} from '@appPipes/date-format.module';
import {PopUpGenericModule} from '@appComponents/shared/pop-up-generic/pop-up-generic.module';
import {EffectsModule} from '@ngrx/effects';
import {GeneralDataClientsFormMethodsEffects} from '@appEffects/forms/client-form/clients-details-form/general-data/general-data-clients-form-methods.effects';
import {GeneralDataClientsFormEffects} from '@appEffects/forms/client-form/clients-details-form/general-data/general-data-clients-form.effects';
import {AddContactDialogComponent} from './add-contact-dialog/add-contact-dialog.component';

@NgModule({
  declarations: [GeneralDataComponent, AddContactDialogComponent],
  imports: [
    CommonModule,
    GeneralDataRoutingModule,
    CheckBoxModule,
    GenericInputModule,
    DropDownListModule,
    VirtualScrollerModule,
    ContactItemModule,
    WithoutResultsModule,
    TranslateModule,
    DateFormatModule,
    PopUpGenericModule,
    EffectsModule.forFeature([GeneralDataClientsFormMethodsEffects, GeneralDataClientsFormEffects]),
  ],
  exports: [GeneralDataComponent],
})
export class GeneralDataModule {}
