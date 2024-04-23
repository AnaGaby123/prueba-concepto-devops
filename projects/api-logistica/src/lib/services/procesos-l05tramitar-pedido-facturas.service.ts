/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiLogisticaConfiguration as __Configuration } from '../api-logistica-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { TpProformaAdelanto } from '../models/tp-proforma-adelanto';
import { QueryResultTpProformaAdelanto } from '../models/query-result-tp-proforma-adelanto';
import { QueryInfo } from '../models/query-info';
import { TpProformaPartidaPedido } from '../models/tp-proforma-partida-pedido';
import { QueryResultTpProformaPartidaPedido } from '../models/query-result-tp-proforma-partida-pedido';
import { TpProformaPedido } from '../models/tp-proforma-pedido';
import { QueryResultTpProformaPedido } from '../models/query-result-tp-proforma-pedido';
import { CFDIGenerada } from '../models/cfdigenerada';
import { TpPedido } from '../models/tp-pedido';
@Injectable({
  providedIn: 'root',
})
class ProcesosL05TramitarPedidoFacturasService extends __BaseService {
  static readonly tpProformaAdelantoObtenerPath = '/tpProformaAdelanto';
  static readonly tpProformaAdelantoGuardarOActualizarPath = '/tpProformaAdelanto';
  static readonly tpProformaAdelantoQueryResultPath = '/tpProformaAdelanto';
  static readonly tpProformaAdelantoDesactivarPath = '/tpProformaAdelanto';
  static readonly tpProformaPartidaPedidoObtenerPath = '/tpProformaPartidaPedido';
  static readonly tpProformaPartidaPedidoGuardarOActualizarPath = '/tpProformaPartidaPedido';
  static readonly tpProformaPartidaPedidoQueryResultPath = '/tpProformaPartidaPedido';
  static readonly tpProformaPartidaPedidoDesactivarPath = '/tpProformaPartidaPedido';
  static readonly tpProformaPedidoObtenerPath = '/tpProformaPedido';
  static readonly tpProformaPedidoGuardarOActualizarPath = '/tpProformaPedido';
  static readonly tpProformaPedidoQueryResultPath = '/tpProformaPedido';
  static readonly tpProformaPedidoDesactivarPath = '/tpProformaPedido';
  static readonly tpProformaPedidoConsultaProcessPath = '/tpProformaPedidoConsulta';
  static readonly tpProformaPedidoExtensionsGenerarFacturaPedidoPath = '/CFDIGeneradaFromtpProformaPedido';
  static readonly tpProformaPedidoExtensionsGenerarProformaPedidoSinCreditoPath = '/tpProformaPedidoFromtpPedidoSinCredito';
  static readonly tpProformaPedidoExtensionsRegenerarTpProformaPedidoPath = '/RegenerarTpProformaPedido';
  static readonly tpProformaPedidoTPPedidoConsultaProcessPath = '/tpProformaPedidoTPPedidoConsulta';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Obtener pPedido por su idpPedido
   * @param idtpProformaAdelanto Identificador de pPedido
   * @return OK
   */
  tpProformaAdelantoObtenerResponse(idtpProformaAdelanto: string): __Observable<__StrictHttpResponse<TpProformaAdelanto>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idtpProformaAdelanto != null) __params = __params.set('idtpProformaAdelanto', idtpProformaAdelanto.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/tpProformaAdelanto`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<TpProformaAdelanto>;
      })
    );
  }
  /**
   * Obtener pPedido por su idpPedido
   * @param idtpProformaAdelanto Identificador de pPedido
   * @return OK
   */
  tpProformaAdelantoObtener(idtpProformaAdelanto: string): __Observable<TpProformaAdelanto> {
    return this.tpProformaAdelantoObtenerResponse(idtpProformaAdelanto).pipe(
      __map(_r => _r.body as TpProformaAdelanto)
    );
  }

  /**
   * Guardar o actualizar una dirección de empresa.
   * @param tpProformaPartidaPedido Dirección de empresa.
   * @return OK
   */
  tpProformaAdelantoGuardarOActualizarResponse(tpProformaPartidaPedido: TpProformaAdelanto): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = tpProformaPartidaPedido;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/tpProformaAdelanto`,
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
   * @param tpProformaPartidaPedido Dirección de empresa.
   * @return OK
   */
  tpProformaAdelantoGuardarOActualizar(tpProformaPartidaPedido: TpProformaAdelanto): __Observable<string> {
    return this.tpProformaAdelantoGuardarOActualizarResponse(tpProformaPartidaPedido).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Obtener lista de pPedido
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  tpProformaAdelantoQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultTpProformaAdelanto>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/tpProformaAdelanto`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultTpProformaAdelanto>;
      })
    );
  }
  /**
   * Obtener lista de pPedido
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  tpProformaAdelantoQueryResult(info: QueryInfo): __Observable<QueryResultTpProformaAdelanto> {
    return this.tpProformaAdelantoQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultTpProformaAdelanto)
    );
  }

  /**
   * Desactivar un pPedido.
   * @param idtpProformaAdelanto Identificador de elemento a desactivar.
   * @return OK
   */
  tpProformaAdelantoDesactivarResponse(idtpProformaAdelanto: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idtpProformaAdelanto != null) __params = __params.set('idtpProformaAdelanto', idtpProformaAdelanto.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/tpProformaAdelanto`,
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
   * Desactivar un pPedido.
   * @param idtpProformaAdelanto Identificador de elemento a desactivar.
   * @return OK
   */
  tpProformaAdelantoDesactivar(idtpProformaAdelanto: string): __Observable<string> {
    return this.tpProformaAdelantoDesactivarResponse(idtpProformaAdelanto).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Obtener pPedido por su idpPedido
   * @param idtpProformaPartidaPedido Identificador de pPedido
   * @return OK
   */
  tpProformaPartidaPedidoObtenerResponse(idtpProformaPartidaPedido: string): __Observable<__StrictHttpResponse<TpProformaPartidaPedido>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idtpProformaPartidaPedido != null) __params = __params.set('idtpProformaPartidaPedido', idtpProformaPartidaPedido.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/tpProformaPartidaPedido`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<TpProformaPartidaPedido>;
      })
    );
  }
  /**
   * Obtener pPedido por su idpPedido
   * @param idtpProformaPartidaPedido Identificador de pPedido
   * @return OK
   */
  tpProformaPartidaPedidoObtener(idtpProformaPartidaPedido: string): __Observable<TpProformaPartidaPedido> {
    return this.tpProformaPartidaPedidoObtenerResponse(idtpProformaPartidaPedido).pipe(
      __map(_r => _r.body as TpProformaPartidaPedido)
    );
  }

  /**
   * Guardar o actualizar una dirección de empresa.
   * @param tpProformaPartidaPedido Dirección de empresa.
   * @return OK
   */
  tpProformaPartidaPedidoGuardarOActualizarResponse(tpProformaPartidaPedido: TpProformaPartidaPedido): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = tpProformaPartidaPedido;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/tpProformaPartidaPedido`,
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
   * @param tpProformaPartidaPedido Dirección de empresa.
   * @return OK
   */
  tpProformaPartidaPedidoGuardarOActualizar(tpProformaPartidaPedido: TpProformaPartidaPedido): __Observable<string> {
    return this.tpProformaPartidaPedidoGuardarOActualizarResponse(tpProformaPartidaPedido).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Obtener lista de pPedido
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  tpProformaPartidaPedidoQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultTpProformaPartidaPedido>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/tpProformaPartidaPedido`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultTpProformaPartidaPedido>;
      })
    );
  }
  /**
   * Obtener lista de pPedido
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  tpProformaPartidaPedidoQueryResult(info: QueryInfo): __Observable<QueryResultTpProformaPartidaPedido> {
    return this.tpProformaPartidaPedidoQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultTpProformaPartidaPedido)
    );
  }

  /**
   * Desactivar un pPedido.
   * @param idtpProformaPartidaPedido Identificador de elemento a desactivar.
   * @return OK
   */
  tpProformaPartidaPedidoDesactivarResponse(idtpProformaPartidaPedido: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idtpProformaPartidaPedido != null) __params = __params.set('idtpProformaPartidaPedido', idtpProformaPartidaPedido.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/tpProformaPartidaPedido`,
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
   * Desactivar un pPedido.
   * @param idtpProformaPartidaPedido Identificador de elemento a desactivar.
   * @return OK
   */
  tpProformaPartidaPedidoDesactivar(idtpProformaPartidaPedido: string): __Observable<string> {
    return this.tpProformaPartidaPedidoDesactivarResponse(idtpProformaPartidaPedido).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Obtener pPedido por su idpPedido
   * @param idtpProformaPedido Identificador de pPedido
   * @return OK
   */
  tpProformaPedidoObtenerResponse(idtpProformaPedido: string): __Observable<__StrictHttpResponse<TpProformaPedido>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idtpProformaPedido != null) __params = __params.set('idtpProformaPedido', idtpProformaPedido.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/tpProformaPedido`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<TpProformaPedido>;
      })
    );
  }
  /**
   * Obtener pPedido por su idpPedido
   * @param idtpProformaPedido Identificador de pPedido
   * @return OK
   */
  tpProformaPedidoObtener(idtpProformaPedido: string): __Observable<TpProformaPedido> {
    return this.tpProformaPedidoObtenerResponse(idtpProformaPedido).pipe(
      __map(_r => _r.body as TpProformaPedido)
    );
  }

  /**
   * Guardar o actualizar una dirección de empresa.
   * @param tpProformaPartidaPedido Dirección de empresa.
   * @return OK
   */
  tpProformaPedidoGuardarOActualizarResponse(tpProformaPartidaPedido: TpProformaPedido): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = tpProformaPartidaPedido;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/tpProformaPedido`,
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
   * @param tpProformaPartidaPedido Dirección de empresa.
   * @return OK
   */
  tpProformaPedidoGuardarOActualizar(tpProformaPartidaPedido: TpProformaPedido): __Observable<string> {
    return this.tpProformaPedidoGuardarOActualizarResponse(tpProformaPartidaPedido).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Obtener lista de pPedido
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  tpProformaPedidoQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultTpProformaPedido>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/tpProformaPedido`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultTpProformaPedido>;
      })
    );
  }
  /**
   * Obtener lista de pPedido
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  tpProformaPedidoQueryResult(info: QueryInfo): __Observable<QueryResultTpProformaPedido> {
    return this.tpProformaPedidoQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultTpProformaPedido)
    );
  }

  /**
   * Desactivar un pPedido.
   * @param idtpProformaPedido Identificador de elemento a desactivar.
   * @return OK
   */
  tpProformaPedidoDesactivarResponse(idtpProformaPedido: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idtpProformaPedido != null) __params = __params.set('idtpProformaPedido', idtpProformaPedido.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/tpProformaPedido`,
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
   * Desactivar un pPedido.
   * @param idtpProformaPedido Identificador de elemento a desactivar.
   * @return OK
   */
  tpProformaPedidoDesactivar(idtpProformaPedido: string): __Observable<string> {
    return this.tpProformaPedidoDesactivarResponse(idtpProformaPedido).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Process tpProformaPedidoConsulta
   * @param listaIdCFDI undefined
   * @return OK
   */
  tpProformaPedidoConsultaProcessResponse(listaIdCFDI: Array<string>): __Observable<__StrictHttpResponse<Array<TpProformaPedido>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = listaIdCFDI;
    let req = new HttpRequest<any>(
      'PATCH',
      this.rootUrl + `/tpProformaPedidoConsulta`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<TpProformaPedido>>;
      })
    );
  }
  /**
   * Process tpProformaPedidoConsulta
   * @param listaIdCFDI undefined
   * @return OK
   */
  tpProformaPedidoConsultaProcess(listaIdCFDI: Array<string>): __Observable<Array<TpProformaPedido>> {
    return this.tpProformaPedidoConsultaProcessResponse(listaIdCFDI).pipe(
      __map(_r => _r.body as Array<TpProformaPedido>)
    );
  }

  /**
   * Generar CFDIGenerada a partir de tpProformaPedido
   * @param idtPProformaPedido
   * @return OK
   */
  tpProformaPedidoExtensionsGenerarFacturaPedidoResponse(idtPProformaPedido: string): __Observable<__StrictHttpResponse<CFDIGenerada>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idtPProformaPedido != null) __params = __params.set('idtPProformaPedido', idtPProformaPedido.toString());
    let req = new HttpRequest<any>(
      'PATCH',
      this.rootUrl + `/CFDIGeneradaFromtpProformaPedido`,
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
   * Generar CFDIGenerada a partir de tpProformaPedido
   * @param idtPProformaPedido
   * @return OK
   */
  tpProformaPedidoExtensionsGenerarFacturaPedido(idtPProformaPedido: string): __Observable<CFDIGenerada> {
    return this.tpProformaPedidoExtensionsGenerarFacturaPedidoResponse(idtPProformaPedido).pipe(
      __map(_r => _r.body as CFDIGenerada)
    );
  }

  /**
   * GenerarProformaPedidoSinCredito tpProformaPedidoExtensions
   * @param idTPPedido undefined
   * @return OK
   */
  tpProformaPedidoExtensionsGenerarProformaPedidoSinCreditoResponse(idTPPedido: string): __Observable<__StrictHttpResponse<QueryResultTpProformaPedido>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idTPPedido != null) __params = __params.set('idTPPedido', idTPPedido.toString());
    let req = new HttpRequest<any>(
      'PATCH',
      this.rootUrl + `/tpProformaPedidoFromtpPedidoSinCredito`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultTpProformaPedido>;
      })
    );
  }
  /**
   * GenerarProformaPedidoSinCredito tpProformaPedidoExtensions
   * @param idTPPedido undefined
   * @return OK
   */
  tpProformaPedidoExtensionsGenerarProformaPedidoSinCredito(idTPPedido: string): __Observable<QueryResultTpProformaPedido> {
    return this.tpProformaPedidoExtensionsGenerarProformaPedidoSinCreditoResponse(idTPPedido).pipe(
      __map(_r => _r.body as QueryResultTpProformaPedido)
    );
  }

  /**
   * RegenerarTpProformaPedido tpProformaPedidoExtensions
   * @param idTpProformaPedido undefined
   * @return OK
   */
  tpProformaPedidoExtensionsRegenerarTpProformaPedidoResponse(idTpProformaPedido: string): __Observable<__StrictHttpResponse<TpProformaPedido>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idTpProformaPedido != null) __params = __params.set('idTpProformaPedido', idTpProformaPedido.toString());
    let req = new HttpRequest<any>(
      'PATCH',
      this.rootUrl + `/RegenerarTpProformaPedido`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<TpProformaPedido>;
      })
    );
  }
  /**
   * RegenerarTpProformaPedido tpProformaPedidoExtensions
   * @param idTpProformaPedido undefined
   * @return OK
   */
  tpProformaPedidoExtensionsRegenerarTpProformaPedido(idTpProformaPedido: string): __Observable<TpProformaPedido> {
    return this.tpProformaPedidoExtensionsRegenerarTpProformaPedidoResponse(idTpProformaPedido).pipe(
      __map(_r => _r.body as TpProformaPedido)
    );
  }

  /**
   * Process tpProformaPedidoTPPedidoConsulta
   * @param listaIdCFDI undefined
   * @return OK
   */
  tpProformaPedidoTPPedidoConsultaProcessResponse(listaIdCFDI: Array<string>): __Observable<__StrictHttpResponse<Array<TpPedido>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = listaIdCFDI;
    let req = new HttpRequest<any>(
      'PATCH',
      this.rootUrl + `/tpProformaPedidoTPPedidoConsulta`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<TpPedido>>;
      })
    );
  }
  /**
   * Process tpProformaPedidoTPPedidoConsulta
   * @param listaIdCFDI undefined
   * @return OK
   */
  tpProformaPedidoTPPedidoConsultaProcess(listaIdCFDI: Array<string>): __Observable<Array<TpPedido>> {
    return this.tpProformaPedidoTPPedidoConsultaProcessResponse(listaIdCFDI).pipe(
      __map(_r => _r.body as Array<TpPedido>)
    );
  }
}

module ProcesosL05TramitarPedidoFacturasService {
}

export { ProcesosL05TramitarPedidoFacturasService }
