/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiLogisticaConfiguration as __Configuration } from '../api-logistica-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { TasasConversionObj } from '../models/tasas-conversion-obj';
import { ParametroTasasConversion } from '../models/parametro-tasas-conversion';
import { GroupQueryResultPartidaCotizacionTasaConversionObj } from '../models/group-query-result-partida-cotizacion-tasa-conversion-obj';
import { GroupQueryInfo } from '../models/group-query-info';
import { QueryResultPartidaCotizacionTasaConversionObj } from '../models/query-result-partida-cotizacion-tasa-conversion-obj';
import { QueryInfo } from '../models/query-info';
@Injectable({
  providedIn: 'root',
})
class ProcesosL01CotizacionCierreTasasConversionService extends __BaseService {
  static readonly GraficaTasasConversionProcessPath = '/GraficaTasasConversion';
  static readonly PartidaCotizacionTasaConversionObjGroupQueryResultPath = '/GrupoListaPartidaCotizacionTasaConversionObj';
  static readonly PartidaCotizacionTasaConversionObjQueryResultPath = '/PartidaCotizacionTasaConversionObj';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Process GraficaTasasConversion
   * @param param undefined
   * @return OK
   */
  GraficaTasasConversionProcessResponse(param: ParametroTasasConversion): __Observable<__StrictHttpResponse<TasasConversionObj>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = param;
    let req = new HttpRequest<any>(
      'PATCH',
      this.rootUrl + `/GraficaTasasConversion`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<TasasConversionObj>;
      })
    );
  }
  /**
   * Process GraficaTasasConversion
   * @param param undefined
   * @return OK
   */
  GraficaTasasConversionProcess(param: ParametroTasasConversion): __Observable<TasasConversionObj> {
    return this.GraficaTasasConversionProcessResponse(param).pipe(
      __map(_r => _r.body as TasasConversionObj)
    );
  }

  /**
   * GroupQueryResult PartidaCotizacionTasaConversionObj
   * @param info undefined
   * @return OK
   */
  PartidaCotizacionTasaConversionObjGroupQueryResultResponse(info: GroupQueryInfo): __Observable<__StrictHttpResponse<GroupQueryResultPartidaCotizacionTasaConversionObj>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/GrupoListaPartidaCotizacionTasaConversionObj`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<GroupQueryResultPartidaCotizacionTasaConversionObj>;
      })
    );
  }
  /**
   * GroupQueryResult PartidaCotizacionTasaConversionObj
   * @param info undefined
   * @return OK
   */
  PartidaCotizacionTasaConversionObjGroupQueryResult(info: GroupQueryInfo): __Observable<GroupQueryResultPartidaCotizacionTasaConversionObj> {
    return this.PartidaCotizacionTasaConversionObjGroupQueryResultResponse(info).pipe(
      __map(_r => _r.body as GroupQueryResultPartidaCotizacionTasaConversionObj)
    );
  }

  /**
   * Consultar lista paginada de PartidaCotizacionTasaConversionObj
   * @param info Filtros y ordenamientos
   * @return OK
   */
  PartidaCotizacionTasaConversionObjQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultPartidaCotizacionTasaConversionObj>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/PartidaCotizacionTasaConversionObj`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultPartidaCotizacionTasaConversionObj>;
      })
    );
  }
  /**
   * Consultar lista paginada de PartidaCotizacionTasaConversionObj
   * @param info Filtros y ordenamientos
   * @return OK
   */
  PartidaCotizacionTasaConversionObjQueryResult(info: QueryInfo): __Observable<QueryResultPartidaCotizacionTasaConversionObj> {
    return this.PartidaCotizacionTasaConversionObjQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultPartidaCotizacionTasaConversionObj)
    );
  }
}

module ProcesosL01CotizacionCierreTasasConversionService {
}

export { ProcesosL01CotizacionCierreTasasConversionService }
