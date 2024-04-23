/* Core Imports */
import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Store} from '@ngrx/store';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import * as servicesLogger from '@appUtil/logger';

/* Services Imports */
/* Actions Imports */
import {SET_LOGIN_TOKEN, SET_RETURN_URL} from '@appActions/auth/auth.actions';

/* Selectors Imports */
/* Imports Models */
import {AuthState, IUser} from '@appModels/store/auth/auth.models';
import {AuthService} from '@appServices/auth/auth.service';
import {Observable, Subscription} from 'rxjs';
import {selectCurrentBrowser} from '@appSelectors/settings/settings.selectors';
import {Browsers} from '@appHelpers/shared/shared.helpers';
import {AppToken} from '@appModels/auth/token.model';
import {NGXLogger} from 'ngx-logger';
import {appRoutes} from '@appHelpers/core/app-routes';

/* Dev Tools */

const FILE_NAME = 'login.component.ts';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, AfterViewInit, OnDestroy {
  currentBrowser$: Observable<string> = this.store.select(selectCurrentBrowser);
  showPassword: boolean;
  loginForm: FormGroup;
  returnUrl: string;
  passwordIsFocus: boolean;
  login: Subscription;
  readonly browserTypes = Browsers;

  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store<AuthState>,
    private authService: AuthService,
    private logger: NGXLogger,
  ) {
    this.passwordIsFocus = false;
    this.showPassword = false;
    this.loginForm = new FormGroup({
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(100),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(100),
      ]),
    });
  }

  ngOnInit(): void {
    this.returnUrl = this.activatedRoute.snapshot.queryParams.returnUrl || appRoutes.protected;
    this.store.dispatch(SET_RETURN_URL({returnUrl: this.returnUrl}));
  }

  ngAfterViewInit() {
    Object.keys(this.loginForm.controls).forEach((field) => {
      const control = this.loginForm.get(field);
      control.markAsTouched();
      control.setErrors(null);
    });
  }
  ngOnDestroy() {
    this.login.unsubscribe();
  }

  onSubmit(user: IUser): void {
    this.login = this.authService.connectToken(user).subscribe(
      (token: AppToken) => {
        this.logger.debug(
          servicesLogger.generateMessage(
            FILE_NAME,
            servicesLogger.LOG_SUCCEEDED,
            'Al obtener el token',
          ),
          token,
        );
        this.store.dispatch(SET_LOGIN_TOKEN({token}));
      },
      (error) => {
        this.logger.error(
          servicesLogger.generateMessage(
            FILE_NAME,
            servicesLogger.LOG_FAILED,
            'Al obtener el token',
          ),
          error.message,
        );
        Object.keys(this.loginForm.controls).forEach((field) => {
          const control = this.loginForm.get(field);
          control.markAsTouched();
          control.setErrors({required: true});
        });
        this.loginForm.setErrors({loginError: true});
      },
    );
  }
}
