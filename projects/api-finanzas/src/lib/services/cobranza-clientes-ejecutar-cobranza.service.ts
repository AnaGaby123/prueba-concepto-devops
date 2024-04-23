/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiFinanzasConfiguration as __Configuration } from '../api-finanzas-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { CalendarioEjecutarCobranzaPeriodo } from '../models/calendario-ejecutar-cobranza-periodo';
import { CalendarioEjecutarCobranzaPeriodoParametro } from '../models/calendario-ejecutar-cobranza-periodo-parametro';
import { FccFolioPagoCliente } from '../models/fcc-folio-pago-cliente';
import { QueryResultFccFolioPagoCliente } from '../models/query-result-fcc-folio-pago-cliente';
import { QueryInfo } from '../models/query-info';
import { QueryResultVFacturaClienteCalendario } from '../models/query-result-vfactura-cliente-calendario';
import { QueryResultVFacturaClienteCalendarioTotales } from '../models/query-result-vfactura-cliente-calendario-totales';
import { QueryResultVFCCFolioPagoCliente } from '../models/query-result-vfccfolio-pago-cliente';
@Injectable({
  providedIn: 'root',
})
class CobranzaClientesEjecutarCobranzaService extends __BaseService {
  static readonly CalendarioEjecutarCobranzaPeriodoProcessPath = '/CalendarioEjecutarCobranzaPeriodo';
  static readonly fccFolioPagoClienteObtenerPath = '/fccFolioPagoCliente';
  static readonly fccFolioPagoClienteGuardarOActualizarPath = '/fccFolioPagoCliente';
  static readonly fccFolioPagoClienteQueryResultPath = '/fccFolioPagoCliente';
  static readonly fccFolioPagoClienteDesactivarPath = '/fccFolioPagoCliente';
  static readonly fccFolioPagoClienteFactoryProcessPath = '/fccFolioPagoClienteFactory';
  static readonly vFacturaClienteCalendarioQueryResultPath = '/vFacturaClienteCalendario';
  static readonly vFacturaClienteCalendarioTotalesQueryResultPath = '/vFacturaClienteCalendarioTotales';
  static readonly vFCCFolioPagoClienteQueryResultPath = '/vFCCFolioPagoCliente';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Process CalendarioEjecutarCobranzaPeriodo
   * @param param undefined
   * @return OK
   */
  CalendarioEjecutarCobranzaPeriodoProcessResponse(param: CalendarioEjecutarCobranzaPeriodoParametro): __Observable<__StrictHttpResponse<CalendarioEjecutarCobranzaPeriodo>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = param;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/CalendarioEjecutarCobranzaPeriodo`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<CalendarioEjecutarCobranzaPeriodo>;
      })
    );
  }
  /**
   * Process CalendarioEjecutarCobranzaPeriodo
   * @param param undefined
   * @return OK
   */
  CalendarioEjecutarCobranzaPeriodoProcess(param: CalendarioEjecutarCobranzaPeriodoParametro): __Observable<CalendarioEjecutarCobranzaPeriodo> {
    return this.CalendarioEjecutarCobranzaPeriodoProcessResponse(param).pipe(
      __map(_r => _r.body as CalendarioEjecutarCobranzaPeriodo)
    );
  }

  /**
   * Obtener fccFolioPagoCliente por su idfccFolioPagoCliente
   * @param idfccFolioPagoCliente Identificador de fccFolioPagoCliente
   * @return OK
   */
  fccFolioPagoClienteObtenerResponse(idfccFolioPagoCliente: string): __Observable<__StrictHttpResponse<FccFolioPagoCliente>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idfccFolioPagoCliente != null) __params = __params.set('idfccFolioPagoCliente', idfccFolioPagoCliente.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/fccFolioPagoCliente`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<FccFolioPagoCliente>;
      })
    );
  }
  /**
   * Obtener fccFolioPagoCliente por su idfccFolioPagoCliente
   * @param idfccFolioPagoCliente Identificador de fccFolioPagoCliente
   * @return OK
   */
  fccFolioPagoClienteObtener(idfccFolioPagoCliente: string): __Observable<FccFolioPagoCliente> {
    return this.fccFolioPagoClienteObtenerResponse(idfccFolioPagoCliente).pipe(
      __map(_r => _r.body as FccFolioPagoCliente)
    );
  }

  /**
   * Guardar o actualizar una dirección de empresa.
   * @param fccFolioPagoCliente Dirección de empresa.
   * @return OK
   */
  fccFolioPagoClienteGuardarOActualizarResponse(fccFolioPagoCliente: FccFolioPagoCliente): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = fccFolioPagoCliente;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/fccFolioPagoCliente`,
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
   * @param fccFolioPagoCliente Dirección de empresa.
   * @return OK
   */
  fccFolioPagoClienteGuardarOActualizar(fccFolioPagoCliente: FccFolioPagoCliente): __Observable<string> {
    return this.fccFolioPagoClienteGuardarOActualizarResponse(fccFolioPagoCliente).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Obtener lista de fccFolioPagoCliente
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  fccFolioPagoClienteQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultFccFolioPagoCliente>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/fccFolioPagoCliente`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultFccFolioPagoCliente>;
      })
    );
  }
  /**
   * Obtener lista de fccFolioPagoCliente
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  fccFolioPagoClienteQueryResult(info: QueryInfo): __Observable<QueryResultFccFolioPagoCliente> {
    return this.fccFolioPagoClienteQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultFccFolioPagoCliente)
    );
  }

  /**
   * Desactivar un fccFolioPagoCliente.
   * @param idfccFolioPagoCliente Identificador de elemento a desactivar.
   * @return OK
   */
  fccFolioPagoClienteDesactivarResponse(idfccFolioPagoCliente: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idfccFolioPagoCliente != null) __params = __params.set('idfccFolioPagoCliente', idfccFolioPagoCliente.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/fccFolioPagoCliente`,
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
   * Desactivar un fccFolioPagoCliente.
   * @param idfccFolioPagoCliente Identificador de elemento a desactivar.
   * @return OK
   */
  fccFolioPagoClienteDesactivar(idfccFolioPagoCliente: string): __Observable<string> {
    return this.fccFolioPagoClienteDesactivarResponse(idfccFolioPagoCliente).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Fabrica el folio del pago del cliente
   * @param idCliente
   * @return OK
   */
  fccFolioPagoClienteFactoryProcessResponse(idCliente: string): __Observable<__StrictHttpResponse<FccFolioPagoCliente>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idCliente != null) __params = __params.set('idCliente', idCliente.toString());
    let req = new HttpRequest<any>(
      'PATCH',
      this.rootUrl + `/fccFolioPagoClienteFactory`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<FccFolioPagoCliente>;
      })
    );
  }
  /**
   * Fabrica el folio del pago del cliente
   * @param idCliente
   * @return OK
   */
  fccFolioPagoClienteFactoryProcess(idCliente: string): __Observable<FccFolioPagoCliente> {
    return this.fccFolioPagoClienteFactoryProcessResponse(idCliente).pipe(
      __map(_r => _r.body as FccFolioPagoCliente)
    );
  }

  /**
   * Consultar lista paginada de vFacturaClienteCalendario
   * @param info Filtros y ordenamientos
   * @return OK
   */
  vFacturaClienteCalendarioQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultVFacturaClienteCalendario>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/vFacturaClienteCalendario`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultVFacturaClienteCalendario>;
      })
    );
  }
  /**
   * Consultar lista paginada de vFacturaClienteCalendario
   * @param info Filtros y ordenamientos
   * @return OK
   */
  vFacturaClienteCalendarioQueryResult(info: QueryInfo): __Observable<QueryResultVFacturaClienteCalendario> {
    return this.vFacturaClienteCalendarioQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultVFacturaClienteCalendario)
    );
  }

  /**
   * Consultar lista paginada de vFacturaClienteCalendarioTotales
   * @param info Filtros y ordenamientos
   * @return OK
   */
  vFacturaClienteCalendarioTotalesQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultVFacturaClienteCalendarioTotales>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/vFacturaClienteCalendarioTotales`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultVFacturaClienteCalendarioTotales>;
      })
    );
  }
  /**
   * Consultar lista paginada de vFacturaClienteCalendarioTotales
   * @param info Filtros y ordenamientos
   * @return OK
   */
  vFacturaClienteCalendarioTotalesQueryResult(info: QueryInfo): __Observable<QueryResultVFacturaClienteCalendarioTotales> {
    return this.vFacturaClienteCalendarioTotalesQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultVFacturaClienteCalendarioTotales)
    );
  }

  /**
   * Consultar lista paginada de vFCCFolioPagoCliente
   * @param info Filtros y ordenamientos
   * @return OK
   */
  vFCCFolioPagoClienteQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultVFCCFolioPagoCliente>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/vFCCFolioPagoCliente`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultVFCCFolioPagoCliente>;
      })
    );
  }
  /**
   * Consultar lista paginada de vFCCFolioPagoCliente
   * @param info Filtros y ordenamientos
   * @return OK
   */
  vFCCFolioPagoClienteQueryResult(info: QueryInfo): __Observable<QueryResultVFCCFolioPagoCliente> {
    return this.vFCCFolioPagoClienteQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultVFCCFolioPagoCliente)
    );
  }
}

module CobranzaClientesEjecutarCobranzaService {
}

export { CobranzaClientesEjecutarCobranzaService }
