/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiLogisticaConfiguration as __Configuration } from '../api-logistica-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { TpClienteCSCreditoMorosoCorreo } from '../models/tp-cliente-cscredito-moroso-correo';
import { QueryResultTpClienteCSCreditoMorosoCorreo } from '../models/query-result-tp-cliente-cscredito-moroso-correo';
import { QueryInfo } from '../models/query-info';
import { TpPedidoCorreoEnviado } from '../models/tp-pedido-correo-enviado';
import { QueryResultTpPedidoCorreoEnviado } from '../models/query-result-tp-pedido-correo-enviado';
import { TpPedidoCorreoOcNoAmparada } from '../models/tp-pedido-correo-oc-no-amparada';
import { QueryResultTpPedidoCorreoOcNoAmparada } from '../models/query-result-tp-pedido-correo-oc-no-amparada';
@Injectable({
  providedIn: 'root',
})
class ProcesosL05TramitarPedidoCorreosService extends __BaseService {
  static readonly tpClienteCSCreditoMorosoCorreoObtenerPath = '/tpClienteCSCreditoMorosoCorreo';
  static readonly tpClienteCSCreditoMorosoCorreoGuardarOActualizarPath = '/tpClienteCSCreditoMorosoCorreo';
  static readonly tpClienteCSCreditoMorosoCorreoQueryResultPath = '/tpClienteCSCreditoMorosoCorreo';
  static readonly tpClienteCSCreditoMorosoCorreoDesactivarPath = '/tpClienteCSCreditoMorosoCorreo';
  static readonly tpPedidoCorreoEnviadoObtenerPath = '/tpPedidoCorreoEnviado';
  static readonly tpPedidoCorreoEnviadoGuardarOActualizarPath = '/tpPedidoCorreoEnviado';
  static readonly tpPedidoCorreoEnviadoQueryResultPath = '/tpPedidoCorreoEnviado';
  static readonly tpPedidoCorreoEnviadoDesactivarPath = '/tpPedidoCorreoEnviado';
  static readonly tpPedidoCorreoOcNoAmparadaObtenerPath = '/tpPedidoCorreoOcNoAmparada';
  static readonly tpPedidoCorreoOcNoAmparadaGuardarOActualizarPath = '/tpPedidoCorreoOcNoAmparada';
  static readonly tpPedidoCorreoOcNoAmparadaQueryResultPath = '/tpPedidoCorreoOcNoAmparada';
  static readonly tpPedidoCorreoOcNoAmparadaDesactivarPath = '/tpPedidoCorreoOcNoAmparada';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Obtener pPedido por su idpPedido
   * @param idtpClienteCSCreditoMorosoCorreo Identificador de pPedido
   * @return OK
   */
  tpClienteCSCreditoMorosoCorreoObtenerResponse(idtpClienteCSCreditoMorosoCorreo: string): __Observable<__StrictHttpResponse<TpClienteCSCreditoMorosoCorreo>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idtpClienteCSCreditoMorosoCorreo != null) __params = __params.set('idtpClienteCSCreditoMorosoCorreo', idtpClienteCSCreditoMorosoCorreo.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/tpClienteCSCreditoMorosoCorreo`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<TpClienteCSCreditoMorosoCorreo>;
      })
    );
  }
  /**
   * Obtener pPedido por su idpPedido
   * @param idtpClienteCSCreditoMorosoCorreo Identificador de pPedido
   * @return OK
   */
  tpClienteCSCreditoMorosoCorreoObtener(idtpClienteCSCreditoMorosoCorreo: string): __Observable<TpClienteCSCreditoMorosoCorreo> {
    return this.tpClienteCSCreditoMorosoCorreoObtenerResponse(idtpClienteCSCreditoMorosoCorreo).pipe(
      __map(_r => _r.body as TpClienteCSCreditoMorosoCorreo)
    );
  }

  /**
   * Guardar o actualizar una dirección de empresa.
   * @param tpClienteCSCreditoMorosoCorreo Dirección de empresa.
   * @return OK
   */
  tpClienteCSCreditoMorosoCorreoGuardarOActualizarResponse(tpClienteCSCreditoMorosoCorreo: TpClienteCSCreditoMorosoCorreo): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = tpClienteCSCreditoMorosoCorreo;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/tpClienteCSCreditoMorosoCorreo`,
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
   * @param tpClienteCSCreditoMorosoCorreo Dirección de empresa.
   * @return OK
   */
  tpClienteCSCreditoMorosoCorreoGuardarOActualizar(tpClienteCSCreditoMorosoCorreo: TpClienteCSCreditoMorosoCorreo): __Observable<string> {
    return this.tpClienteCSCreditoMorosoCorreoGuardarOActualizarResponse(tpClienteCSCreditoMorosoCorreo).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Obtener lista de pPedido
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  tpClienteCSCreditoMorosoCorreoQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultTpClienteCSCreditoMorosoCorreo>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/tpClienteCSCreditoMorosoCorreo`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultTpClienteCSCreditoMorosoCorreo>;
      })
    );
  }
  /**
   * Obtener lista de pPedido
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  tpClienteCSCreditoMorosoCorreoQueryResult(info: QueryInfo): __Observable<QueryResultTpClienteCSCreditoMorosoCorreo> {
    return this.tpClienteCSCreditoMorosoCorreoQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultTpClienteCSCreditoMorosoCorreo)
    );
  }

  /**
   * Desactivar un pPedido.
   * @param idtpClienteCSCreditoMorosoCorreo Identificador de elemento a desactivar.
   * @return OK
   */
  tpClienteCSCreditoMorosoCorreoDesactivarResponse(idtpClienteCSCreditoMorosoCorreo: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idtpClienteCSCreditoMorosoCorreo != null) __params = __params.set('idtpClienteCSCreditoMorosoCorreo', idtpClienteCSCreditoMorosoCorreo.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/tpClienteCSCreditoMorosoCorreo`,
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
   * @param idtpClienteCSCreditoMorosoCorreo Identificador de elemento a desactivar.
   * @return OK
   */
  tpClienteCSCreditoMorosoCorreoDesactivar(idtpClienteCSCreditoMorosoCorreo: string): __Observable<string> {
    return this.tpClienteCSCreditoMorosoCorreoDesactivarResponse(idtpClienteCSCreditoMorosoCorreo).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Obtener pPedido por su idpPedido
   * @param idtpPedidoCorreoEnviado Identificador de pPedido
   * @return OK
   */
  tpPedidoCorreoEnviadoObtenerResponse(idtpPedidoCorreoEnviado: string): __Observable<__StrictHttpResponse<TpPedidoCorreoEnviado>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idtpPedidoCorreoEnviado != null) __params = __params.set('idtpPedidoCorreoEnviado', idtpPedidoCorreoEnviado.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/tpPedidoCorreoEnviado`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<TpPedidoCorreoEnviado>;
      })
    );
  }
  /**
   * Obtener pPedido por su idpPedido
   * @param idtpPedidoCorreoEnviado Identificador de pPedido
   * @return OK
   */
  tpPedidoCorreoEnviadoObtener(idtpPedidoCorreoEnviado: string): __Observable<TpPedidoCorreoEnviado> {
    return this.tpPedidoCorreoEnviadoObtenerResponse(idtpPedidoCorreoEnviado).pipe(
      __map(_r => _r.body as TpPedidoCorreoEnviado)
    );
  }

  /**
   * Guardar o actualizar una dirección de empresa.
   * @param tpPedidoCorreoEnviado Dirección de empresa.
   * @return OK
   */
  tpPedidoCorreoEnviadoGuardarOActualizarResponse(tpPedidoCorreoEnviado: TpPedidoCorreoEnviado): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = tpPedidoCorreoEnviado;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/tpPedidoCorreoEnviado`,
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
   * @param tpPedidoCorreoEnviado Dirección de empresa.
   * @return OK
   */
  tpPedidoCorreoEnviadoGuardarOActualizar(tpPedidoCorreoEnviado: TpPedidoCorreoEnviado): __Observable<string> {
    return this.tpPedidoCorreoEnviadoGuardarOActualizarResponse(tpPedidoCorreoEnviado).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Obtener lista de pPedido
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  tpPedidoCorreoEnviadoQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultTpPedidoCorreoEnviado>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/tpPedidoCorreoEnviado`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultTpPedidoCorreoEnviado>;
      })
    );
  }
  /**
   * Obtener lista de pPedido
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  tpPedidoCorreoEnviadoQueryResult(info: QueryInfo): __Observable<QueryResultTpPedidoCorreoEnviado> {
    return this.tpPedidoCorreoEnviadoQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultTpPedidoCorreoEnviado)
    );
  }

  /**
   * Desactivar un pPedido.
   * @param idtpPedidoCorreoEnviado Identificador de elemento a desactivar.
   * @return OK
   */
  tpPedidoCorreoEnviadoDesactivarResponse(idtpPedidoCorreoEnviado: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idtpPedidoCorreoEnviado != null) __params = __params.set('idtpPedidoCorreoEnviado', idtpPedidoCorreoEnviado.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/tpPedidoCorreoEnviado`,
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
   * @param idtpPedidoCorreoEnviado Identificador de elemento a desactivar.
   * @return OK
   */
  tpPedidoCorreoEnviadoDesactivar(idtpPedidoCorreoEnviado: string): __Observable<string> {
    return this.tpPedidoCorreoEnviadoDesactivarResponse(idtpPedidoCorreoEnviado).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Obtener pPedido por su idpPedido
   * @param idtpPedidoCorreoOcNoAmparada Identificador de pPedido
   * @return OK
   */
  tpPedidoCorreoOcNoAmparadaObtenerResponse(idtpPedidoCorreoOcNoAmparada: string): __Observable<__StrictHttpResponse<TpPedidoCorreoOcNoAmparada>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idtpPedidoCorreoOcNoAmparada != null) __params = __params.set('idtpPedidoCorreoOcNoAmparada', idtpPedidoCorreoOcNoAmparada.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/tpPedidoCorreoOcNoAmparada`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<TpPedidoCorreoOcNoAmparada>;
      })
    );
  }
  /**
   * Obtener pPedido por su idpPedido
   * @param idtpPedidoCorreoOcNoAmparada Identificador de pPedido
   * @return OK
   */
  tpPedidoCorreoOcNoAmparadaObtener(idtpPedidoCorreoOcNoAmparada: string): __Observable<TpPedidoCorreoOcNoAmparada> {
    return this.tpPedidoCorreoOcNoAmparadaObtenerResponse(idtpPedidoCorreoOcNoAmparada).pipe(
      __map(_r => _r.body as TpPedidoCorreoOcNoAmparada)
    );
  }

  /**
   * Guardar o actualizar una dirección de empresa.
   * @param tpPedidoCorreoOcNoAmparada Dirección de empresa.
   * @return OK
   */
  tpPedidoCorreoOcNoAmparadaGuardarOActualizarResponse(tpPedidoCorreoOcNoAmparada: TpPedidoCorreoOcNoAmparada): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = tpPedidoCorreoOcNoAmparada;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/tpPedidoCorreoOcNoAmparada`,
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
   * @param tpPedidoCorreoOcNoAmparada Dirección de empresa.
   * @return OK
   */
  tpPedidoCorreoOcNoAmparadaGuardarOActualizar(tpPedidoCorreoOcNoAmparada: TpPedidoCorreoOcNoAmparada): __Observable<string> {
    return this.tpPedidoCorreoOcNoAmparadaGuardarOActualizarResponse(tpPedidoCorreoOcNoAmparada).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Obtener lista de pPedido
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  tpPedidoCorreoOcNoAmparadaQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultTpPedidoCorreoOcNoAmparada>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/tpPedidoCorreoOcNoAmparada`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultTpPedidoCorreoOcNoAmparada>;
      })
    );
  }
  /**
   * Obtener lista de pPedido
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  tpPedidoCorreoOcNoAmparadaQueryResult(info: QueryInfo): __Observable<QueryResultTpPedidoCorreoOcNoAmparada> {
    return this.tpPedidoCorreoOcNoAmparadaQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultTpPedidoCorreoOcNoAmparada)
    );
  }

  /**
   * Desactivar un pPedido.
   * @param idtpPedidoCorreoOcNoAmparada Identificador de elemento a desactivar.
   * @return OK
   */
  tpPedidoCorreoOcNoAmparadaDesactivarResponse(idtpPedidoCorreoOcNoAmparada: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idtpPedidoCorreoOcNoAmparada != null) __params = __params.set('idtpPedidoCorreoOcNoAmparada', idtpPedidoCorreoOcNoAmparada.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/tpPedidoCorreoOcNoAmparada`,
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
   * @param idtpPedidoCorreoOcNoAmparada Identificador de elemento a desactivar.
   * @return OK
   */
  tpPedidoCorreoOcNoAmparadaDesactivar(idtpPedidoCorreoOcNoAmparada: string): __Observable<string> {
    return this.tpPedidoCorreoOcNoAmparadaDesactivarResponse(idtpPedidoCorreoOcNoAmparada).pipe(
      __map(_r => _r.body as string)
    );
  }
}

module ProcesosL05TramitarPedidoCorreosService {
}

export { ProcesosL05TramitarPedidoCorreosService }
