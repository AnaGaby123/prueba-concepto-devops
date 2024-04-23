import {NgModule} from '@angular/core';
import {DetailsComponent} from '@appComponents/pendings/daily-meeting/daily-meeting-details/details/details.component';
import {CommonModule} from '@angular/common';
import {DetailsRoutingModule} from '@appComponents/pendings/daily-meeting/daily-meeting-details/details/details-routing.module';
import {TranslateModule} from '@ngx-translate/core';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [DetailsComponent],
  imports: [CommonModule, DetailsRoutingModule, TranslateModule, RouterModule],
  exports: [DetailsComponent],
})
export class DetailsModule {}
