/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiLogisticaConfiguration as __Configuration } from '../api-logistica-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { CotCotizacionFleteExpress } from '../models/cot-cotizacion-flete-express';
import { QueryResultCotCotizacionFleteExpress } from '../models/query-result-cot-cotizacion-flete-express';
import { QueryInfo } from '../models/query-info';
import { GroupQueryResultCotCotizacionFleteExpressDetalle } from '../models/group-query-result-cot-cotizacion-flete-express-detalle';
import { GroupQueryInfo } from '../models/group-query-info';
import { QueryResultCotCotizacionFleteExpressDetalle } from '../models/query-result-cot-cotizacion-flete-express-detalle';
@Injectable({
  providedIn: 'root',
})
class ProcesosL01CotizacionFletesService extends __BaseService {
  static readonly cotCotizacionFleteExpressObtenerPath = '/cotCotizacionFleteExpress';
  static readonly cotCotizacionFleteExpressGuardarOActualizarPath = '/cotCotizacionFleteExpress';
  static readonly cotCotizacionFleteExpressQueryResultPath = '/cotCotizacionFleteExpress';
  static readonly cotCotizacionFleteExpressDesactivarPath = '/cotCotizacionFleteExpress';
  static readonly cotCotizacionFleteExpressDetalleGroupQueryResultPath = '/GrupoListacotCotizacionFleteExpressDetalle';
  static readonly cotCotizacionFleteExpressDetalleQueryResultPath = '/cotCotizacionFleteExpressDetalle';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Obtener un cotCotizacionFleteExpress por su idcotCotizacionFleteExpress
   * @param idcotCotizacionFleteExpress identificador del cotCotizacionFleteExpress
   * @return OK
   */
  cotCotizacionFleteExpressObtenerResponse(idcotCotizacionFleteExpress: string): __Observable<__StrictHttpResponse<CotCotizacionFleteExpress>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idcotCotizacionFleteExpress != null) __params = __params.set('idcotCotizacionFleteExpress', idcotCotizacionFleteExpress.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/cotCotizacionFleteExpress`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<CotCotizacionFleteExpress>;
      })
    );
  }
  /**
   * Obtener un cotCotizacionFleteExpress por su idcotCotizacionFleteExpress
   * @param idcotCotizacionFleteExpress identificador del cotCotizacionFleteExpress
   * @return OK
   */
  cotCotizacionFleteExpressObtener(idcotCotizacionFleteExpress: string): __Observable<CotCotizacionFleteExpress> {
    return this.cotCotizacionFleteExpressObtenerResponse(idcotCotizacionFleteExpress).pipe(
      __map(_r => _r.body as CotCotizacionFleteExpress)
    );
  }

  /**
   * Guardar o actualizar un cotCotizacionFleteExpress
   * @param partidaCotizacion cotCotizacionFleteExpress a actualizar o guardar
   * @return OK
   */
  cotCotizacionFleteExpressGuardarOActualizarResponse(partidaCotizacion: CotCotizacionFleteExpress): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = partidaCotizacion;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/cotCotizacionFleteExpress`,
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
   * Guardar o actualizar un cotCotizacionFleteExpress
   * @param partidaCotizacion cotCotizacionFleteExpress a actualizar o guardar
   * @return OK
   */
  cotCotizacionFleteExpressGuardarOActualizar(partidaCotizacion: CotCotizacionFleteExpress): __Observable<string> {
    return this.cotCotizacionFleteExpressGuardarOActualizarResponse(partidaCotizacion).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Obtener lista de cotCotizacionFleteExpress.
   * @param info Objeto de tipo QueryInfo para obtener la lista.
   * @return OK
   */
  cotCotizacionFleteExpressQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultCotCotizacionFleteExpress>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/cotCotizacionFleteExpress`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultCotCotizacionFleteExpress>;
      })
    );
  }
  /**
   * Obtener lista de cotCotizacionFleteExpress.
   * @param info Objeto de tipo QueryInfo para obtener la lista.
   * @return OK
   */
  cotCotizacionFleteExpressQueryResult(info: QueryInfo): __Observable<QueryResultCotCotizacionFleteExpress> {
    return this.cotCotizacionFleteExpressQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultCotCotizacionFleteExpress)
    );
  }

  /**
   * Desactivar un cotCotizacionFleteExpress. Desactiva las partidas hijas que son los complementos y suplementos.
   * @param idcotCotizacionFleteExpress Identificador de cotCotizacionFleteExpress a ser desactivado.
   * @return OK
   */
  cotCotizacionFleteExpressDesactivarResponse(idcotCotizacionFleteExpress: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idcotCotizacionFleteExpress != null) __params = __params.set('idcotCotizacionFleteExpress', idcotCotizacionFleteExpress.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/cotCotizacionFleteExpress`,
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
   * Desactivar un cotCotizacionFleteExpress. Desactiva las partidas hijas que son los complementos y suplementos.
   * @param idcotCotizacionFleteExpress Identificador de cotCotizacionFleteExpress a ser desactivado.
   * @return OK
   */
  cotCotizacionFleteExpressDesactivar(idcotCotizacionFleteExpress: string): __Observable<string> {
    return this.cotCotizacionFleteExpressDesactivarResponse(idcotCotizacionFleteExpress).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * GroupQueryResult cotCotizacionFleteExpressDetalle
   * @param info undefined
   * @return OK
   */
  cotCotizacionFleteExpressDetalleGroupQueryResultResponse(info: GroupQueryInfo): __Observable<__StrictHttpResponse<GroupQueryResultCotCotizacionFleteExpressDetalle>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/GrupoListacotCotizacionFleteExpressDetalle`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<GroupQueryResultCotCotizacionFleteExpressDetalle>;
      })
    );
  }
  /**
   * GroupQueryResult cotCotizacionFleteExpressDetalle
   * @param info undefined
   * @return OK
   */
  cotCotizacionFleteExpressDetalleGroupQueryResult(info: GroupQueryInfo): __Observable<GroupQueryResultCotCotizacionFleteExpressDetalle> {
    return this.cotCotizacionFleteExpressDetalleGroupQueryResultResponse(info).pipe(
      __map(_r => _r.body as GroupQueryResultCotCotizacionFleteExpressDetalle)
    );
  }

  /**
   * Consultar lista paginada de cotCotizacionFleteExpressDetalle
   * @param info Filtros y ordenamientos
   * @return OK
   */
  cotCotizacionFleteExpressDetalleQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultCotCotizacionFleteExpressDetalle>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/cotCotizacionFleteExpressDetalle`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultCotCotizacionFleteExpressDetalle>;
      })
    );
  }
  /**
   * Consultar lista paginada de cotCotizacionFleteExpressDetalle
   * @param info Filtros y ordenamientos
   * @return OK
   */
  cotCotizacionFleteExpressDetalleQueryResult(info: QueryInfo): __Observable<QueryResultCotCotizacionFleteExpressDetalle> {
    return this.cotCotizacionFleteExpressDetalleQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultCotCotizacionFleteExpressDetalle)
    );
  }
}

module ProcesosL01CotizacionFletesService {
}

export { ProcesosL01CotizacionFletesService }
