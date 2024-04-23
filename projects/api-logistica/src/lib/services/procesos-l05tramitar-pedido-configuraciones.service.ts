/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiLogisticaConfiguration as __Configuration } from '../api-logistica-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { TpPedidoComentariosAdicionales } from '../models/tp-pedido-comentarios-adicionales';
import { QueryResultTpPedidoComentariosAdicionales } from '../models/query-result-tp-pedido-comentarios-adicionales';
import { QueryInfo } from '../models/query-info';
import { TpPedidoContactoNotificadoEntrega } from '../models/tp-pedido-contacto-notificado-entrega';
import { QueryResultTpPedidoContactoNotificadoEntrega } from '../models/query-result-tp-pedido-contacto-notificado-entrega';
@Injectable({
  providedIn: 'root',
})
class ProcesosL05TramitarPedidoConfiguracionesService extends __BaseService {
  static readonly tpPedidoComentariosAdicionalesObtenerPath = '/tpPedidoComentariosAdicionales';
  static readonly tpPedidoComentariosAdicionalesGuardarOActualizarPath = '/tpPedidoComentariosAdicionales';
  static readonly tpPedidoComentariosAdicionalesQueryResultPath = '/tpPedidoComentariosAdicionales';
  static readonly tpPedidoComentariosAdicionalesDesactivarPath = '/tpPedidoComentariosAdicionales';
  static readonly tpPedidoContactoNotificadoEntregaObtenerPath = '/tpPedidoContactoNotificadoEntrega';
  static readonly tpPedidoContactoNotificadoEntregaGuardarOActualizarPath = '/tpPedidoContactoNotificadoEntrega';
  static readonly tpPedidoContactoNotificadoEntregaQueryResultPath = '/tpPedidoContactoNotificadoEntrega';
  static readonly tpPedidoContactoNotificadoEntregaDesactivarPath = '/tpPedidoContactoNotificadoEntrega';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Obtener tpPedidoComentariosAdicionales
   * @param idtpPedidoComentariosAdicionales undefined
   * @return OK
   */
  tpPedidoComentariosAdicionalesObtenerResponse(idtpPedidoComentariosAdicionales: string): __Observable<__StrictHttpResponse<TpPedidoComentariosAdicionales>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idtpPedidoComentariosAdicionales != null) __params = __params.set('idtpPedidoComentariosAdicionales', idtpPedidoComentariosAdicionales.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/tpPedidoComentariosAdicionales`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<TpPedidoComentariosAdicionales>;
      })
    );
  }
  /**
   * Obtener tpPedidoComentariosAdicionales
   * @param idtpPedidoComentariosAdicionales undefined
   * @return OK
   */
  tpPedidoComentariosAdicionalesObtener(idtpPedidoComentariosAdicionales: string): __Observable<TpPedidoComentariosAdicionales> {
    return this.tpPedidoComentariosAdicionalesObtenerResponse(idtpPedidoComentariosAdicionales).pipe(
      __map(_r => _r.body as TpPedidoComentariosAdicionales)
    );
  }

  /**
   * Guardar o actualizar una dirección de empresa.
   * @param tpPedidoComentariosAdicionales Dirección de empresa.
   * @return OK
   */
  tpPedidoComentariosAdicionalesGuardarOActualizarResponse(tpPedidoComentariosAdicionales: TpPedidoComentariosAdicionales): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = tpPedidoComentariosAdicionales;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/tpPedidoComentariosAdicionales`,
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
   * @param tpPedidoComentariosAdicionales Dirección de empresa.
   * @return OK
   */
  tpPedidoComentariosAdicionalesGuardarOActualizar(tpPedidoComentariosAdicionales: TpPedidoComentariosAdicionales): __Observable<string> {
    return this.tpPedidoComentariosAdicionalesGuardarOActualizarResponse(tpPedidoComentariosAdicionales).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Obtener lista de pPedido
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  tpPedidoComentariosAdicionalesQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultTpPedidoComentariosAdicionales>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/tpPedidoComentariosAdicionales`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultTpPedidoComentariosAdicionales>;
      })
    );
  }
  /**
   * Obtener lista de pPedido
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  tpPedidoComentariosAdicionalesQueryResult(info: QueryInfo): __Observable<QueryResultTpPedidoComentariosAdicionales> {
    return this.tpPedidoComentariosAdicionalesQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultTpPedidoComentariosAdicionales)
    );
  }

  /**
   * Desactivar tpPedidoComentariosAdicionales
   * @param idtpPedidoComentariosAdicionales undefined
   * @return OK
   */
  tpPedidoComentariosAdicionalesDesactivarResponse(idtpPedidoComentariosAdicionales: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idtpPedidoComentariosAdicionales != null) __params = __params.set('idtpPedidoComentariosAdicionales', idtpPedidoComentariosAdicionales.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/tpPedidoComentariosAdicionales`,
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
   * Desactivar tpPedidoComentariosAdicionales
   * @param idtpPedidoComentariosAdicionales undefined
   * @return OK
   */
  tpPedidoComentariosAdicionalesDesactivar(idtpPedidoComentariosAdicionales: string): __Observable<string> {
    return this.tpPedidoComentariosAdicionalesDesactivarResponse(idtpPedidoComentariosAdicionales).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Obtener pPedido por su idpPedido
   * @param idtpPedidoContactoNotificadoEntrega Identificador de pPedido
   * @return OK
   */
  tpPedidoContactoNotificadoEntregaObtenerResponse(idtpPedidoContactoNotificadoEntrega: string): __Observable<__StrictHttpResponse<TpPedidoContactoNotificadoEntrega>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idtpPedidoContactoNotificadoEntrega != null) __params = __params.set('idtpPedidoContactoNotificadoEntrega', idtpPedidoContactoNotificadoEntrega.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/tpPedidoContactoNotificadoEntrega`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<TpPedidoContactoNotificadoEntrega>;
      })
    );
  }
  /**
   * Obtener pPedido por su idpPedido
   * @param idtpPedidoContactoNotificadoEntrega Identificador de pPedido
   * @return OK
   */
  tpPedidoContactoNotificadoEntregaObtener(idtpPedidoContactoNotificadoEntrega: string): __Observable<TpPedidoContactoNotificadoEntrega> {
    return this.tpPedidoContactoNotificadoEntregaObtenerResponse(idtpPedidoContactoNotificadoEntrega).pipe(
      __map(_r => _r.body as TpPedidoContactoNotificadoEntrega)
    );
  }

  /**
   * Guardar o actualizar una dirección de empresa.
   * @param tpPedidoContactoNotificadoEntrega Dirección de empresa.
   * @return OK
   */
  tpPedidoContactoNotificadoEntregaGuardarOActualizarResponse(tpPedidoContactoNotificadoEntrega: TpPedidoContactoNotificadoEntrega): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = tpPedidoContactoNotificadoEntrega;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/tpPedidoContactoNotificadoEntrega`,
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
   * @param tpPedidoContactoNotificadoEntrega Dirección de empresa.
   * @return OK
   */
  tpPedidoContactoNotificadoEntregaGuardarOActualizar(tpPedidoContactoNotificadoEntrega: TpPedidoContactoNotificadoEntrega): __Observable<string> {
    return this.tpPedidoContactoNotificadoEntregaGuardarOActualizarResponse(tpPedidoContactoNotificadoEntrega).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Obtener lista de pPedido
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  tpPedidoContactoNotificadoEntregaQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultTpPedidoContactoNotificadoEntrega>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/tpPedidoContactoNotificadoEntrega`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultTpPedidoContactoNotificadoEntrega>;
      })
    );
  }
  /**
   * Obtener lista de pPedido
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  tpPedidoContactoNotificadoEntregaQueryResult(info: QueryInfo): __Observable<QueryResultTpPedidoContactoNotificadoEntrega> {
    return this.tpPedidoContactoNotificadoEntregaQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultTpPedidoContactoNotificadoEntrega)
    );
  }

  /**
   * Desactivar un pPedido.
   * @param idtpPedidoContactoNotificadoEntrega Identificador de elemento a desactivar.
   * @return OK
   */
  tpPedidoContactoNotificadoEntregaDesactivarResponse(idtpPedidoContactoNotificadoEntrega: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idtpPedidoContactoNotificadoEntrega != null) __params = __params.set('idtpPedidoContactoNotificadoEntrega', idtpPedidoContactoNotificadoEntrega.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/tpPedidoContactoNotificadoEntrega`,
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
   * @param idtpPedidoContactoNotificadoEntrega Identificador de elemento a desactivar.
   * @return OK
   */
  tpPedidoContactoNotificadoEntregaDesactivar(idtpPedidoContactoNotificadoEntrega: string): __Observable<string> {
    return this.tpPedidoContactoNotificadoEntregaDesactivarResponse(idtpPedidoContactoNotificadoEntrega).pipe(
      __map(_r => _r.body as string)
    );
  }
}

module ProcesosL05TramitarPedidoConfiguracionesService {
}

export { ProcesosL05TramitarPedidoConfiguracionesService }
