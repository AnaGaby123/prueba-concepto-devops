import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {VirtualScrollerModule} from '@iharbeck/ngx-virtual-scroller';
import {LoadingModule} from '@appComponents/shared/loading/loading.module';
import {PqfCardComponent} from '@appComponents/shared/pqf-card/pqf-card.component';

@NgModule({
  declarations: [PqfCardComponent],
  imports: [CommonModule, VirtualScrollerModule, LoadingModule],
  exports: [PqfCardComponent],
})
export class PqfCardModule {}
