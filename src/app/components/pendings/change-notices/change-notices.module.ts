import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ChangeNoticesComponent} from './change-notices.component';
import {ChangeNoticesRoutingModule} from '@appComponents/pendings/change-notices/change-notices-routing.module';
import {HeaderBarModule} from '@appComponents/shared/header-bar/header-bar.module';
import {Action, StoreModule} from '@ngrx/store';
import {PendingNodesKeys, PENDINGS_FEATURE_KEY} from '@appUtil/common.protocols';
import {getReducers} from '@appModels/store/pendings/pendings.models';

@NgModule({
  declarations: [ChangeNoticesComponent],
  imports: [
    CommonModule,
    ChangeNoticesRoutingModule,
    HeaderBarModule,
    StoreModule.forFeature(PENDINGS_FEATURE_KEY, (state, action: Action) =>
      getReducers(state, action, PendingNodesKeys.changeNotices),
    ),
  ],
  exports: [ChangeNoticesComponent],
})
export class ChangeNoticesModule {}
