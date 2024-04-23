import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {TranslateModule} from '@ngx-translate/core';

import {ForgotPasswordComponent} from './forgot-password.component';
import {ForgotPasswordRoutingModule} from './forgot-password-routing.module';

@NgModule({
  declarations: [ForgotPasswordComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    ForgotPasswordRoutingModule,
  ],
})
export class ForgotPasswordModule {}
