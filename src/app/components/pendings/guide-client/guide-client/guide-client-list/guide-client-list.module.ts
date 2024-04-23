import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GuideClientListRoutingModule} from '@appComponents/pendings/guide-client/guide-client/guide-client-list/guide-client-list-routing.module';
import {GuideClientListComponent} from '@appComponents/pendings/guide-client/guide-client/guide-client-list/guide-client-list.component';
import {TranslateModule} from '@ngx-translate/core';
import {SearchModule} from '@appComponents/shared/search/search.module';
import {UploadViewFileModule} from '@appComponents/shared/upload-view-file/upload-view-file.module';
import {GenericInputModule} from '@appComponents/shared/generic-input/generic-input.module';
import {DropDownListModule} from '@appComponents/shared/drop-down-list/drop-down-list.module';
import {VirtualScrollerModule} from '@iharbeck/ngx-virtual-scroller';

@NgModule({
  imports: [
    CommonModule,
    GuideClientListRoutingModule,
    TranslateModule,
    SearchModule,
    UploadViewFileModule,
    GenericInputModule,
    DropDownListModule,
    VirtualScrollerModule,
  ],
  exports: [GuideClientListComponent],
  declarations: [GuideClientListComponent],
})
export class GuideClientListModule {}
