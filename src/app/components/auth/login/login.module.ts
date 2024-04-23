import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {TranslateModule} from '@ngx-translate/core';
import {AuthService} from '@appServices/auth/auth.service';

import {LoginComponent} from './login.component';
import {LoginRoutingModule} from './login-routing.module';
import {PqfLogoVersionModule} from '@appComponents/shared/pqf-logo-version/pqf-logo-version.module';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    LoginRoutingModule,
    PqfLogoVersionModule,
  ],
  providers: [AuthService],
  exports: [],
})
export class LoginModule {}
