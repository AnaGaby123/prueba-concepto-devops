import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PackagingDetailsRoutingModule} from '@appComponents/pendings/storer/packaging/packaging-details/packaging-details-routing.module';
import {PackagingDetailsComponent} from '@appComponents/pendings/storer/packaging/packaging-details/packaging-details.component';

@NgModule({
  declarations: [PackagingDetailsComponent],
  imports: [CommonModule, PackagingDetailsRoutingModule],
})
export class PackagingDetailsModule {}
