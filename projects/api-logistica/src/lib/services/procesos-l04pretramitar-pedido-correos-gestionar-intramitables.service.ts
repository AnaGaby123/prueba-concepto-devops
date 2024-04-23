/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiLogisticaConfiguration as __Configuration } from '../api-logistica-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { GMGeneraCorreoIntramitables } from '../models/gmgenera-correo-intramitables';
@Injectable({
  providedIn: 'root',
})
class ProcesosL04PretramitarPedidoCorreosGestionarIntramitablesService extends __BaseService {
  static readonly ppPedidoIncidenciaCorreoEnviaCorreoPartidasIncidenciaPath = '/ppPedidoIncidencias/EnviaCorreo';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * EnviaCorreoPartidasIncidencia ppPedidoIncidenciaCorreo
   * @param GMGeneraCorreoIntramitables undefined
   * @return OK
   */
  ppPedidoIncidenciaCorreoEnviaCorreoPartidasIncidenciaResponse(GMGeneraCorreoIntramitables: GMGeneraCorreoIntramitables): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = GMGeneraCorreoIntramitables;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/ppPedidoIncidencias/EnviaCorreo`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'text'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<string>;
      })
    );
  }
  /**
   * EnviaCorreoPartidasIncidencia ppPedidoIncidenciaCorreo
   * @param GMGeneraCorreoIntramitables undefined
   * @return OK
   */
  ppPedidoIncidenciaCorreoEnviaCorreoPartidasIncidencia(GMGeneraCorreoIntramitables: GMGeneraCorreoIntramitables): __Observable<string> {
    return this.ppPedidoIncidenciaCorreoEnviaCorreoPartidasIncidenciaResponse(GMGeneraCorreoIntramitables).pipe(
      __map(_r => _r.body as string)
    );
  }
}

module ProcesosL04PretramitarPedidoCorreosGestionarIntramitablesService {
}

export { ProcesosL04PretramitarPedidoCorreosGestionarIntramitablesService }
