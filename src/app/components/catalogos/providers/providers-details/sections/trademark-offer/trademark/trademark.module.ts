import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TrademarkComponent} from '@appComponents/catalogos/providers/providers-details/sections/trademark-offer/trademark/trademark.component';
import {TranslateModule} from '@ngx-translate/core';
import {TabsModule} from '@appComponents/shared/tabs/tabs.module';
import {SearchModule} from '@appComponents/shared/search/search.module';
import {VirtualScrollerModule} from '@iharbeck/ngx-virtual-scroller';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {WithoutResultsModule} from '@appComponents/shared/without-results/without-results.module';
import {LoadingModule} from '@appComponents/shared/loading/loading.module';
import {PopUpGenericModule} from '@appComponents/shared/pop-up-generic/pop-up-generic.module';
import {CheckBoxModule} from '@appComponents/shared/check-box/check-box.module';
import {GenericInputModule} from '@appComponents/shared/generic-input/generic-input.module';
import {FormsModule} from '@angular/forms';
import {GenericGridItemModule} from '@appComponents/shared/generic-grid-item/generic-grid-item.module';
import {AssociatedTrademarkItemModule} from '@appComponents/catalogos/providers/providers-details/sections/trademark-offer/trademark/associated-trademark-item/associated-trademark-item.module';

@NgModule({
  declarations: [TrademarkComponent],
  exports: [TrademarkComponent],
  imports: [
    CommonModule,
    TranslateModule,
    TabsModule,
    SearchModule,
    VirtualScrollerModule,
    DragDropModule,
    WithoutResultsModule,
    LoadingModule,
    PopUpGenericModule,
    CheckBoxModule,
    GenericInputModule,
    FormsModule,
    GenericGridItemModule,
    AssociatedTrademarkItemModule,
  ],
})
export class TrademarkModule {}
