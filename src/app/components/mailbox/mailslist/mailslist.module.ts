import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MailslistComponent} from './mailslist.component';
import {HeaderBarModule} from '@appComponents/shared/header-bar/header-bar.module';
import {HamburgerMenuModule} from '@appComponents/shared/hamburger-menu/hamburger-menu.module';
import {SearchModule} from '@appComponents/shared/search/search.module';
import {GenericInputModule} from '@appComponents/shared/generic-input/generic-input.module';
import {CheckBoxModule} from '@appComponents/shared/check-box/check-box.module';
import {RadioButtonModule} from '@appComponents/shared/radio-button/radio-button.module';
import {VirtualScrollerModule} from '@iharbeck/ngx-virtual-scroller';
import {MailslistRoutingModule} from '@appComponents/mailbox/mailslist/mailslist-routing.module';
import {DateFormatModule} from '@appPipes/date-format.module';
import {WithoutResultsModule} from '@appComponents/shared/without-results/without-results.module';
import {UploadViewFileModule} from '@appComponents/shared/upload-view-file/upload-view-file.module';
import {DropDownListModule} from '@appComponents/shared/drop-down-list/drop-down-list.module';
import {OmissionClassificationComponent} from './classifications/omission-classification/omission-classification.component';
import {TranslateModule} from '@ngx-translate/core';
import {TextFormatModule} from '@appPipes/text-format/text-format.module';
import {LoadingModule} from '@appComponents/shared/loading/loading.module';
import {BurgerMenuModule} from '@appComponents/shared/burger-menu/burger-menu.module';
import {PqfGenericPopUpModule} from '@appComponents/shared/pqf-generic-pop-up/pqf-generic-pop-up.module';
import {DraggableModalModule} from '@appComponents/shared/draggable-modal/draggable-modal.module';

@NgModule({
  declarations: [MailslistComponent, OmissionClassificationComponent],
  imports: [
    CommonModule,
    HeaderBarModule,
    HamburgerMenuModule,
    SearchModule,
    GenericInputModule,
    CheckBoxModule,
    RadioButtonModule,
    VirtualScrollerModule,
    MailslistRoutingModule,
    DateFormatModule,
    WithoutResultsModule,
    UploadViewFileModule,
    DropDownListModule,
    TranslateModule,
    TextFormatModule,
    LoadingModule,
    BurgerMenuModule,
    PqfGenericPopUpModule,
    DraggableModalModule,
  ],
  exports: [MailslistComponent],
})
export class MailslistModule {}
