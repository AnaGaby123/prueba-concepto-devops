import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DeclareArrivalDetailsRoutingModule} from '@purchasing-manager/declare-arrival/declare-arrival-details/declare-arrival-details-routing.module';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {DeclareArrivalDetailsComponent} from '@purchasing-manager/declare-arrival/declare-arrival-details/declare-arrival-details.component';
import {TranslateModule} from '@ngx-translate/core';
import {HamburgerMenuModule} from '@appComponents/shared/hamburger-menu/hamburger-menu.module';
import {SearchModule} from '@appComponents/shared/search/search.module';
import {VirtualScrollerModule} from '@iharbeck/ngx-virtual-scroller';
import {WithoutResultsModule} from '@appComponents/shared/without-results/without-results.module';
import {TabsModule} from '@appComponents/shared/tabs/tabs.module';
import {AlphabetFilterModule} from '@appComponents/shared/alphabet-filter/alphabet-filter.module';
import {DropDownListModule} from '@appComponents/shared/drop-down-list/drop-down-list.module';
import {CheckBoxModule} from '@appComponents/shared/check-box/check-box.module';
import {GenericInputFileModule} from '@appComponents/shared/generic-input-file/generic-input-file.module';
import {LoadingModule} from '@appComponents/shared/loading/loading.module';
import {GenericInputModule} from '@appComponents/shared/generic-input/generic-input.module';
import {ProviderContactsModule} from '@appComponents/shared/provider-contacts/provider-contacts.module';

@NgModule({
  declarations: [DeclareArrivalDetailsComponent],
  imports: [
    CommonModule,
    DeclareArrivalDetailsRoutingModule,
    DragDropModule,
    TranslateModule,
    HamburgerMenuModule,
    SearchModule,
    VirtualScrollerModule,
    WithoutResultsModule,
    TabsModule,
    AlphabetFilterModule,
    DropDownListModule,
    CheckBoxModule,
    GenericInputFileModule,
    LoadingModule,
    GenericInputModule,
    ProviderContactsModule,
  ],
  exports: [DeclareArrivalDetailsComponent],
})
export class DeclareArrivalDetailsModule {}
