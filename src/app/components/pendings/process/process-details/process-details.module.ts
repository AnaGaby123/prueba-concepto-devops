import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProcessDetailsComponent} from './process-details.component';
import {ProcessDetailsRoutingModule} from '@appComponents/pendings/process/process-details/process-details-routing.module';
import {VirtualScrollerModule} from '@iharbeck/ngx-virtual-scroller';
import {LoadingModule} from '@appComponents/shared/loading/loading.module';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  declarations: [ProcessDetailsComponent],
  imports: [
    CommonModule,
    ProcessDetailsRoutingModule,
    VirtualScrollerModule,
    LoadingModule,
    TranslateModule,
  ],
  exports: [ProcessDetailsComponent],
})
export class ProcessDetailsModule {}
