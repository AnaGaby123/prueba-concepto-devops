import {NgModule} from '@angular/core';
import {CoreContainerComponent} from '@appComponents/core-container/core-container.component';
import {PopUpAlertModule} from '@appComponents/shared/pop-up-alert/pop-up-alert.module';
import {CommonModule} from '@angular/common';
import {AlertSuccesModule} from '@appComponents/shared/alert-succes/alert-succes.module';
import {RouterModule} from '@angular/router';
import {NavBarComponent} from '@appComponents/core-container/nav-bar/nav-bar.component';
import {HeaderComponent} from '@appComponents/core-container/header/header.component';
import {FooterComponent} from '@appComponents/core-container/footer/footer.component';
import {TranslateModule} from '@ngx-translate/core';
import {DraggableModalModule} from '@appComponents/shared/draggable-modal/draggable-modal.module';
import {UploadViewFileModule} from '@appComponents/shared/upload-view-file/upload-view-file.module';
import {PqfGeneralLoadingModule} from '@appComponents/shared/pqf-general-loading/pqf-general-loading.module';
import {PqfLogoVersionModule} from '@appComponents/shared/pqf-logo-version/pqf-logo-version.module';
import {StoreModule} from '@ngrx/store';
import {DIALOGS_FEATURE_KEY} from '@appUtil/common.protocols';
import {dialgosReducer} from '@appReducers/dialogs/dialogs.reducer';
import {CustomPositionPopUpNotesModule} from '@appComponents/shared/custom-position-pop-up-notes/custom-position-pop-up-notes.module';
import {ImageFileModule} from '@appComponents/shared/draggable-modal/components/image-file/image-file.module';
import {PqfDraggableModalModule} from '@appComponents/shared/pqf-draggable-modal/pqf-draggable-modal.module';
import {EffectsModule} from '@ngrx/effects';
import {PendingsCounterEffects} from '@appEffects/pendings/signalR/pendingsCounter.effects';

@NgModule({
  imports: [
    PopUpAlertModule,
    CommonModule,
    AlertSuccesModule,
    RouterModule,
    TranslateModule,
    DraggableModalModule,
    UploadViewFileModule,
    PqfGeneralLoadingModule,
    PqfLogoVersionModule,
    StoreModule.forFeature(DIALOGS_FEATURE_KEY, dialgosReducer),
    CustomPositionPopUpNotesModule,
    ImageFileModule,
    PqfDraggableModalModule,
    EffectsModule.forFeature([PendingsCounterEffects]),
  ],
  exports: [CoreContainerComponent, HeaderComponent],
  declarations: [CoreContainerComponent, NavBarComponent, HeaderComponent, FooterComponent],
})
export class CoreContainerModule {}
