/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiCatalogosConfiguration as __Configuration } from '../api-catalogos-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { Familia } from '../models/familia';
import { QueryResultFamilia } from '../models/query-result-familia';
import { QueryInfo } from '../models/query-info';
import { GroupQueryResultVFamilia } from '../models/group-query-result-vfamilia';
import { GroupQueryInfo } from '../models/group-query-info';
import { QueryResultVFamilia } from '../models/query-result-vfamilia';
import { QueryResultVFamiliaLinea } from '../models/query-result-vfamilia-linea';
@Injectable({
  providedIn: 'root',
})
class ConfiguracionProductosConfiguracionFamiliasService extends __BaseService {
  static readonly FamiliaObtenerPath = '/Familia';
  static readonly FamiliaGuardarOActualizarPath = '/Familia';
  static readonly FamiliaQueryResultPath = '/Familia';
  static readonly vFamiliaGroupQueryResultPath = '/GrupoListavFamilia';
  static readonly vFamiliaQueryResultPath = '/vFamilia';
  static readonly vFamiliaLineaQueryResultPath = '/vFamiliaLinea';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Consultar registro de Familia
   * @param idFamilia Identificador de Familia
   * @return OK
   */
  FamiliaObtenerResponse(idFamilia: string): __Observable<__StrictHttpResponse<Familia>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idFamilia != null) __params = __params.set('idFamilia', idFamilia.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/Familia`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Familia>;
      })
    );
  }
  /**
   * Consultar registro de Familia
   * @param idFamilia Identificador de Familia
   * @return OK
   */
  FamiliaObtener(idFamilia: string): __Observable<Familia> {
    return this.FamiliaObtenerResponse(idFamilia).pipe(
      __map(_r => _r.body as Familia)
    );
  }

  /**
   * Guardar o actualizar Familia
   * @param Familia Familia
   * @return OK
   */
  FamiliaGuardarOActualizarResponse(Familia: Familia): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = Familia;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/Familia`,
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
   * Guardar o actualizar Familia
   * @param Familia Familia
   * @return OK
   */
  FamiliaGuardarOActualizar(Familia: Familia): __Observable<string> {
    return this.FamiliaGuardarOActualizarResponse(Familia).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar lista paginada de Familia
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  FamiliaQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultFamilia>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/Familia`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultFamilia>;
      })
    );
  }
  /**
   * Consultar lista paginada de Familia
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  FamiliaQueryResult(info: QueryInfo): __Observable<QueryResultFamilia> {
    return this.FamiliaQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultFamilia)
    );
  }

  /**
   * Consultar lista agrupada paginada de vFamilia
   * @param info Filtros, agrupado y ordenamientos
   * @return OK
   */
  vFamiliaGroupQueryResultResponse(info: GroupQueryInfo): __Observable<__StrictHttpResponse<GroupQueryResultVFamilia>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/GrupoListavFamilia`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<GroupQueryResultVFamilia>;
      })
    );
  }
  /**
   * Consultar lista agrupada paginada de vFamilia
   * @param info Filtros, agrupado y ordenamientos
   * @return OK
   */
  vFamiliaGroupQueryResult(info: GroupQueryInfo): __Observable<GroupQueryResultVFamilia> {
    return this.vFamiliaGroupQueryResultResponse(info).pipe(
      __map(_r => _r.body as GroupQueryResultVFamilia)
    );
  }

  /**
   * Consultar lista paginada de vFamilia
   * @param info Filtros y ordenamientos
   * @return OK
   */
  vFamiliaQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultVFamilia>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/vFamilia`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultVFamilia>;
      })
    );
  }
  /**
   * Consultar lista paginada de vFamilia
   * @param info Filtros y ordenamientos
   * @return OK
   */
  vFamiliaQueryResult(info: QueryInfo): __Observable<QueryResultVFamilia> {
    return this.vFamiliaQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultVFamilia)
    );
  }

  /**
   * Consultar lista paginada de vFamiliaLinea
   * @param info Filtros y ordenamientos
   * @return OK
   */
  vFamiliaLineaQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultVFamiliaLinea>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/vFamiliaLinea`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultVFamiliaLinea>;
      })
    );
  }
  /**
   * Consultar lista paginada de vFamiliaLinea
   * @param info Filtros y ordenamientos
   * @return OK
   */
  vFamiliaLineaQueryResult(info: QueryInfo): __Observable<QueryResultVFamiliaLinea> {
    return this.vFamiliaLineaQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultVFamiliaLinea)
    );
  }
}

module ConfiguracionProductosConfiguracionFamiliasService {
}

export { ConfiguracionProductosConfiguracionFamiliasService }
