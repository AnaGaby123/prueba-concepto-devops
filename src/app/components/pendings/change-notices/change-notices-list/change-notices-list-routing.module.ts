import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {ChangeNoticesListComponent} from '@appComponents/pendings/change-notices/change-notices-list/change-notices-list.component';

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild([{path: '', component: ChangeNoticesListComponent}])],
  exports: [RouterModule],
})
export class ChangeNoticesListRoutingModule {}
