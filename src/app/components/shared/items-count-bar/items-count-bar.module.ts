import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ItemsCountBarComponent} from '@appComponents/shared/items-count-bar/items-count-bar.component';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  declarations: [ItemsCountBarComponent],
  imports: [CommonModule, TranslateModule],
  exports: [ItemsCountBarComponent],
})
export class ItemsCountBarModule {}
