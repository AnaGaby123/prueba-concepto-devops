import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ValidateAuthCodeDialogComponent} from './validate-auth-code-dialog.component';
import {PopUpGenericModule} from '@appComponents/shared/pop-up-generic/pop-up-generic.module';
import {TranslateModule} from '@ngx-translate/core';
import {ClientDataModule} from '@appComponents/shared/request-auth-code-dialog/client-data/client-data.module';
import {EffectsModule} from '@ngrx/effects';
import {AuthCodeDialogEffects} from '@appEffects/dialogs/auth-code/auth-code-dialog.effects';

@NgModule({
  declarations: [ValidateAuthCodeDialogComponent],
  imports: [
    CommonModule,
    PopUpGenericModule,
    TranslateModule,
    ClientDataModule,
    EffectsModule.forFeature([AuthCodeDialogEffects]),
  ],
})
export class ValidateAuthCodeDialogModule {}
