import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PackagingDashboardComponent} from './packaging-dashboard.component';
import {PackagingDashboardRoutingModule} from '@appComponents/pendings/storer/packaging/packaging-dashboard/packaging-dashboard-routing.module';

@NgModule({
  declarations: [PackagingDashboardComponent],
  imports: [CommonModule, PackagingDashboardRoutingModule],
})
export class PackagingDashboardModule {}
