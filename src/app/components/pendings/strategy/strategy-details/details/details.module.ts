import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DetailsComponent} from '@appComponents/pendings/strategy/strategy-details/details/details.component';
import {DetailsRoutingModule} from '@appComponents/pendings/strategy/strategy-details/details/details-routing.module';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  declarations: [DetailsComponent],
  imports: [CommonModule, DetailsRoutingModule, TranslateModule],
  exports: [DetailsComponent],
})
export class DetailsModule {}
