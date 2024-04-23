/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiLogisticaConfiguration as __Configuration } from '../api-logistica-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { EmbalarGraficaClientesObj } from '../models/embalar-grafica-clientes-obj';
import { FilterTuple } from '../models/filter-tuple';
import { EmbalarGraficaPrioridadesObj } from '../models/embalar-grafica-prioridades-obj';
import { EmbalarGraficaProveedoresObj } from '../models/embalar-grafica-proveedores-obj';
import { EmbalarGraficaProductosObj } from '../models/embalar-grafica-productos-obj';
@Injectable({
  providedIn: 'root',
})
class ProcesosL09EmbalarDashboardService extends __BaseService {
  static readonly EmbalarGraficaClientesEmbalarGraficaClientesPath = '/EmbalarGraficaClientes';
  static readonly EmbalarGraficaPrioridadesEmbalarGraficaPrioridadesPath = '/EmbalarGraficaPrioridades';
  static readonly EmbalarGraficaPrioridadesProveedoresEmbalarGraficaPrioridadesProveedoresPath = '/EmbalarGraficaPrioridadesProveedores';
  static readonly EmbalarGraficaProductosEmbalarGraficaProductosPath = '/EmbalarGraficaProductos';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * EmbalarGraficaClientes EmbalarGraficaClientes
   * @param filters undefined
   * @return OK
   */
  EmbalarGraficaClientesEmbalarGraficaClientesResponse(filters: Array<FilterTuple>): __Observable<__StrictHttpResponse<Array<EmbalarGraficaClientesObj>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = filters;
    let req = new HttpRequest<any>(
      'PATCH',
      this.rootUrl + `/EmbalarGraficaClientes`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<EmbalarGraficaClientesObj>>;
      })
    );
  }
  /**
   * EmbalarGraficaClientes EmbalarGraficaClientes
   * @param filters undefined
   * @return OK
   */
  EmbalarGraficaClientesEmbalarGraficaClientes(filters: Array<FilterTuple>): __Observable<Array<EmbalarGraficaClientesObj>> {
    return this.EmbalarGraficaClientesEmbalarGraficaClientesResponse(filters).pipe(
      __map(_r => _r.body as Array<EmbalarGraficaClientesObj>)
    );
  }

  /**
   * EmbalarGraficaPrioridades EmbalarGraficaPrioridades
   * @param filters undefined
   * @return OK
   */
  EmbalarGraficaPrioridadesEmbalarGraficaPrioridadesResponse(filters: Array<FilterTuple>): __Observable<__StrictHttpResponse<Array<EmbalarGraficaPrioridadesObj>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = filters;
    let req = new HttpRequest<any>(
      'PATCH',
      this.rootUrl + `/EmbalarGraficaPrioridades`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<EmbalarGraficaPrioridadesObj>>;
      })
    );
  }
  /**
   * EmbalarGraficaPrioridades EmbalarGraficaPrioridades
   * @param filters undefined
   * @return OK
   */
  EmbalarGraficaPrioridadesEmbalarGraficaPrioridades(filters: Array<FilterTuple>): __Observable<Array<EmbalarGraficaPrioridadesObj>> {
    return this.EmbalarGraficaPrioridadesEmbalarGraficaPrioridadesResponse(filters).pipe(
      __map(_r => _r.body as Array<EmbalarGraficaPrioridadesObj>)
    );
  }

  /**
   * EmbalarGraficaPrioridadesProveedores EmbalarGraficaPrioridadesProveedores
   * @param filters undefined
   * @return OK
   */
  EmbalarGraficaPrioridadesProveedoresEmbalarGraficaPrioridadesProveedoresResponse(filters: Array<FilterTuple>): __Observable<__StrictHttpResponse<Array<EmbalarGraficaProveedoresObj>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = filters;
    let req = new HttpRequest<any>(
      'PATCH',
      this.rootUrl + `/EmbalarGraficaPrioridadesProveedores`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<EmbalarGraficaProveedoresObj>>;
      })
    );
  }
  /**
   * EmbalarGraficaPrioridadesProveedores EmbalarGraficaPrioridadesProveedores
   * @param filters undefined
   * @return OK
   */
  EmbalarGraficaPrioridadesProveedoresEmbalarGraficaPrioridadesProveedores(filters: Array<FilterTuple>): __Observable<Array<EmbalarGraficaProveedoresObj>> {
    return this.EmbalarGraficaPrioridadesProveedoresEmbalarGraficaPrioridadesProveedoresResponse(filters).pipe(
      __map(_r => _r.body as Array<EmbalarGraficaProveedoresObj>)
    );
  }

  /**
   * EmbalarGraficaProductos EmbalarGraficaProductos
   * @param filters undefined
   * @return OK
   */
  EmbalarGraficaProductosEmbalarGraficaProductosResponse(filters: Array<FilterTuple>): __Observable<__StrictHttpResponse<EmbalarGraficaProductosObj>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = filters;
    let req = new HttpRequest<any>(
      'PATCH',
      this.rootUrl + `/EmbalarGraficaProductos`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<EmbalarGraficaProductosObj>;
      })
    );
  }
  /**
   * EmbalarGraficaProductos EmbalarGraficaProductos
   * @param filters undefined
   * @return OK
   */
  EmbalarGraficaProductosEmbalarGraficaProductos(filters: Array<FilterTuple>): __Observable<EmbalarGraficaProductosObj> {
    return this.EmbalarGraficaProductosEmbalarGraficaProductosResponse(filters).pipe(
      __map(_r => _r.body as EmbalarGraficaProductosObj)
    );
  }
}

module ProcesosL09EmbalarDashboardService {
}

export { ProcesosL09EmbalarDashboardService }
