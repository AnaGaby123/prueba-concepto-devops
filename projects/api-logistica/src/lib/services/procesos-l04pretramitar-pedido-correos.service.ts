/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiLogisticaConfiguration as __Configuration } from '../api-logistica-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { PpPedidoCorreoEnviado } from '../models/pp-pedido-correo-enviado';
import { QueryResultPpPedidoCorreoEnviado } from '../models/query-result-pp-pedido-correo-enviado';
import { QueryInfo } from '../models/query-info';
@Injectable({
  providedIn: 'root',
})
class ProcesosL04PretramitarPedidoCorreosService extends __BaseService {
  static readonly ppPedidoCorreoEnviadoObtenerPath = '/ppPedidoCorreoEnviado';
  static readonly ppPedidoCorreoEnviadoGuardarOActualizarPath = '/ppPedidoCorreoEnviado';
  static readonly ppPedidoCorreoEnviadoQueryResultPath = '/ppPedidoCorreoEnviado';
  static readonly ppPedidoCorreoEnviadoDesactivarPath = '/ppPedidoCorreoEnviado';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Obtener un ppPedidoCorreoEnviado por su idppPedidoCorreoEnviado
   * @param idppPedidoCorreoEnviado identificador del ppPedidoCorreoEnviado
   * @return OK
   */
  ppPedidoCorreoEnviadoObtenerResponse(idppPedidoCorreoEnviado: string): __Observable<__StrictHttpResponse<PpPedidoCorreoEnviado>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idppPedidoCorreoEnviado != null) __params = __params.set('idppPedidoCorreoEnviado', idppPedidoCorreoEnviado.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/ppPedidoCorreoEnviado`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<PpPedidoCorreoEnviado>;
      })
    );
  }
  /**
   * Obtener un ppPedidoCorreoEnviado por su idppPedidoCorreoEnviado
   * @param idppPedidoCorreoEnviado identificador del ppPedidoCorreoEnviado
   * @return OK
   */
  ppPedidoCorreoEnviadoObtener(idppPedidoCorreoEnviado: string): __Observable<PpPedidoCorreoEnviado> {
    return this.ppPedidoCorreoEnviadoObtenerResponse(idppPedidoCorreoEnviado).pipe(
      __map(_r => _r.body as PpPedidoCorreoEnviado)
    );
  }

  /**
   * Guardar o actualizar un ppPedidoCorreoEnviado
   * @param ppPedidoCorreoEnviado ppPedidoCorreoEnviado a actualizar o guardar
   * @return OK
   */
  ppPedidoCorreoEnviadoGuardarOActualizarResponse(ppPedidoCorreoEnviado: PpPedidoCorreoEnviado): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = ppPedidoCorreoEnviado;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/ppPedidoCorreoEnviado`,
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
   * Guardar o actualizar un ppPedidoCorreoEnviado
   * @param ppPedidoCorreoEnviado ppPedidoCorreoEnviado a actualizar o guardar
   * @return OK
   */
  ppPedidoCorreoEnviadoGuardarOActualizar(ppPedidoCorreoEnviado: PpPedidoCorreoEnviado): __Observable<string> {
    return this.ppPedidoCorreoEnviadoGuardarOActualizarResponse(ppPedidoCorreoEnviado).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Obtener lista de ppPedidoCorreoEnviado.
   * @param info Objeto de tipo QueryInfo para obtener la lista.
   * @return OK
   */
  ppPedidoCorreoEnviadoQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultPpPedidoCorreoEnviado>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/ppPedidoCorreoEnviado`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultPpPedidoCorreoEnviado>;
      })
    );
  }
  /**
   * Obtener lista de ppPedidoCorreoEnviado.
   * @param info Objeto de tipo QueryInfo para obtener la lista.
   * @return OK
   */
  ppPedidoCorreoEnviadoQueryResult(info: QueryInfo): __Observable<QueryResultPpPedidoCorreoEnviado> {
    return this.ppPedidoCorreoEnviadoQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultPpPedidoCorreoEnviado)
    );
  }

  /**
   * Desactivar un ppPedidoCorreoEnviado.
   * @param idppPedidoCorreoEnviado Identificador de ppPedidoCorreoEnviado a ser desactivado.
   * @return OK
   */
  ppPedidoCorreoEnviadoDesactivarResponse(idppPedidoCorreoEnviado: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idppPedidoCorreoEnviado != null) __params = __params.set('idppPedidoCorreoEnviado', idppPedidoCorreoEnviado.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/ppPedidoCorreoEnviado`,
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
   * Desactivar un ppPedidoCorreoEnviado.
   * @param idppPedidoCorreoEnviado Identificador de ppPedidoCorreoEnviado a ser desactivado.
   * @return OK
   */
  ppPedidoCorreoEnviadoDesactivar(idppPedidoCorreoEnviado: string): __Observable<string> {
    return this.ppPedidoCorreoEnviadoDesactivarResponse(idppPedidoCorreoEnviado).pipe(
      __map(_r => _r.body as string)
    );
  }
}

module ProcesosL04PretramitarPedidoCorreosService {
}

export { ProcesosL04PretramitarPedidoCorreosService }
