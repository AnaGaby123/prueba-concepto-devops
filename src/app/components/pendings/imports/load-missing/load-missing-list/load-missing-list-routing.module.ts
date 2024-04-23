/* Core Imports */
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

/* Components Imports */
import {LoadMissingListComponent} from '@appComponents/pendings/imports/load-missing/load-missing-list/load-missing-list.component';

@NgModule({
  imports: [RouterModule.forChild([{path: '', component: LoadMissingListComponent}])],
  exports: [RouterModule],
})
export class LoadMissingListRoutingModule {}
