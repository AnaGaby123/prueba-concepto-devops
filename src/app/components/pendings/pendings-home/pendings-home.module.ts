import {NgModule} from '@angular/core';
import {PendingsHomeComponent} from '@appComponents/pendings/pendings-home/pendings-home.component';
import {CommonModule} from '@angular/common';
import {PendingsHomeRoutingModule} from '@appComponents/pendings/pendings-home/pendings-home-routing.module';
import {HeaderBarModule} from '@appComponents/shared/header-bar/header-bar.module';
import {WithoutResultsModule} from '@appComponents/shared/without-results/without-results.module';

@NgModule({
  imports: [PendingsHomeRoutingModule, CommonModule, HeaderBarModule, WithoutResultsModule],
  exports: [PendingsHomeComponent],
  declarations: [PendingsHomeComponent],
})
export class PendingsHomeModule {}
