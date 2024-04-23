import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TableComponent} from './table.component';
import {TranslateModule} from '@ngx-translate/core';
import {VirtualScrollerModule} from '@iharbeck/ngx-virtual-scroller';
import {LoadingModule} from '@appComponents/shared/loading/loading.module';
import {WithoutResultsModule} from '@appComponents/shared/without-results/without-results.module';

@NgModule({
  declarations: [TableComponent],
  imports: [
    CommonModule,
    TranslateModule,
    VirtualScrollerModule,
    LoadingModule,
    WithoutResultsModule,
  ],
  exports: [TableComponent],
})
export class TableModule {}
