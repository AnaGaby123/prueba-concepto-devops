import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {GuideClientListComponent} from '@appComponents/pendings/guide-client/guide-client/guide-client-list/guide-client-list.component';

@NgModule({
  imports: [RouterModule.forChild([{path: '', component: GuideClientListComponent}])],
  exports: [RouterModule],
})
export class GuideClientListRoutingModule {}
