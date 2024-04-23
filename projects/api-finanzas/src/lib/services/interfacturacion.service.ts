/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiFinanzasConfiguration as __Configuration } from '../api-finanzas-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { FiCFDI } from '../models/fi-cfdi';
import { QueryResultFiCFDI } from '../models/query-result-fi-cfdi';
import { QueryInfo } from '../models/query-info';
import { CFDIGenerada } from '../models/cfdigenerada';
import { FiCFDIPartida } from '../models/fi-cfdipartida';
import { QueryResultFiCFDIPartida } from '../models/query-result-fi-cfdipartida';
import { FiPago } from '../models/fi-pago';
import { QueryResultFiPago } from '../models/query-result-fi-pago';
import { FiPendienteInterfacturacion } from '../models/fi-pendiente-interfacturacion';
import { QueryResultFiPendienteInterfacturacion } from '../models/query-result-fi-pendiente-interfacturacion';
@Injectable({
  providedIn: 'root',
})
class InterfacturacionService extends __BaseService {
  static readonly fiCFDIObtenerPath = '/fiCFDI';
  static readonly fiCFDIGuardarOActualizarPath = '/fiCFDI';
  static readonly fiCFDIQueryResultPath = '/fiCFDI';
  static readonly fiCFDIDesactivarPath = '/fiCFDI';
  static readonly fiCFDIExtensionsGenerarFacturaPedidoPath = '/CFDIGeneradaFromfiCFDI';
  static readonly fiCFDIPartidaObtenerPath = '/fiCFDIPartida';
  static readonly fiCFDIPartidaGuardarOActualizarPath = '/fiCFDIPartida';
  static readonly fiCFDIPartidaQueryResultPath = '/fiCFDIPartida';
  static readonly fiCFDIPartidaDesactivarPath = '/fiCFDIPartida';
  static readonly fiPagoObtenerPath = '/fiPago';
  static readonly fiPagoGuardarOActualizarPath = '/fiPago';
  static readonly fiPagoQueryResultPath = '/fiPago';
  static readonly fiPagoDesactivarPath = '/fiPago';
  static readonly fiPendienteInterfacturacionObtenerPath = '/fiPendienteInterfacturacion';
  static readonly fiPendienteInterfacturacionGuardarOActualizarPath = '/fiPendienteInterfacturacion';
  static readonly fiPendienteInterfacturacionQueryResultPath = '/fiPendienteInterfacturacion';
  static readonly fiPendienteInterfacturacionDesactivarPath = '/fiPendienteInterfacturacion';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Obtener un agente aduanal por su idfiCFDI.
   * @param idfiCFDI Identificador del agente aduanal
   * @return OK
   */
  fiCFDIObtenerResponse(idfiCFDI: string): __Observable<__StrictHttpResponse<FiCFDI>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idfiCFDI != null) __params = __params.set('idfiCFDI', idfiCFDI.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/fiCFDI`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<FiCFDI>;
      })
    );
  }
  /**
   * Obtener un agente aduanal por su idfiCFDI.
   * @param idfiCFDI Identificador del agente aduanal
   * @return OK
   */
  fiCFDIObtener(idfiCFDI: string): __Observable<FiCFDI> {
    return this.fiCFDIObtenerResponse(idfiCFDI).pipe(
      __map(_r => _r.body as FiCFDI)
    );
  }

  /**
   * Guardar o actualizar un agente aduanal
   * @param fiCFDI Objeto de agente aduanal
   * @return OK
   */
  fiCFDIGuardarOActualizarResponse(fiCFDI: FiCFDI): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = fiCFDI;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/fiCFDI`,
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
   * Guardar o actualizar un agente aduanal
   * @param fiCFDI Objeto de agente aduanal
   * @return OK
   */
  fiCFDIGuardarOActualizar(fiCFDI: FiCFDI): __Observable<string> {
    return this.fiCFDIGuardarOActualizarResponse(fiCFDI).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Obtener lista de agente aduanal.
   * @param info Objeto de tipo QueryInfo para filtrar agentes aduanales.
   * @return OK
   */
  fiCFDIQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultFiCFDI>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/fiCFDI`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultFiCFDI>;
      })
    );
  }
  /**
   * Obtener lista de agente aduanal.
   * @param info Objeto de tipo QueryInfo para filtrar agentes aduanales.
   * @return OK
   */
  fiCFDIQueryResult(info: QueryInfo): __Observable<QueryResultFiCFDI> {
    return this.fiCFDIQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultFiCFDI)
    );
  }

  /**
   * Desactivar un agente aduanal
   * @param idfiCFDI Identificador de agente aduanal a desactivar
   * @return OK
   */
  fiCFDIDesactivarResponse(idfiCFDI: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idfiCFDI != null) __params = __params.set('idfiCFDI', idfiCFDI.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/fiCFDI`,
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
   * Desactivar un agente aduanal
   * @param idfiCFDI Identificador de agente aduanal a desactivar
   * @return OK
   */
  fiCFDIDesactivar(idfiCFDI: string): __Observable<string> {
    return this.fiCFDIDesactivarResponse(idfiCFDI).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * GenerarFacturaPedido fiCFDIExtensions
   * @param idFICFDI undefined
   * @return OK
   */
  fiCFDIExtensionsGenerarFacturaPedidoResponse(idFICFDI: string): __Observable<__StrictHttpResponse<CFDIGenerada>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idFICFDI != null) __params = __params.set('idFICFDI', idFICFDI.toString());
    let req = new HttpRequest<any>(
      'PATCH',
      this.rootUrl + `/CFDIGeneradaFromfiCFDI`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<CFDIGenerada>;
      })
    );
  }
  /**
   * GenerarFacturaPedido fiCFDIExtensions
   * @param idFICFDI undefined
   * @return OK
   */
  fiCFDIExtensionsGenerarFacturaPedido(idFICFDI: string): __Observable<CFDIGenerada> {
    return this.fiCFDIExtensionsGenerarFacturaPedidoResponse(idFICFDI).pipe(
      __map(_r => _r.body as CFDIGenerada)
    );
  }

  /**
   * Obtener un agente aduanal por su idfiCFDIPartida.
   * @param idfiCFDIPartida Identificador del agente aduanal
   * @return OK
   */
  fiCFDIPartidaObtenerResponse(idfiCFDIPartida: string): __Observable<__StrictHttpResponse<FiCFDIPartida>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idfiCFDIPartida != null) __params = __params.set('idfiCFDIPartida', idfiCFDIPartida.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/fiCFDIPartida`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<FiCFDIPartida>;
      })
    );
  }
  /**
   * Obtener un agente aduanal por su idfiCFDIPartida.
   * @param idfiCFDIPartida Identificador del agente aduanal
   * @return OK
   */
  fiCFDIPartidaObtener(idfiCFDIPartida: string): __Observable<FiCFDIPartida> {
    return this.fiCFDIPartidaObtenerResponse(idfiCFDIPartida).pipe(
      __map(_r => _r.body as FiCFDIPartida)
    );
  }

  /**
   * Guardar o actualizar un agente aduanal
   * @param fiCFDIPartida Objeto de agente aduanal
   * @return OK
   */
  fiCFDIPartidaGuardarOActualizarResponse(fiCFDIPartida: FiCFDIPartida): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = fiCFDIPartida;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/fiCFDIPartida`,
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
   * Guardar o actualizar un agente aduanal
   * @param fiCFDIPartida Objeto de agente aduanal
   * @return OK
   */
  fiCFDIPartidaGuardarOActualizar(fiCFDIPartida: FiCFDIPartida): __Observable<string> {
    return this.fiCFDIPartidaGuardarOActualizarResponse(fiCFDIPartida).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Obtener lista de agente aduanal.
   * @param info Objeto de tipo QueryInfo para filtrar agentes aduanales.
   * @return OK
   */
  fiCFDIPartidaQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultFiCFDIPartida>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/fiCFDIPartida`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultFiCFDIPartida>;
      })
    );
  }
  /**
   * Obtener lista de agente aduanal.
   * @param info Objeto de tipo QueryInfo para filtrar agentes aduanales.
   * @return OK
   */
  fiCFDIPartidaQueryResult(info: QueryInfo): __Observable<QueryResultFiCFDIPartida> {
    return this.fiCFDIPartidaQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultFiCFDIPartida)
    );
  }

  /**
   * Desactivar un agente aduanal
   * @param idfiCFDIPartida Identificador de agente aduanal a desactivar
   * @return OK
   */
  fiCFDIPartidaDesactivarResponse(idfiCFDIPartida: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idfiCFDIPartida != null) __params = __params.set('idfiCFDIPartida', idfiCFDIPartida.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/fiCFDIPartida`,
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
   * Desactivar un agente aduanal
   * @param idfiCFDIPartida Identificador de agente aduanal a desactivar
   * @return OK
   */
  fiCFDIPartidaDesactivar(idfiCFDIPartida: string): __Observable<string> {
    return this.fiCFDIPartidaDesactivarResponse(idfiCFDIPartida).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Obtener un agente aduanal por su idfiPago.
   * @param idfiPago Identificador del agente aduanal
   * @return OK
   */
  fiPagoObtenerResponse(idfiPago: string): __Observable<__StrictHttpResponse<FiPago>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idfiPago != null) __params = __params.set('idfiPago', idfiPago.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/fiPago`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<FiPago>;
      })
    );
  }
  /**
   * Obtener un agente aduanal por su idfiPago.
   * @param idfiPago Identificador del agente aduanal
   * @return OK
   */
  fiPagoObtener(idfiPago: string): __Observable<FiPago> {
    return this.fiPagoObtenerResponse(idfiPago).pipe(
      __map(_r => _r.body as FiPago)
    );
  }

  /**
   * Guardar o actualizar un agente aduanal
   * @param fiPago Objeto de agente aduanal
   * @return OK
   */
  fiPagoGuardarOActualizarResponse(fiPago: FiPago): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = fiPago;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/fiPago`,
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
   * Guardar o actualizar un agente aduanal
   * @param fiPago Objeto de agente aduanal
   * @return OK
   */
  fiPagoGuardarOActualizar(fiPago: FiPago): __Observable<string> {
    return this.fiPagoGuardarOActualizarResponse(fiPago).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Obtener lista de agente aduanal.
   * @param info Objeto de tipo QueryInfo para filtrar agentes aduanales.
   * @return OK
   */
  fiPagoQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultFiPago>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/fiPago`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultFiPago>;
      })
    );
  }
  /**
   * Obtener lista de agente aduanal.
   * @param info Objeto de tipo QueryInfo para filtrar agentes aduanales.
   * @return OK
   */
  fiPagoQueryResult(info: QueryInfo): __Observable<QueryResultFiPago> {
    return this.fiPagoQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultFiPago)
    );
  }

  /**
   * Desactivar un agente aduanal
   * @param idfiPago Identificador de agente aduanal a desactivar
   * @return OK
   */
  fiPagoDesactivarResponse(idfiPago: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idfiPago != null) __params = __params.set('idfiPago', idfiPago.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/fiPago`,
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
   * Desactivar un agente aduanal
   * @param idfiPago Identificador de agente aduanal a desactivar
   * @return OK
   */
  fiPagoDesactivar(idfiPago: string): __Observable<string> {
    return this.fiPagoDesactivarResponse(idfiPago).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Obtener un agente aduanal por su idfiPendienteInterfacturacion.
   * @param idfiPendienteInterfacturacion Identificador del agente aduanal
   * @return OK
   */
  fiPendienteInterfacturacionObtenerResponse(idfiPendienteInterfacturacion: string): __Observable<__StrictHttpResponse<FiPendienteInterfacturacion>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idfiPendienteInterfacturacion != null) __params = __params.set('idfiPendienteInterfacturacion', idfiPendienteInterfacturacion.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/fiPendienteInterfacturacion`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<FiPendienteInterfacturacion>;
      })
    );
  }
  /**
   * Obtener un agente aduanal por su idfiPendienteInterfacturacion.
   * @param idfiPendienteInterfacturacion Identificador del agente aduanal
   * @return OK
   */
  fiPendienteInterfacturacionObtener(idfiPendienteInterfacturacion: string): __Observable<FiPendienteInterfacturacion> {
    return this.fiPendienteInterfacturacionObtenerResponse(idfiPendienteInterfacturacion).pipe(
      __map(_r => _r.body as FiPendienteInterfacturacion)
    );
  }

  /**
   * Guardar o actualizar un agente aduanal
   * @param fiPendienteInterfacturacion Objeto de agente aduanal
   * @return OK
   */
  fiPendienteInterfacturacionGuardarOActualizarResponse(fiPendienteInterfacturacion: FiPendienteInterfacturacion): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = fiPendienteInterfacturacion;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/fiPendienteInterfacturacion`,
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
   * Guardar o actualizar un agente aduanal
   * @param fiPendienteInterfacturacion Objeto de agente aduanal
   * @return OK
   */
  fiPendienteInterfacturacionGuardarOActualizar(fiPendienteInterfacturacion: FiPendienteInterfacturacion): __Observable<string> {
    return this.fiPendienteInterfacturacionGuardarOActualizarResponse(fiPendienteInterfacturacion).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Obtener lista de agente aduanal.
   * @param info Objeto de tipo QueryInfo para filtrar agentes aduanales.
   * @return OK
   */
  fiPendienteInterfacturacionQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultFiPendienteInterfacturacion>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/fiPendienteInterfacturacion`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultFiPendienteInterfacturacion>;
      })
    );
  }
  /**
   * Obtener lista de agente aduanal.
   * @param info Objeto de tipo QueryInfo para filtrar agentes aduanales.
   * @return OK
   */
  fiPendienteInterfacturacionQueryResult(info: QueryInfo): __Observable<QueryResultFiPendienteInterfacturacion> {
    return this.fiPendienteInterfacturacionQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultFiPendienteInterfacturacion)
    );
  }

  /**
   * Desactivar un agente aduanal
   * @param idfiPendienteInterfacturacion Identificador de agente aduanal a desactivar
   * @return OK
   */
  fiPendienteInterfacturacionDesactivarResponse(idfiPendienteInterfacturacion: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idfiPendienteInterfacturacion != null) __params = __params.set('idfiPendienteInterfacturacion', idfiPendienteInterfacturacion.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/fiPendienteInterfacturacion`,
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
   * Desactivar un agente aduanal
   * @param idfiPendienteInterfacturacion Identificador de agente aduanal a desactivar
   * @return OK
   */
  fiPendienteInterfacturacionDesactivar(idfiPendienteInterfacturacion: string): __Observable<string> {
    return this.fiPendienteInterfacturacionDesactivarResponse(idfiPendienteInterfacturacion).pipe(
      __map(_r => _r.body as string)
    );
  }
}

module InterfacturacionService {
}

export { InterfacturacionService }
