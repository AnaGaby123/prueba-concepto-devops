/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiLogisticaConfiguration as __Configuration } from '../api-logistica-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { OcPartidaCancelacion } from '../models/oc-partida-cancelacion';
import { QueryResultOcPartidaCancelacion } from '../models/query-result-oc-partida-cancelacion';
import { QueryInfo } from '../models/query-info';
import { OcPartidaEdicionBackOrder } from '../models/oc-partida-edicion-back-order';
import { QueryResultOcPartidaEdicionBackOrder } from '../models/query-result-oc-partida-edicion-back-order';
import { OcPartidaEdicionConImpactoFEE } from '../models/oc-partida-edicion-con-impacto-fee';
import { QueryResultOcPartidaEdicionConImpactoFEE } from '../models/query-result-oc-partida-edicion-con-impacto-fee';
import { OcPartidaEdicionSinImpactoFEE } from '../models/oc-partida-edicion-sin-impacto-fee';
import { QueryResultOcPartidaEdicionSinImpactoFEE } from '../models/query-result-oc-partida-edicion-sin-impacto-fee';
@Injectable({
  providedIn: 'root',
})
class ProcesosL06OrdenDeCompraPartidasModificacionesService extends __BaseService {
  static readonly ocPartidaCancelacionObtenerPath = '/ocPartidaCancelacion';
  static readonly ocPartidaCancelacionGuardarOActualizarPath = '/ocPartidaCancelacion';
  static readonly ocPartidaCancelacionQueryResultPath = '/ocPartidaCancelacion';
  static readonly ocPartidaCancelacionDesactivarPath = '/ocPartidaCancelacion';
  static readonly ocPartidaEdicionBackOrderFEEObtenerPath = '/ocPartidaEdicionBackOrder';
  static readonly ocPartidaEdicionBackOrderFEEGuardarOActualizarPath = '/ocPartidaEdicionBackOrder';
  static readonly ocPartidaEdicionBackOrderFEEQueryResultPath = '/ocPartidaEdicionBackOrder';
  static readonly ocPartidaEdicionBackOrderFEEDesactivarPath = '/ocPartidaEdicionBackOrder';
  static readonly ocPartidaEdicionConImpactoFEEObtenerPath = '/ocPartidaEdicionConImpactoFEE';
  static readonly ocPartidaEdicionConImpactoFEEGuardarOActualizarPath = '/ocPartidaEdicionConImpactoFEE';
  static readonly ocPartidaEdicionConImpactoFEEQueryResultPath = '/ocPartidaEdicionConImpactoFEE';
  static readonly ocPartidaEdicionConImpactoFEEDesactivarPath = '/ocPartidaEdicionConImpactoFEE';
  static readonly ocPartidaEdicionSinImpactoFEEObtenerPath = '/ocPartidaEdicionSinImpactoFEE';
  static readonly ocPartidaEdicionSinImpactoFEEGuardarOActualizarPath = '/ocPartidaEdicionSinImpactoFEE';
  static readonly ocPartidaEdicionSinImpactoFEEQueryResultPath = '/ocPartidaEdicionSinImpactoFEE';
  static readonly ocPartidaEdicionSinImpactoFEEDesactivarPath = '/ocPartidaEdicionSinImpactoFEE';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Consultar registro de ocPartidaCancelacion
   * @param idocPartidaCancelacion Identificador de ocPartidaCancelacion
   * @return OK
   */
  ocPartidaCancelacionObtenerResponse(idocPartidaCancelacion: string): __Observable<__StrictHttpResponse<OcPartidaCancelacion>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idocPartidaCancelacion != null) __params = __params.set('idocPartidaCancelacion', idocPartidaCancelacion.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/ocPartidaCancelacion`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<OcPartidaCancelacion>;
      })
    );
  }
  /**
   * Consultar registro de ocPartidaCancelacion
   * @param idocPartidaCancelacion Identificador de ocPartidaCancelacion
   * @return OK
   */
  ocPartidaCancelacionObtener(idocPartidaCancelacion: string): __Observable<OcPartidaCancelacion> {
    return this.ocPartidaCancelacionObtenerResponse(idocPartidaCancelacion).pipe(
      __map(_r => _r.body as OcPartidaCancelacion)
    );
  }

  /**
   * Guardar o actualizar ocPartidaCancelacion
   * @param ocPartidaCancelacion ocPartidaCancelacion
   * @return OK
   */
  ocPartidaCancelacionGuardarOActualizarResponse(ocPartidaCancelacion: OcPartidaCancelacion): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = ocPartidaCancelacion;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/ocPartidaCancelacion`,
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
   * Guardar o actualizar ocPartidaCancelacion
   * @param ocPartidaCancelacion ocPartidaCancelacion
   * @return OK
   */
  ocPartidaCancelacionGuardarOActualizar(ocPartidaCancelacion: OcPartidaCancelacion): __Observable<string> {
    return this.ocPartidaCancelacionGuardarOActualizarResponse(ocPartidaCancelacion).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar lista paginada de ocPartidaCancelacion
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  ocPartidaCancelacionQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultOcPartidaCancelacion>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/ocPartidaCancelacion`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultOcPartidaCancelacion>;
      })
    );
  }
  /**
   * Consultar lista paginada de ocPartidaCancelacion
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  ocPartidaCancelacionQueryResult(info: QueryInfo): __Observable<QueryResultOcPartidaCancelacion> {
    return this.ocPartidaCancelacionQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultOcPartidaCancelacion)
    );
  }

  /**
   * Desactivar registro de ocPartidaCancelacion
   * @param idocPartidaCancelacion Identificador de registro de ocPartidaCancelacion
   * @return OK
   */
  ocPartidaCancelacionDesactivarResponse(idocPartidaCancelacion: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idocPartidaCancelacion != null) __params = __params.set('idocPartidaCancelacion', idocPartidaCancelacion.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/ocPartidaCancelacion`,
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
   * Desactivar registro de ocPartidaCancelacion
   * @param idocPartidaCancelacion Identificador de registro de ocPartidaCancelacion
   * @return OK
   */
  ocPartidaCancelacionDesactivar(idocPartidaCancelacion: string): __Observable<string> {
    return this.ocPartidaCancelacionDesactivarResponse(idocPartidaCancelacion).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar registro de ocPartidaEdicionBackOrder
   * @param idocPartidaEdicionBackOrder Identificador de ocPartidaEdicionBackOrder
   * @return OK
   */
  ocPartidaEdicionBackOrderFEEObtenerResponse(idocPartidaEdicionBackOrder: string): __Observable<__StrictHttpResponse<OcPartidaEdicionBackOrder>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idocPartidaEdicionBackOrder != null) __params = __params.set('idocPartidaEdicionBackOrder', idocPartidaEdicionBackOrder.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/ocPartidaEdicionBackOrder`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<OcPartidaEdicionBackOrder>;
      })
    );
  }
  /**
   * Consultar registro de ocPartidaEdicionBackOrder
   * @param idocPartidaEdicionBackOrder Identificador de ocPartidaEdicionBackOrder
   * @return OK
   */
  ocPartidaEdicionBackOrderFEEObtener(idocPartidaEdicionBackOrder: string): __Observable<OcPartidaEdicionBackOrder> {
    return this.ocPartidaEdicionBackOrderFEEObtenerResponse(idocPartidaEdicionBackOrder).pipe(
      __map(_r => _r.body as OcPartidaEdicionBackOrder)
    );
  }

  /**
   * Guardar o actualizar ocPartidaEdicionBackOrder
   * @param ocPartidaEdicionBackOrder ocPartidaEdicionBackOrder
   * @return OK
   */
  ocPartidaEdicionBackOrderFEEGuardarOActualizarResponse(ocPartidaEdicionBackOrder: OcPartidaEdicionBackOrder): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = ocPartidaEdicionBackOrder;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/ocPartidaEdicionBackOrder`,
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
   * Guardar o actualizar ocPartidaEdicionBackOrder
   * @param ocPartidaEdicionBackOrder ocPartidaEdicionBackOrder
   * @return OK
   */
  ocPartidaEdicionBackOrderFEEGuardarOActualizar(ocPartidaEdicionBackOrder: OcPartidaEdicionBackOrder): __Observable<string> {
    return this.ocPartidaEdicionBackOrderFEEGuardarOActualizarResponse(ocPartidaEdicionBackOrder).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar lista paginada de ocPartidaEdicionBackOrder
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  ocPartidaEdicionBackOrderFEEQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultOcPartidaEdicionBackOrder>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/ocPartidaEdicionBackOrder`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultOcPartidaEdicionBackOrder>;
      })
    );
  }
  /**
   * Consultar lista paginada de ocPartidaEdicionBackOrder
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  ocPartidaEdicionBackOrderFEEQueryResult(info: QueryInfo): __Observable<QueryResultOcPartidaEdicionBackOrder> {
    return this.ocPartidaEdicionBackOrderFEEQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultOcPartidaEdicionBackOrder)
    );
  }

  /**
   * Desactivar registro de ocPartidaEdicionBackOrder
   * @param idocPartidaEdicionBackOrder Identificador de registro de ocPartidaEdicionBackOrder
   * @return OK
   */
  ocPartidaEdicionBackOrderFEEDesactivarResponse(idocPartidaEdicionBackOrder: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idocPartidaEdicionBackOrder != null) __params = __params.set('idocPartidaEdicionBackOrder', idocPartidaEdicionBackOrder.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/ocPartidaEdicionBackOrder`,
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
   * Desactivar registro de ocPartidaEdicionBackOrder
   * @param idocPartidaEdicionBackOrder Identificador de registro de ocPartidaEdicionBackOrder
   * @return OK
   */
  ocPartidaEdicionBackOrderFEEDesactivar(idocPartidaEdicionBackOrder: string): __Observable<string> {
    return this.ocPartidaEdicionBackOrderFEEDesactivarResponse(idocPartidaEdicionBackOrder).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar registro de ocPartidaEdicionConImpactoFEE
   * @param idocPartidaEdicionConImpactoFEE Identificador de ocPartidaEdicionConImpactoFEE
   * @return OK
   */
  ocPartidaEdicionConImpactoFEEObtenerResponse(idocPartidaEdicionConImpactoFEE: string): __Observable<__StrictHttpResponse<OcPartidaEdicionConImpactoFEE>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idocPartidaEdicionConImpactoFEE != null) __params = __params.set('idocPartidaEdicionConImpactoFEE', idocPartidaEdicionConImpactoFEE.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/ocPartidaEdicionConImpactoFEE`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<OcPartidaEdicionConImpactoFEE>;
      })
    );
  }
  /**
   * Consultar registro de ocPartidaEdicionConImpactoFEE
   * @param idocPartidaEdicionConImpactoFEE Identificador de ocPartidaEdicionConImpactoFEE
   * @return OK
   */
  ocPartidaEdicionConImpactoFEEObtener(idocPartidaEdicionConImpactoFEE: string): __Observable<OcPartidaEdicionConImpactoFEE> {
    return this.ocPartidaEdicionConImpactoFEEObtenerResponse(idocPartidaEdicionConImpactoFEE).pipe(
      __map(_r => _r.body as OcPartidaEdicionConImpactoFEE)
    );
  }

  /**
   * Guardar o actualizar ocPartidaEdicionConImpactoFEE
   * @param ocPartidaEdicionConImpactoFEE ocPartidaEdicionConImpactoFEE
   * @return OK
   */
  ocPartidaEdicionConImpactoFEEGuardarOActualizarResponse(ocPartidaEdicionConImpactoFEE: OcPartidaEdicionConImpactoFEE): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = ocPartidaEdicionConImpactoFEE;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/ocPartidaEdicionConImpactoFEE`,
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
   * Guardar o actualizar ocPartidaEdicionConImpactoFEE
   * @param ocPartidaEdicionConImpactoFEE ocPartidaEdicionConImpactoFEE
   * @return OK
   */
  ocPartidaEdicionConImpactoFEEGuardarOActualizar(ocPartidaEdicionConImpactoFEE: OcPartidaEdicionConImpactoFEE): __Observable<string> {
    return this.ocPartidaEdicionConImpactoFEEGuardarOActualizarResponse(ocPartidaEdicionConImpactoFEE).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar lista paginada de ocPartidaEdicionConImpactoFEE
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  ocPartidaEdicionConImpactoFEEQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultOcPartidaEdicionConImpactoFEE>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/ocPartidaEdicionConImpactoFEE`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultOcPartidaEdicionConImpactoFEE>;
      })
    );
  }
  /**
   * Consultar lista paginada de ocPartidaEdicionConImpactoFEE
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  ocPartidaEdicionConImpactoFEEQueryResult(info: QueryInfo): __Observable<QueryResultOcPartidaEdicionConImpactoFEE> {
    return this.ocPartidaEdicionConImpactoFEEQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultOcPartidaEdicionConImpactoFEE)
    );
  }

  /**
   * Desactivar registro de ocPartidaEdicionConImpactoFEE
   * @param idocPartidaEdicionConImpactoFEE Identificador de registro de ocPartidaEdicionConImpactoFEE
   * @return OK
   */
  ocPartidaEdicionConImpactoFEEDesactivarResponse(idocPartidaEdicionConImpactoFEE: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idocPartidaEdicionConImpactoFEE != null) __params = __params.set('idocPartidaEdicionConImpactoFEE', idocPartidaEdicionConImpactoFEE.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/ocPartidaEdicionConImpactoFEE`,
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
   * Desactivar registro de ocPartidaEdicionConImpactoFEE
   * @param idocPartidaEdicionConImpactoFEE Identificador de registro de ocPartidaEdicionConImpactoFEE
   * @return OK
   */
  ocPartidaEdicionConImpactoFEEDesactivar(idocPartidaEdicionConImpactoFEE: string): __Observable<string> {
    return this.ocPartidaEdicionConImpactoFEEDesactivarResponse(idocPartidaEdicionConImpactoFEE).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar registro de ocPartidaEdicionSinImpactoFEE
   * @param idocPartidaEdicionSinImpactoFEE Identificador de ocPartidaEdicionSinImpactoFEE
   * @return OK
   */
  ocPartidaEdicionSinImpactoFEEObtenerResponse(idocPartidaEdicionSinImpactoFEE: string): __Observable<__StrictHttpResponse<OcPartidaEdicionSinImpactoFEE>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idocPartidaEdicionSinImpactoFEE != null) __params = __params.set('idocPartidaEdicionSinImpactoFEE', idocPartidaEdicionSinImpactoFEE.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/ocPartidaEdicionSinImpactoFEE`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<OcPartidaEdicionSinImpactoFEE>;
      })
    );
  }
  /**
   * Consultar registro de ocPartidaEdicionSinImpactoFEE
   * @param idocPartidaEdicionSinImpactoFEE Identificador de ocPartidaEdicionSinImpactoFEE
   * @return OK
   */
  ocPartidaEdicionSinImpactoFEEObtener(idocPartidaEdicionSinImpactoFEE: string): __Observable<OcPartidaEdicionSinImpactoFEE> {
    return this.ocPartidaEdicionSinImpactoFEEObtenerResponse(idocPartidaEdicionSinImpactoFEE).pipe(
      __map(_r => _r.body as OcPartidaEdicionSinImpactoFEE)
    );
  }

  /**
   * Guardar o actualizar ocPartidaEdicionSinImpactoFEE
   * @param ocPartidaEdicionSinImpactoFEE ocPartidaEdicionSinImpactoFEE
   * @return OK
   */
  ocPartidaEdicionSinImpactoFEEGuardarOActualizarResponse(ocPartidaEdicionSinImpactoFEE: OcPartidaEdicionSinImpactoFEE): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = ocPartidaEdicionSinImpactoFEE;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/ocPartidaEdicionSinImpactoFEE`,
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
   * Guardar o actualizar ocPartidaEdicionSinImpactoFEE
   * @param ocPartidaEdicionSinImpactoFEE ocPartidaEdicionSinImpactoFEE
   * @return OK
   */
  ocPartidaEdicionSinImpactoFEEGuardarOActualizar(ocPartidaEdicionSinImpactoFEE: OcPartidaEdicionSinImpactoFEE): __Observable<string> {
    return this.ocPartidaEdicionSinImpactoFEEGuardarOActualizarResponse(ocPartidaEdicionSinImpactoFEE).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar lista paginada de ocPartidaEdicionSinImpactoFEE
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  ocPartidaEdicionSinImpactoFEEQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultOcPartidaEdicionSinImpactoFEE>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/ocPartidaEdicionSinImpactoFEE`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultOcPartidaEdicionSinImpactoFEE>;
      })
    );
  }
  /**
   * Consultar lista paginada de ocPartidaEdicionSinImpactoFEE
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  ocPartidaEdicionSinImpactoFEEQueryResult(info: QueryInfo): __Observable<QueryResultOcPartidaEdicionSinImpactoFEE> {
    return this.ocPartidaEdicionSinImpactoFEEQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultOcPartidaEdicionSinImpactoFEE)
    );
  }

  /**
   * Desactivar registro de ocPartidaEdicionSinImpactoFEE
   * @param idocPartidaEdicionSinImpactoFEE Identificador de registro de ocPartidaEdicionSinImpactoFEE
   * @return OK
   */
  ocPartidaEdicionSinImpactoFEEDesactivarResponse(idocPartidaEdicionSinImpactoFEE: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idocPartidaEdicionSinImpactoFEE != null) __params = __params.set('idocPartidaEdicionSinImpactoFEE', idocPartidaEdicionSinImpactoFEE.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/ocPartidaEdicionSinImpactoFEE`,
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
   * Desactivar registro de ocPartidaEdicionSinImpactoFEE
   * @param idocPartidaEdicionSinImpactoFEE Identificador de registro de ocPartidaEdicionSinImpactoFEE
   * @return OK
   */
  ocPartidaEdicionSinImpactoFEEDesactivar(idocPartidaEdicionSinImpactoFEE: string): __Observable<string> {
    return this.ocPartidaEdicionSinImpactoFEEDesactivarResponse(idocPartidaEdicionSinImpactoFEE).pipe(
      __map(_r => _r.body as string)
    );
  }
}

module ProcesosL06OrdenDeCompraPartidasModificacionesService {
}

export { ProcesosL06OrdenDeCompraPartidasModificacionesService }
