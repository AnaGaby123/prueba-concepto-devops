/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiCatalogosConfiguration as __Configuration } from '../api-catalogos-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { ResultadoValidadorDireccion } from '../models/resultado-validador-direccion';
import { Direccion } from '../models/direccion';
@Injectable({
  providedIn: 'root',
})
class ConfiguracionDireccionesValidadorService extends __BaseService {
  static readonly ValidarDireccionProcessPath = '/ValidarDireccion';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Process ValidarDireccion
   * @param direccion undefined
   * @return OK
   */
  ValidarDireccionProcessResponse(direccion: Direccion): __Observable<__StrictHttpResponse<ResultadoValidadorDireccion>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = direccion;
    let req = new HttpRequest<any>(
      'PATCH',
      this.rootUrl + `/ValidarDireccion`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ResultadoValidadorDireccion>;
      })
    );
  }
  /**
   * Process ValidarDireccion
   * @param direccion undefined
   * @return OK
   */
  ValidarDireccionProcess(direccion: Direccion): __Observable<ResultadoValidadorDireccion> {
    return this.ValidarDireccionProcessResponse(direccion).pipe(
      __map(_r => _r.body as ResultadoValidadorDireccion)
    );
  }
}

module ConfiguracionDireccionesValidadorService {
}

export { ConfiguracionDireccionesValidadorService }
