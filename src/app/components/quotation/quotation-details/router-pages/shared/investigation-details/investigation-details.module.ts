import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InvestigationDetailsComponent} from './investigation-details.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {TranslateModule} from '@ngx-translate/core';
import {RadioButtonModule} from '@appComponents/shared/radio-button/radio-button.module';
import {VirtualScrollerModule} from '@iharbeck/ngx-virtual-scroller';
import {GenericTextAreaModule} from '@appComponents/shared/generic-text-area/generic-text-area.module';
import {MessageHistoryModule} from '@appComponents/shared/message-history/message-history.module';

@NgModule({
  declarations: [InvestigationDetailsComponent],
  imports: [
    CommonModule,
    DragDropModule,
    TranslateModule,
    RadioButtonModule,
    VirtualScrollerModule,
    GenericTextAreaModule,
    MessageHistoryModule,
  ],
  exports: [InvestigationDetailsComponent],
})
export class InvestigationDetailsModule {}
