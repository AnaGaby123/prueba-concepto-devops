/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiLogisticaConfiguration as __Configuration } from '../api-logistica-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { GMGeneraCorreoOcNoAmparada } from '../models/gmgenera-correo-oc-no-amparada';
@Injectable({
  providedIn: 'root',
})
class ProcesosL04PretramitarPedidoCorreosOcNoAmparadaService extends __BaseService {
  static readonly ppPedidoOcNoAmparadaCorreoEnviaCorreoOcNoAmparadaPath = '/ppPedidoOcNoAmparada/EnviaCorreo';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * EnviaCorreoOcNoAmparada ppPedidoOcNoAmparadaCorreo
   * @param GMGeneraCorreoOcNoAmparada undefined
   * @return OK
   */
  ppPedidoOcNoAmparadaCorreoEnviaCorreoOcNoAmparadaResponse(GMGeneraCorreoOcNoAmparada: GMGeneraCorreoOcNoAmparada): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = GMGeneraCorreoOcNoAmparada;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/ppPedidoOcNoAmparada/EnviaCorreo`,
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
   * EnviaCorreoOcNoAmparada ppPedidoOcNoAmparadaCorreo
   * @param GMGeneraCorreoOcNoAmparada undefined
   * @return OK
   */
  ppPedidoOcNoAmparadaCorreoEnviaCorreoOcNoAmparada(GMGeneraCorreoOcNoAmparada: GMGeneraCorreoOcNoAmparada): __Observable<string> {
    return this.ppPedidoOcNoAmparadaCorreoEnviaCorreoOcNoAmparadaResponse(GMGeneraCorreoOcNoAmparada).pipe(
      __map(_r => _r.body as string)
    );
  }
}

module ProcesosL04PretramitarPedidoCorreosOcNoAmparadaService {
}

export { ProcesosL04PretramitarPedidoCorreosOcNoAmparadaService }
