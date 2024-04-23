/* Core Imports */
import {Injectable} from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import {Store} from '@ngrx/store';
import {Observable, throwError} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';

/* Services Imports */
import {LocalStorageService} from '@appCore/local-storage/local-storage.service';

/* Models Imports */
/* Selectors Imports */
import {selectToken} from '@appSelectors/auth/auth.selectors';

/* Tools Imports */
import {getHeadersGet, getHeadersPost} from './api-headers.helper';
import {AUTH_KEY} from '@appUtil/common.protocols';

/* Dev Tools */
import {NGXLogger} from 'ngx-logger';
import * as servicesLogger from '@appUtil/logger';
import {AppState} from '@appCore/core.state';
import {Idle} from '@ng-idle/core';
import {SET_LOADING, SET_LOADING_ERROR} from '@appActions/utils/utils.action';
import {compact, concat, forEach, isEmpty, isString} from 'lodash-es';
import {regexValidatorForUrl} from '@appHelpers/shared/shared.helpers';
import {environment} from '@env/environment';

const FILE_NAME = 'http-auth.interceptor';

@Injectable()
export class HttpAuthInterceptor implements HttpInterceptor {
  constructor(
    private store: Store<AppState>,
    private session: LocalStorageService,
    private logger: NGXLogger,
    private _idle: Idle,
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this._idle.interrupt();
    // DOCS: Se colocan las IP de environment según el entorno sin importar las generadas automáticamente
    request = request.clone({
      url: request.url.replace(regexValidatorForUrl, environment.serverUrl.toString()),
    });

    const {method, headers} = request;
    const packUserSessionData: any = this.session.getItem(AUTH_KEY);
    let token = packUserSessionData?.token?.access_token ?? '';
    if (!token) {
      // TODO: Si no existe la sesión
      this.store.select(selectToken).subscribe((data) => (token = data.access_token));
    }

    let shouldSetHeaders = false;
    // DOCS: No le pega al token a las peticiones relacionadas al identity
    if (
      token &&
      !headers.get('Authorization') &&
      !request.url.includes('connect/token') &&
      !request.url.includes('googleapis')
    ) {
      shouldSetHeaders = true;
    }

    if (shouldSetHeaders) {
      request = request.clone({
        headers: method === 'GET' ? getHeadersGet(token) : getHeadersPost(token),
      });
    }

    this.logger.debug(
      servicesLogger.generateMessage(FILE_NAME, request.method, request.url ? request.url : ''),
      request.body ?? '',
    );

    return next.handle(request).pipe(
      tap(() => {}),
      catchError((err: HttpErrorResponse) => {
        this.logger.error(
          servicesLogger.generateMessage(FILE_NAME, servicesLogger.LOG_FAILED, 'en la petición'),
          err,
        );
        let {error} = err;
        error = error && isString(error) ? JSON.parse(error) : error;
        const message = this.getErrorMessage(error);
        this.store.dispatch(SET_LOADING({payload: false}));
        // DOCS: Si es alguna petición de login no se muestra el modal de error
        if (
          !request.url.includes('connect/token') &&
          !request.url.includes('connect/userinfo') &&
          !request.url.includes('WhoAmI')
        ) {
          this.store.dispatch(SET_LOADING_ERROR({active: true, message}));
        }
        return throwError(() => error);
      }),
    );
  }

  getErrorMessage(error: any) {
    const getInnerExceptionErrorMessage = (error) => {
      if (!isEmpty(error.InnerException) && error.InnerException !== null) {
        return getInnerExceptionErrorMessage(error.InnerException);
      } else {
        return error.Message ? error.Message : 'Ocurrió un error en la operación';
      }
    };

    const getFluentValidationErrorMessage = (error) => {
      let errorsArray = [];
      const add = (errors: object) => {
        for (let key in errors) {
          errorsArray = compact(concat(errorsArray, `${key}: ${errors[key].join(', ')}`));
        }
      };
      if (Array.isArray(error.ModelState)) {
        forEach(error.ModelState, (obj: object) => {
          add(obj);
        });
      } else {
        add(error.ModelState);
      }
      return !isEmpty(errorsArray) ? errorsArray.join(', ') : 'Ocurrió un error en la operación';
    };

    return error.hasOwnProperty('InnerException')
      ? getInnerExceptionErrorMessage(error)
      : getFluentValidationErrorMessage(error);
  }
}
