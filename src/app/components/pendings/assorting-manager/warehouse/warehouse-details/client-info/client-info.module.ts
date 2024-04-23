/* Core Imports */
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

/* Components Imports */
import {ClientInfoComponent} from '@appComponents/pendings/assorting-manager/warehouse/warehouse-details/client-info/client-info.component';

/* Module Imports */
import {ClientInfoRoutingModule} from '@appComponents/pendings/assorting-manager/warehouse/warehouse-details/client-info/client-info-routing.module';
import {TranslateModule} from '@ngx-translate/core';
import {VirtualScrollerModule} from '@iharbeck/ngx-virtual-scroller';
import {GenericInputModule} from '@appComponents/shared/generic-input/generic-input.module';
import {GenericInputFileModule} from '@appComponents/shared/generic-input-file/generic-input-file.module';
import {WithoutResultsModule} from '@appComponents/shared/without-results/without-results.module';

@NgModule({
  imports: [
    CommonModule,
    ClientInfoRoutingModule,
    TranslateModule,
    VirtualScrollerModule,
    GenericInputModule,
    GenericInputFileModule,
    WithoutResultsModule,
  ],
  exports: [ClientInfoComponent],
  declarations: [ClientInfoComponent],
})
export class ClientInfoModule {}
