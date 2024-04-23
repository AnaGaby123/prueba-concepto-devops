import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ClientsDetailsComponent} from '@appComponents/catalogos/clients/clients-details/clients-details.component';
import {ClientsDetailsRoutingModule} from '@appComponents/catalogos/clients/clients-details/clients-details-routing.module';
import {TabsModule} from '@appComponents/shared/tabs/tabs.module';
import {TranslateModule} from '@ngx-translate/core';
import {PopUpGenericModule} from '@appComponents/shared/pop-up-generic/pop-up-generic.module';
import {WithoutResultsModule} from '@appComponents/shared/without-results/without-results.module';
import {VirtualScrollerModule} from '@iharbeck/ngx-virtual-scroller';
import {SearchModule} from '@appComponents/shared/search/search.module';
import {GenericInputModule} from '@appComponents/shared/generic-input/generic-input.module';
import {ToggleSwitchModule} from '@appComponents/shared/toggle-switch/toggle-switch.module';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {LoadingModule} from '@appComponents/shared/loading/loading.module';
import {DropDownListModule} from '@appComponents/shared/drop-down-list/drop-down-list.module';
import {CardModule} from '@appComponents/shared/card/card.module';
import {DateFormatModule} from '@appPipes/date-format.module';
import {CheckBoxModule} from '@appComponents/shared/check-box/check-box.module';
import {GenericInputFileModule} from '@appComponents/shared/generic-input-file/generic-input-file.module';
import {RadioButtonModule} from '@appComponents/shared/radio-button/radio-button.module';
import {GenericTextAreaModule} from '@appComponents/shared/generic-text-area/generic-text-area.module';
import {PopUpConfiguracionModule} from '@appComponents/shared/pop-up-configuracion/pop-up-configuracion.module';
import {PqfToggleSwitchModule} from '@appComponents/shared/pqf-toggle-switch/pqf-toggle-switch.module';
import {EffectsModule} from '@ngrx/effects';
import {ClientDetailsFormMethodsEffects} from '@appEffects/forms/client-form/clients-details-form/client-details-form-methods.effects';
import {ClientsDetailsFormEffects} from '@appEffects/forms/client-form/clients-details-form/clients-details-form.effects';
import {ConfirmDialogModule} from '@appComponents/shared/confirm-dialog/confirm-dialog.module';

@NgModule({
  declarations: [ClientsDetailsComponent],
  imports: [
    CommonModule,
    ClientsDetailsRoutingModule,
    TabsModule,
    TranslateModule,
    PopUpGenericModule,
    WithoutResultsModule,
    VirtualScrollerModule,
    SearchModule,
    GenericInputModule,
    ToggleSwitchModule,
    DragDropModule,
    LoadingModule,
    DropDownListModule,
    CardModule,
    DateFormatModule,
    CheckBoxModule,
    GenericInputFileModule,
    RadioButtonModule,
    GenericTextAreaModule,
    WithoutResultsModule,
    VirtualScrollerModule,
    SearchModule,
    GenericInputModule,
    ToggleSwitchModule,
    DragDropModule,
    LoadingModule,
    DropDownListModule,
    CardModule,
    PopUpConfiguracionModule,
    PqfToggleSwitchModule,
    ConfirmDialogModule,
    EffectsModule.forFeature([ClientDetailsFormMethodsEffects, ClientsDetailsFormEffects]),
  ],
  exports: [ClientsDetailsComponent],
})
export class ClientsDetailsModule {}
