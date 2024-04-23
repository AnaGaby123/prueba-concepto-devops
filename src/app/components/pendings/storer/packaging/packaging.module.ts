import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PackagingRoutingModule} from '@appComponents/pendings/storer/packaging/packaging-routing.module';
import {PackagingComponent} from './packaging.component';

@NgModule({
  declarations: [PackagingComponent],
  imports: [CommonModule, PackagingRoutingModule],
  exports: [PackagingComponent],
})
export class PackagingModule {}
