/* Core Imports */
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

/* Components Imports */
import {LoadMissingComponent} from '@appComponents/pendings/imports/load-missing/load-missing.component';

/* Module Imports */
import {LoadMissingRoutingModule} from '@appComponents/pendings/imports/load-missing/load-missing-routing.module';
import {HeaderBarModule} from '@appComponents/shared/header-bar/header-bar.module';
import {TranslateModule} from '@ngx-translate/core';
import {Action, StoreModule} from '@ngrx/store';
import {PendingNodesKeys, PENDINGS_FEATURE_KEY} from '@appUtil/common.protocols';
import {getReducers} from '@appModels/store/pendings/pendings.models';

@NgModule({
  imports: [
    CommonModule,
    LoadMissingRoutingModule,
    HeaderBarModule,
    TranslateModule,
    StoreModule.forFeature(PENDINGS_FEATURE_KEY, (state, action: Action) =>
      getReducers(state, action, PendingNodesKeys.imports),
    ),
  ],
  exports: [LoadMissingComponent],
  declarations: [LoadMissingComponent],
})
export class LoadMissingModule {}
