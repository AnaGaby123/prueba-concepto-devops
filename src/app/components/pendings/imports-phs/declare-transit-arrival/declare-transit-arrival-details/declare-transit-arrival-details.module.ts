import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DeclareTransitArrivalDetailsComponent} from './declare-transit-arrival-details.component';
import {DeclareTransitArrivalDetailsRoutingModule} from '@appComponents/pendings/imports-phs/declare-transit-arrival/declare-transit-arrival-details/declare-transit-arrival-details-routing.module';
import {TranslateModule} from '@ngx-translate/core';
import {TabsModule} from '@appComponents/shared/tabs/tabs.module';
import {HamburgerMenuModule} from '@appComponents/shared/hamburger-menu/hamburger-menu.module';
import {SearchModule} from '@appComponents/shared/search/search.module';
import {VirtualScrollerModule} from '@iharbeck/ngx-virtual-scroller';
import {AlphabetFilterModule} from '@appComponents/shared/alphabet-filter/alphabet-filter.module';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {DropDownListModule} from '@appComponents/shared/drop-down-list/drop-down-list.module';
import {GenericInputModule} from '@appComponents/shared/generic-input/generic-input.module';
import {GenericInputFileModule} from '@appComponents/shared/generic-input-file/generic-input-file.module';
import {CheckBoxModule} from '@appComponents/shared/check-box/check-box.module';
import {LoadingModule} from '@appComponents/shared/loading/loading.module';
import {WithoutResultsModule} from '@appComponents/shared/without-results/without-results.module';
import {DateFormatModule} from '@appPipes/date-format.module';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [DeclareTransitArrivalDetailsComponent],
  imports: [
    CommonModule,
    DeclareTransitArrivalDetailsRoutingModule,
    TranslateModule,
    TabsModule,
    HamburgerMenuModule,
    SearchModule,
    VirtualScrollerModule,
    AlphabetFilterModule,
    DragDropModule,
    DropDownListModule,
    GenericInputModule,
    GenericInputFileModule,
    CheckBoxModule,
    LoadingModule,
    WithoutResultsModule,
    DateFormatModule,
    FormsModule,
  ],
  exports: [DeclareTransitArrivalDetailsComponent],
})
export class DeclareTransitArrivalDetailsModule {}
