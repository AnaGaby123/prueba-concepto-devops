import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ConsolidateComponent} from './consolidate.component';
import {TranslateModule} from '@ngx-translate/core';
import {SearchModule} from '@appComponents/shared/search/search.module';
import {VirtualScrollerModule} from '@iharbeck/ngx-virtual-scroller';
import {DateFormatModule} from '@appPipes/date-format.module';
import {LoadingModule} from '@appComponents/shared/loading/loading.module';
import {WithoutResultsModule} from '@appComponents/shared/without-results/without-results.module';
import {DragDropModule} from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [ConsolidateComponent],
  imports: [
    CommonModule,
    TranslateModule,
    SearchModule,
    VirtualScrollerModule,
    DateFormatModule,
    LoadingModule,
    WithoutResultsModule,
    DragDropModule,
  ],
  exports: [ConsolidateComponent],
})
export class ConsolidateModule {}
