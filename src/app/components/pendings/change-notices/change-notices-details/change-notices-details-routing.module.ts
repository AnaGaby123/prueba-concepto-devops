import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {ChangeNoticesDetailsComponent} from '@appComponents/pendings/change-notices/change-notices-details/change-notices-details.component';

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild([{path: '', component: ChangeNoticesDetailsComponent}])],
  exports: [RouterModule],
})
export class ChangeNoticesDetailsRoutingModule {}
