/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiCatalogosConfiguration as __Configuration } from '../api-catalogos-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { VersionSistema } from '../models/version-sistema';
import { VUsuarioDetalle } from '../models/vusuario-detalle';
@Injectable({
  providedIn: 'root',
})
class SistemaService extends __BaseService {
  static readonly HomeIndexPath = '/';
  static readonly HomeWhoAmIPath = '/WhoAmI';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Acción principal del sistema, con la versión de compilado dependiendo de la cabecera de Mercurial.
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
   * Acción principal del sistema, con la versión de compilado dependiendo de la cabecera de Mercurial.
   * @return OK
   */
  HomeIndex(): __Observable<{[key: string]: VersionSistema}> {
    return this.HomeIndexResponse().pipe(
      __map(_r => _r.body as {[key: string]: VersionSistema})
    );
  }

  /**
   * WhoAmI Home
   * @return OK
   */
  HomeWhoAmIResponse(): __Observable<__StrictHttpResponse<VUsuarioDetalle>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/WhoAmI`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<VUsuarioDetalle>;
      })
    );
  }
  /**
   * WhoAmI Home
   * @return OK
   */
  HomeWhoAmI(): __Observable<VUsuarioDetalle> {
    return this.HomeWhoAmIResponse().pipe(
      __map(_r => _r.body as VUsuarioDetalle)
    );
  }
}

module SistemaService {
}

export { SistemaService }
