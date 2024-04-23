import {ErrorHandler, Injectable, Injector} from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {isEmpty, isString} from 'lodash-es';
import {Store} from '@ngrx/store';
import {SET_LOADING, SET_LOADING_ERROR} from '@appActions/utils/utils.action';
import * as servicesLogger from '@appUtil/logger';
import {NGXLogger} from 'ngx-logger';

/** Passes HttpErrorResponse to application-wide error handler */
@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(private injector: Injector, private store: Store, private logger: NGXLogger) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      tap({
        error: (err: any) => {
          this.logger.debug(
            servicesLogger.generateMessage(
              'http-error.interceptor.ts',
              servicesLogger.LOG_FAILED,
              'Intercept Error',
            ),
          );
          if (err instanceof HttpErrorResponse) {
            let {error} = err;
            error = error && isString(error) ? JSON.parse(error) : error;
            const message = this.getErrorMessage(error);
            this.store.dispatch(SET_LOADING({payload: false}));
            this.store.dispatch(SET_LOADING_ERROR({active: true, message}));
            const appErrorHandler = this.injector.get(ErrorHandler);
            appErrorHandler.handleError(err);
          }
        },
      }),
    );
  }

  getErrorMessage(err: any) {
    const get = (collection) => {
      if (!isEmpty(collection.InnerException) && collection.InnerException !== null) {
        return get(collection.InnerException);
      } else {
        return collection.Message ? collection.Message : 'Ocurrió un error';
      }
    };
    return get(err);
  }
}
