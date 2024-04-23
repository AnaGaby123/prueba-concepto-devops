/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiLogisticaConfiguration as __Configuration } from '../api-logistica-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { GMtpPedidoTramitarCorreoLiberado } from '../models/gmtp-pedido-tramitar-correo-liberado';
import { GMtpPedidoTramitarCorreo } from '../models/gmtp-pedido-tramitar-correo';
@Injectable({
  providedIn: 'root',
})
class ProcesosL05TramitarPedidoLiberarService extends __BaseService {
  static readonly tpPedidoTramitarEnviaCorreoTramitarPedidoPath = '/tpPedido/TramitarCorreoLiberar';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Proceso con transaccion para tramitacion de pedido y envio de correo.
   * @param GMtpPedidoTramitarCorreo Modelo de campos para el proceso GenararCorreoTramitarPedido.
   * @return OK
   */
  tpPedidoTramitarEnviaCorreoTramitarPedidoResponse(GMtpPedidoTramitarCorreo: GMtpPedidoTramitarCorreo): __Observable<__StrictHttpResponse<GMtpPedidoTramitarCorreoLiberado>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = GMtpPedidoTramitarCorreo;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/tpPedido/TramitarCorreoLiberar`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<GMtpPedidoTramitarCorreoLiberado>;
      })
    );
  }
  /**
   * Proceso con transaccion para tramitacion de pedido y envio de correo.
   * @param GMtpPedidoTramitarCorreo Modelo de campos para el proceso GenararCorreoTramitarPedido.
   * @return OK
   */
  tpPedidoTramitarEnviaCorreoTramitarPedido(GMtpPedidoTramitarCorreo: GMtpPedidoTramitarCorreo): __Observable<GMtpPedidoTramitarCorreoLiberado> {
    return this.tpPedidoTramitarEnviaCorreoTramitarPedidoResponse(GMtpPedidoTramitarCorreo).pipe(
      __map(_r => _r.body as GMtpPedidoTramitarCorreoLiberado)
    );
  }
}

module ProcesosL05TramitarPedidoLiberarService {
}

export { ProcesosL05TramitarPedidoLiberarService }
