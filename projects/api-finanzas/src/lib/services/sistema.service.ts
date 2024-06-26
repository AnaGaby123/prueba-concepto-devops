/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiFinanzasConfiguration as __Configuration } from '../api-finanzas-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { VersionSistema } from '../models/version-sistema';
@Injectable({
  providedIn: 'root',
})
class SistemaService extends __BaseService {
  static readonly HomeIndexPath = '/';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Index Home
   * @return OK
   */
  HomeIndexResponse(): __Observable<__StrictHttpResponse<{[key: string]: VersionSistema}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{[key: string]: VersionSistema}>;
      })
    );
  }
  /**
   * Index Home
   * @return OK
   */
  HomeIndex(): __Observable<{[key: string]: VersionSistema}> {
    return this.HomeIndexResponse().pipe(
      __map(_r => _r.body as {[key: string]: VersionSistema})
    );
  }
}

module SistemaService {
}

export { SistemaService }
