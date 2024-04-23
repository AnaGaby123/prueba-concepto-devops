/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiLogisticaConfiguration as __Configuration } from '../api-logistica-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { GMCotCotizacionDetalle } from '../models/gmcot-cotizacion-detalle';
import { GMPPedidoGeneraCotizacion } from '../models/gmppedido-genera-cotizacion';
import { GMPPPedidoRecalcular } from '../models/gmpppedido-recalcular';
@Injectable({
  providedIn: 'root',
})
class ProcesosL04PretramitarPedidoRecalcularService extends __BaseService {
  static readonly ppPedidoGenerarCotizacionIntramitablePpPedidoGenerarCotizacionIntramitablePath = '/ppPedidoIntramitableGenerarCotizacion';
  static readonly ppPedidoRecalcularPpPedidoRecalcularPath = '/ppPedidoRecalcular';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Generación y envio de cotización a partir de pedido intramitable
   * @param GMPPedidoGeneraCotizacion
   * @return OK
   */
  ppPedidoGenerarCotizacionIntramitablePpPedidoGenerarCotizacionIntramitableResponse(GMPPedidoGeneraCotizacion: GMPPedidoGeneraCotizacion): __Observable<__StrictHttpResponse<GMCotCotizacionDetalle>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = GMPPedidoGeneraCotizacion;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/ppPedidoIntramitableGenerarCotizacion`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<GMCotCotizacionDetalle>;
      })
    );
  }
  /**
   * Generación y envio de cotización a partir de pedido intramitable
   * @param GMPPedidoGeneraCotizacion
   * @return OK
   */
  ppPedidoGenerarCotizacionIntramitablePpPedidoGenerarCotizacionIntramitable(GMPPedidoGeneraCotizacion: GMPPedidoGeneraCotizacion): __Observable<GMCotCotizacionDetalle> {
    return this.ppPedidoGenerarCotizacionIntramitablePpPedidoGenerarCotizacionIntramitableResponse(GMPPedidoGeneraCotizacion).pipe(
      __map(_r => _r.body as GMCotCotizacionDetalle)
    );
  }

  /**
   * Endpoint que recalcula partidas de un pedido si aplica flete express y/o última milla, segun la dirección de entrega
   * @param GMPPPedidoRecalcular Modelo que contiene la
   * @return OK
   */
  ppPedidoRecalcularPpPedidoRecalcularResponse(GMPPPedidoRecalcular: GMPPPedidoRecalcular): __Observable<__StrictHttpResponse<GMCotCotizacionDetalle>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = GMPPPedidoRecalcular;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/ppPedidoRecalcular`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<GMCotCotizacionDetalle>;
      })
    );
  }
  /**
   * Endpoint que recalcula partidas de un pedido si aplica flete express y/o última milla, segun la dirección de entrega
   * @param GMPPPedidoRecalcular Modelo que contiene la
   * @return OK
   */
  ppPedidoRecalcularPpPedidoRecalcular(GMPPPedidoRecalcular: GMPPPedidoRecalcular): __Observable<GMCotCotizacionDetalle> {
    return this.ppPedidoRecalcularPpPedidoRecalcularResponse(GMPPPedidoRecalcular).pipe(
      __map(_r => _r.body as GMCotCotizacionDetalle)
    );
  }
}

module ProcesosL04PretramitarPedidoRecalcularService {
}

export { ProcesosL04PretramitarPedidoRecalcularService }
