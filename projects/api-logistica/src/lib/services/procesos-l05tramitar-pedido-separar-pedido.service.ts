/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiLogisticaConfiguration as __Configuration } from '../api-logistica-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { TpPedido } from '../models/tp-pedido';
import { ParametroSepararPedido } from '../models/parametro-separar-pedido';
@Injectable({
  providedIn: 'root',
})
class ProcesosL05TramitarPedidoSepararPedidoService extends __BaseService {
  static readonly tpPedidoSeparacionProcessPath = '/tpPedidoSeparacion';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Process tpPedidoSeparacion
   * @param parametroSeparacionPedido undefined
   * @return OK
   */
  tpPedidoSeparacionProcessResponse(parametroSeparacionPedido: ParametroSepararPedido): __Observable<__StrictHttpResponse<TpPedido>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = parametroSeparacionPedido;
    let req = new HttpRequest<any>(
      'PATCH',
      this.rootUrl + `/tpPedidoSeparacion`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<TpPedido>;
      })
    );
  }
  /**
   * Process tpPedidoSeparacion
   * @param parametroSeparacionPedido undefined
   * @return OK
   */
  tpPedidoSeparacionProcess(parametroSeparacionPedido: ParametroSepararPedido): __Observable<TpPedido> {
    return this.tpPedidoSeparacionProcessResponse(parametroSeparacionPedido).pipe(
      __map(_r => _r.body as TpPedido)
    );
  }
}

module ProcesosL05TramitarPedidoSepararPedidoService {
}

export { ProcesosL05TramitarPedidoSepararPedidoService }
