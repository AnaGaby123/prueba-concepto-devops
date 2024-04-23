import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {OrderStoppedByCreditComponent} from '@appComponents/pendings/order-stopped-by-credit/order-stopped-by-credit.component';
import {HeaderBarModule} from '@appComponents/shared/header-bar/header-bar.module';
import {OrderStoppedByCreditRoutingModule} from '@appComponents/pendings/order-stopped-by-credit/order-stopped-by-credit-routing.module';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [OrderStoppedByCreditComponent],
  imports: [CommonModule, HeaderBarModule, OrderStoppedByCreditRoutingModule, RouterModule],
  exports: [OrderStoppedByCreditComponent],
})
export class OrderStoppedByCreditModule {}
