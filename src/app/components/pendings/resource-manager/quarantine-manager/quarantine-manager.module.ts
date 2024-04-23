import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {QuarantineManagerComponent} from '@appComponents/pendings/resource-manager/quarantine-manager/quarantine-manager.component';
import {QuarantineManagerRoutingModule} from '@appComponents/pendings/resource-manager/quarantine-manager/quarantine-manager-routing.module';
import {HeaderBarModule} from '@appComponents/shared/header-bar/header-bar.module';
import {DropDownListModule} from '@appComponents/shared/drop-down-list/drop-down-list.module';
import {TranslateModule} from '@ngx-translate/core';
import {Action, StoreModule} from '@ngrx/store';
import {PendingNodesKeys, PENDINGS_FEATURE_KEY} from '@appUtil/common.protocols';
import {getReducers} from '@appModels/store/pendings/pendings.models';

@NgModule({
  declarations: [QuarantineManagerComponent],
  imports: [
    CommonModule,
    QuarantineManagerRoutingModule,
    HeaderBarModule,
    DropDownListModule,
    TranslateModule,
    StoreModule.forFeature(PENDINGS_FEATURE_KEY, (state, action: Action) =>
      getReducers(state, action, PendingNodesKeys.resourceManager),
    ),
  ],
  exports: [QuarantineManagerComponent],
})
export class QuarantineManagerModule {}
