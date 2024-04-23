import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {VirtualScrollerModule} from '@iharbeck/ngx-virtual-scroller';
import {CardComponent} from '@appComponents/shared/card/card.component';
import {LoadingModule} from '@appComponents/shared/loading/loading.module';

@NgModule({
  declarations: [CardComponent],
  imports: [CommonModule, VirtualScrollerModule, LoadingModule],
  exports: [CardComponent],
})
export class CardModule {}
