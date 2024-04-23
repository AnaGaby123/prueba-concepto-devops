import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FeatureGroupItemComponent} from './feature-group-item.component';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  declarations: [FeatureGroupItemComponent],
  imports: [CommonModule, TranslateModule],
  exports: [FeatureGroupItemComponent],
})
export class FeatureGroupItemModule {}
