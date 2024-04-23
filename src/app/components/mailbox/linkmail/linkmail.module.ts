import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LinkmailComponent} from '@appComponents/mailbox/linkmail/linkmail.component';
import {LinkmailRoutingModule} from '@appComponents/mailbox/linkmail/linkmail-routing.module';
import {UploadViewFileModule} from '@appComponents/shared/upload-view-file/upload-view-file.module';
import {WithoutResultsModule} from '@appComponents/shared/without-results/without-results.module';
import {PqfCardModule} from '@appComponents/shared/pqf-card/pqf-card.module';

@NgModule({
  declarations: [LinkmailComponent],
  imports: [
    CommonModule,
    LinkmailRoutingModule,
    UploadViewFileModule,
    WithoutResultsModule,
    PqfCardModule,
  ],
  exports: [LinkmailComponent],
})
export class LinkmailModule {}
