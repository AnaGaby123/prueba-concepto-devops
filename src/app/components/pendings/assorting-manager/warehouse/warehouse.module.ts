/* Core Imports */
import {NgModule} from '@angular/core';

/* Common Imports */
import {CommonModule} from '@angular/common';

/* Components Imports */
import {WarehouseComponent} from './warehouse.component';

/* Module Imports */
import {WarehouseRoutingModule} from '@appComponents/pendings/assorting-manager/warehouse/warehouse-routing.module';
import {HeaderBarModule} from '@appComponents/shared/header-bar/header-bar.module';
import {PopUpGenericModule} from '@appComponents/shared/pop-up-generic/pop-up-generic.module';
import {DropDownListModule} from '@appComponents/shared/drop-down-list/drop-down-list.module';
import {AccountingModule} from '@appPipes/accounting/accounting.module';
import {TranslateModule} from '@ngx-translate/core';
import {Action, StoreModule} from '@ngrx/store';
import {PendingNodesKeys, PENDINGS_FEATURE_KEY} from '@appUtil/common.protocols';
import {getReducers} from '@appModels/store/pendings/pendings.models';

@NgModule({
  declarations: [WarehouseComponent],
  imports: [
    CommonModule,
    WarehouseRoutingModule,
    HeaderBarModule,
    PopUpGenericModule,
    DropDownListModule,
    AccountingModule,
    TranslateModule,
    StoreModule.forFeature(PENDINGS_FEATURE_KEY, (state, action: Action) =>
      getReducers(state, action, PendingNodesKeys.assortingManager),
    ),
  ],
  exports: [WarehouseComponent],
})
export class WarehouseModule {}
