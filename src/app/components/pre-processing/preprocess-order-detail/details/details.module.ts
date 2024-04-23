import {NgModule} from '@angular/core';
import {DetailsComponent} from '@appComponents/pre-processing/preprocess-order-detail/details/details.component';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {DetailsRoutingModule} from '@appComponents/pre-processing/preprocess-order-detail/details/details-routing.module';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  imports: [CommonModule, FormsModule, RouterModule, DetailsRoutingModule, TranslateModule],
  exports: [DetailsComponent],
  declarations: [DetailsComponent],
})
export class DetailsModule {}
