import {ErrorHandler, Injectable} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import * as servicesLogger from '@appUtil/logger';
import {NGXLogger} from 'ngx-logger';

/** Application-wide error handler that adds a UI notification to the error handling
 * provided by the default Angular ErrorHandler.
 */
@Injectable()
export class AppErrorHandler extends ErrorHandler {
  constructor(private logger: NGXLogger) {
    super();
  }

  handleError(error: Error | HttpErrorResponse) {
    this.logger.error(
      servicesLogger.generateMessage('app-error-handler', servicesLogger.LOG_FAILED, ''),
      error,
    );
    // super.handleError(error);
  }
}
