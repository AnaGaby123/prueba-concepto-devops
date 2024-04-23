import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ListRightSidebarComponent} from './list-right-sidebar.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {TranslateModule} from '@ngx-translate/core';
import {RadioButtonModule} from '@appComponents/shared/radio-button/radio-button.module';
import {VirtualScrollerModule} from '@iharbeck/ngx-virtual-scroller';
import {GenericTextAreaModule} from '@appComponents/shared/generic-text-area/generic-text-area.module';
import {RegisterProductModule} from '@appComponents/pendings/new-product-existing-supplier/shared/list-right-sidebar/register-product/register-product.module';
import {EffectsModule} from '@ngrx/effects';
import {AttendInvestigationDetailsEffects} from '@appEffects/pendings/attend-investigation/attend-investigation-details/attend-investigation-details.effects';
import {MessageHistoryModule} from '@appComponents/shared/message-history/message-history.module';

@NgModule({
  declarations: [ListRightSidebarComponent],
  imports: [
    CommonModule,
    DragDropModule,
    TranslateModule,
    RadioButtonModule,
    VirtualScrollerModule,
    GenericTextAreaModule,
    RegisterProductModule,
    MessageHistoryModule,
    EffectsModule.forFeature([AttendInvestigationDetailsEffects]),
  ],
  exports: [ListRightSidebarComponent],
})
export class ListRightSidebarModule {}
