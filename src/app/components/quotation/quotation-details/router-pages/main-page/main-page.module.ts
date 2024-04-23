import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TranslateModule} from '@ngx-translate/core';
import {MainPageComponent} from '@appComponents/quotation/quotation-details/router-pages/main-page/main-page.component';
import {ProductsManagerModule} from '@appComponents/quotation/quotation-details/router-pages/main-page/products-manager/products-manager.module';
import {MainPageRoutingModule} from '@appComponents/quotation/quotation-details/router-pages/main-page/main-page-routing.module';
import {LinkNewContactPopUpModule} from '@appComponents/quotation/quotation-details/client-info-side-bar/link-new-contact/link-new-contact-pop-up/link-new-contact-pop-up.module';
import {LinkNewContactAddPopUpModule} from '@appComponents/quotation/quotation-details/client-info-side-bar/link-new-contact/link-new-contact-add-pop-up/link-new-contact-add-pop-up.module';
import {LinkNewContactAddPopUpSuccessModule} from '@appComponents/quotation/quotation-details/client-info-side-bar/link-new-contact/link-new-contact-add-pop-up-success/link-new-contact-add-pop-up-success.module';
import {PqfCardModule} from '@appComponents/shared/pqf-card/pqf-card.module';

@NgModule({
  declarations: [MainPageComponent],
  imports: [
    CommonModule,
    TranslateModule,
    ProductsManagerModule,
    MainPageRoutingModule,
    LinkNewContactPopUpModule,
    LinkNewContactAddPopUpModule,
    LinkNewContactAddPopUpSuccessModule,
    PqfCardModule,
  ],
  exports: [MainPageComponent],
})
export class MainPageModule {}
