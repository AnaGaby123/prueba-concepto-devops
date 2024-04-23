import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {SecurityGuardDetailsComponent} from '@appComponents/pendings/storer/security-guard/security-guard-details/security-guard-details.component';

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild([{path: '', component: SecurityGuardDetailsComponent}])],
})
export class SecurityGuardDetailsRoutingModule {}
