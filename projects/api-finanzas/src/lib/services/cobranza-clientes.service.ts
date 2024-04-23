/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiFinanzasConfiguration as __Configuration } from '../api-finanzas-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { FccPagoCliente } from '../models/fcc-pago-cliente';
import { QueryResultFccPagoCliente } from '../models/query-result-fcc-pago-cliente';
import { QueryInfo } from '../models/query-info';
import { FccPagoFacturaPedido } from '../models/fcc-pago-factura-pedido';
import { QueryResultFccPagoFacturaPedido } from '../models/query-result-fcc-pago-factura-pedido';
@Injectable({
  providedIn: 'root',
})
class CobranzaClientesService extends __BaseService {
  static readonly fccPagoClienteObtenerPath = '/fccPagoCliente';
  static readonly fccPagoClienteGuardarOActualizarPath = '/fccPagoCliente';
  static readonly fccPagoClienteQueryResultPath = '/fccPagoCliente';
  static readonly fccPagoClienteDesactivarPath = '/fccPagoCliente';
  static readonly fccPagoFacturaPedidoObtenerPath = '/fccPagoFacturaPedido';
  static readonly fccPagoFacturaPedidoGuardarOActualizarPath = '/fccPagoFacturaPedido';
  static readonly fccPagoFacturaPedidoQueryResultPath = '/fccPagoFacturaPedido';
  static readonly fccPagoFacturaPedidoDesactivarPath = '/fccPagoFacturaPedido';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Obtener fccPagoCliente por su idfccPagoCliente
   * @param idfccPagoCliente Identificador de fccPagoCliente
   * @return OK
   */
  fccPagoClienteObtenerResponse(idfccPagoCliente: string): __Observable<__StrictHttpResponse<FccPagoCliente>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idfccPagoCliente != null) __params = __params.set('idfccPagoCliente', idfccPagoCliente.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/fccPagoCliente`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<FccPagoCliente>;
      })
    );
  }
  /**
   * Obtener fccPagoCliente por su idfccPagoCliente
   * @param idfccPagoCliente Identificador de fccPagoCliente
   * @return OK
   */
  fccPagoClienteObtener(idfccPagoCliente: string): __Observable<FccPagoCliente> {
    return this.fccPagoClienteObtenerResponse(idfccPagoCliente).pipe(
      __map(_r => _r.body as FccPagoCliente)
    );
  }

  /**
   * Guardar o actualizar una dirección de empresa.
   * @param fccPagoCliente Dirección de empresa.
   * @return OK
   */
  fccPagoClienteGuardarOActualizarResponse(fccPagoCliente: FccPagoCliente): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = fccPagoCliente;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/fccPagoCliente`,
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
   * Guardar o actualizar una dirección de empresa.
   * @param fccPagoCliente Dirección de empresa.
   * @return OK
   */
  fccPagoClienteGuardarOActualizar(fccPagoCliente: FccPagoCliente): __Observable<string> {
    return this.fccPagoClienteGuardarOActualizarResponse(fccPagoCliente).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Obtener lista de fccPagoCliente
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  fccPagoClienteQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultFccPagoCliente>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/fccPagoCliente`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultFccPagoCliente>;
      })
    );
  }
  /**
   * Obtener lista de fccPagoCliente
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  fccPagoClienteQueryResult(info: QueryInfo): __Observable<QueryResultFccPagoCliente> {
    return this.fccPagoClienteQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultFccPagoCliente)
    );
  }

  /**
   * Desactivar un fccPagoCliente.
   * @param idfccPagoCliente Identificador de elemento a desactivar.
   * @return OK
   */
  fccPagoClienteDesactivarResponse(idfccPagoCliente: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idfccPagoCliente != null) __params = __params.set('idfccPagoCliente', idfccPagoCliente.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/fccPagoCliente`,
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
   * Desactivar un fccPagoCliente.
   * @param idfccPagoCliente Identificador de elemento a desactivar.
   * @return OK
   */
  fccPagoClienteDesactivar(idfccPagoCliente: string): __Observable<string> {
    return this.fccPagoClienteDesactivarResponse(idfccPagoCliente).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Obtener fccPagoFacturaPedido por su idfccPagoFacturaPedido
   * @param idfccPagoFacturaPedido Identificador de fccPagoFacturaPedido
   * @return OK
   */
  fccPagoFacturaPedidoObtenerResponse(idfccPagoFacturaPedido: string): __Observable<__StrictHttpResponse<FccPagoFacturaPedido>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idfccPagoFacturaPedido != null) __params = __params.set('idfccPagoFacturaPedido', idfccPagoFacturaPedido.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/fccPagoFacturaPedido`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<FccPagoFacturaPedido>;
      })
    );
  }
  /**
   * Obtener fccPagoFacturaPedido por su idfccPagoFacturaPedido
   * @param idfccPagoFacturaPedido Identificador de fccPagoFacturaPedido
   * @return OK
   */
  fccPagoFacturaPedidoObtener(idfccPagoFacturaPedido: string): __Observable<FccPagoFacturaPedido> {
    return this.fccPagoFacturaPedidoObtenerResponse(idfccPagoFacturaPedido).pipe(
      __map(_r => _r.body as FccPagoFacturaPedido)
    );
  }

  /**
   * Guardar o actualizar una dirección de empresa.
   * @param fccPagoFacturaPedido Dirección de empresa.
   * @return OK
   */
  fccPagoFacturaPedidoGuardarOActualizarResponse(fccPagoFacturaPedido: FccPagoFacturaPedido): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = fccPagoFacturaPedido;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/fccPagoFacturaPedido`,
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
   * Guardar o actualizar una dirección de empresa.
   * @param fccPagoFacturaPedido Dirección de empresa.
   * @return OK
   */
  fccPagoFacturaPedidoGuardarOActualizar(fccPagoFacturaPedido: FccPagoFacturaPedido): __Observable<string> {
    return this.fccPagoFacturaPedidoGuardarOActualizarResponse(fccPagoFacturaPedido).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Obtener lista de fccPagoFacturaPedido
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  fccPagoFacturaPedidoQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultFccPagoFacturaPedido>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/fccPagoFacturaPedido`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultFccPagoFacturaPedido>;
      })
    );
  }
  /**
   * Obtener lista de fccPagoFacturaPedido
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  fccPagoFacturaPedidoQueryResult(info: QueryInfo): __Observable<QueryResultFccPagoFacturaPedido> {
    return this.fccPagoFacturaPedidoQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultFccPagoFacturaPedido)
    );
  }

  /**
   * Desactivar un fccPagoFacturaPedido.
   * @param idfccPagoFacturaPedido Identificador de elemento a desactivar.
   * @return OK
   */
  fccPagoFacturaPedidoDesactivarResponse(idfccPagoFacturaPedido: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idfccPagoFacturaPedido != null) __params = __params.set('idfccPagoFacturaPedido', idfccPagoFacturaPedido.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/fccPagoFacturaPedido`,
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
   * Desactivar un fccPagoFacturaPedido.
   * @param idfccPagoFacturaPedido Identificador de elemento a desactivar.
   * @return OK
   */
  fccPagoFacturaPedidoDesactivar(idfccPagoFacturaPedido: string): __Observable<string> {
    return this.fccPagoFacturaPedidoDesactivarResponse(idfccPagoFacturaPedido).pipe(
      __map(_r => _r.body as string)
    );
  }
}

module CobranzaClientesService {
}

export { CobranzaClientesService }
