/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiLogisticaConfiguration as __Configuration } from '../api-logistica-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { CorreoRecibidoClienteRequerimientoObj } from '../models/correo-recibido-cliente-requerimiento-obj';
@Injectable({
  providedIn: 'root',
})
class ProcesosMailbotService extends __BaseService {
  static readonly CorreoRecibidoClienteRequerimientoObtenerPath = '/ObtenerRequerimiento';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Obtener CorreoRecibidoClienteRequerimiento
   * @param IdCorreoRecibidoCliente undefined
   * @return OK
   */
  CorreoRecibidoClienteRequerimientoObtenerResponse(IdCorreoRecibidoCliente: string): __Observable<__StrictHttpResponse<CorreoRecibidoClienteRequerimientoObj>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (IdCorreoRecibidoCliente != null) __params = __params.set('IdCorreoRecibidoCliente', IdCorreoRecibidoCliente.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/ObtenerRequerimiento`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<CorreoRecibidoClienteRequerimientoObj>;
      })
    );
  }
  /**
   * Obtener CorreoRecibidoClienteRequerimiento
   * @param IdCorreoRecibidoCliente undefined
   * @return OK
   */
  CorreoRecibidoClienteRequerimientoObtener(IdCorreoRecibidoCliente: string): __Observable<CorreoRecibidoClienteRequerimientoObj> {
    return this.CorreoRecibidoClienteRequerimientoObtenerResponse(IdCorreoRecibidoCliente).pipe(
      __map(_r => _r.body as CorreoRecibidoClienteRequerimientoObj)
    );
  }
}

module ProcesosMailbotService {
}

export { ProcesosMailbotService }
