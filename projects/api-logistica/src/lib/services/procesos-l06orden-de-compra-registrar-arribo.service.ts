/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiLogisticaConfiguration as __Configuration } from '../api-logistica-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { ImpOrdenDespachoArchivo } from '../models/imp-orden-despacho-archivo';
import { QueryResultImpOrdenDespachoArchivo } from '../models/query-result-imp-orden-despacho-archivo';
import { QueryInfo } from '../models/query-info';
import { DatosGraficaRegistrarArriboFleteraObj } from '../models/datos-grafica-registrar-arribo-fletera-obj';
import { DatosGraficaRegistrarArriboGuiaObj } from '../models/datos-grafica-registrar-arribo-guia-obj';
import { ExportadorOrdenDespachoObj } from '../models/exportador-orden-despacho-obj';
import { ProveedorOcPartidaPackingListObj } from '../models/proveedor-oc-partida-packing-list-obj';
import { QueryResultVRAImpOrdenDespacho } from '../models/query-result-vraimp-orden-despacho';
@Injectable({
  providedIn: 'root',
})
class ProcesosL06OrdenDeCompraRegistrarArriboService extends __BaseService {
  static readonly impOrdenDespachoArchivoObtenerPath = '/impOrdenDespachoArchivo';
  static readonly impOrdenDespachoArchivoGuardarOActualizarPath = '/impOrdenDespachoArchivo';
  static readonly impOrdenDespachoArchivoQueryResultPath = '/impOrdenDespachoArchivo';
  static readonly impOrdenDespachoArchivoDesactivarPath = '/impOrdenDespachoArchivo';
  static readonly vRAImpOrdenDespachoDatosGraficaRegistrarArriboFleteraObjPath = '/DatosGraficaRegistrarArriboFleteraObj';
  static readonly vRAImpOrdenDespachoDatosGraficaRegistrarArriboGuiaObjPath = '/DatosGraficaRegistrarArriboGuiaObj';
  static readonly vRAImpOrdenDespachoExportadorOrdenDespachoObjPath = '/ExportadorOrdenDespachoObj';
  static readonly vRAImpOrdenDespachoProveedorOcPartidaPackingListObjPath = '/ProveedorOcPartidaPackingListObj';
  static readonly vRAImpOrdenDespachoQueryResultPath = '/vRAImpOrdenDespacho';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Consultar registro de impOrdenDespachoArchivo
   * @param idimpOrdenDespachoArchivo Identificador de impOrdenDespachoArchivo
   * @return OK
   */
  impOrdenDespachoArchivoObtenerResponse(idimpOrdenDespachoArchivo: string): __Observable<__StrictHttpResponse<ImpOrdenDespachoArchivo>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idimpOrdenDespachoArchivo != null) __params = __params.set('idimpOrdenDespachoArchivo', idimpOrdenDespachoArchivo.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/impOrdenDespachoArchivo`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ImpOrdenDespachoArchivo>;
      })
    );
  }
  /**
   * Consultar registro de impOrdenDespachoArchivo
   * @param idimpOrdenDespachoArchivo Identificador de impOrdenDespachoArchivo
   * @return OK
   */
  impOrdenDespachoArchivoObtener(idimpOrdenDespachoArchivo: string): __Observable<ImpOrdenDespachoArchivo> {
    return this.impOrdenDespachoArchivoObtenerResponse(idimpOrdenDespachoArchivo).pipe(
      __map(_r => _r.body as ImpOrdenDespachoArchivo)
    );
  }

  /**
   * Guardar o actualizar impOrdenDespachoArchivo
   * @param impOrdenDespachoArchivo impOrdenDespachoArchivo
   * @return OK
   */
  impOrdenDespachoArchivoGuardarOActualizarResponse(impOrdenDespachoArchivo: ImpOrdenDespachoArchivo): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = impOrdenDespachoArchivo;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/impOrdenDespachoArchivo`,
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
   * Guardar o actualizar impOrdenDespachoArchivo
   * @param impOrdenDespachoArchivo impOrdenDespachoArchivo
   * @return OK
   */
  impOrdenDespachoArchivoGuardarOActualizar(impOrdenDespachoArchivo: ImpOrdenDespachoArchivo): __Observable<string> {
    return this.impOrdenDespachoArchivoGuardarOActualizarResponse(impOrdenDespachoArchivo).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar lista paginada de impOrdenDespachoArchivo
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  impOrdenDespachoArchivoQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultImpOrdenDespachoArchivo>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/impOrdenDespachoArchivo`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultImpOrdenDespachoArchivo>;
      })
    );
  }
  /**
   * Consultar lista paginada de impOrdenDespachoArchivo
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  impOrdenDespachoArchivoQueryResult(info: QueryInfo): __Observable<QueryResultImpOrdenDespachoArchivo> {
    return this.impOrdenDespachoArchivoQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultImpOrdenDespachoArchivo)
    );
  }

  /**
   * Desactivar registro de impOrdenDespachoArchivo
   * @param idimpOrdenDespachoArchivo Identificador de registro de impOrdenDespachoArchivo
   * @return OK
   */
  impOrdenDespachoArchivoDesactivarResponse(idimpOrdenDespachoArchivo: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idimpOrdenDespachoArchivo != null) __params = __params.set('idimpOrdenDespachoArchivo', idimpOrdenDespachoArchivo.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/impOrdenDespachoArchivo`,
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
   * Desactivar registro de impOrdenDespachoArchivo
   * @param idimpOrdenDespachoArchivo Identificador de registro de impOrdenDespachoArchivo
   * @return OK
   */
  impOrdenDespachoArchivoDesactivar(idimpOrdenDespachoArchivo: string): __Observable<string> {
    return this.impOrdenDespachoArchivoDesactivarResponse(idimpOrdenDespachoArchivo).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * DatosGraficaRegistrarArriboFleteraObj vRAImpOrdenDespacho
   * @param info undefined
   * @return OK
   */
  vRAImpOrdenDespachoDatosGraficaRegistrarArriboFleteraObjResponse(info: QueryInfo): __Observable<__StrictHttpResponse<DatosGraficaRegistrarArriboFleteraObj>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'PATCH',
      this.rootUrl + `/DatosGraficaRegistrarArriboFleteraObj`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<DatosGraficaRegistrarArriboFleteraObj>;
      })
    );
  }
  /**
   * DatosGraficaRegistrarArriboFleteraObj vRAImpOrdenDespacho
   * @param info undefined
   * @return OK
   */
  vRAImpOrdenDespachoDatosGraficaRegistrarArriboFleteraObj(info: QueryInfo): __Observable<DatosGraficaRegistrarArriboFleteraObj> {
    return this.vRAImpOrdenDespachoDatosGraficaRegistrarArriboFleteraObjResponse(info).pipe(
      __map(_r => _r.body as DatosGraficaRegistrarArriboFleteraObj)
    );
  }

  /**
   * DatosGraficaRegistrarArriboGuiaObj vRAImpOrdenDespacho
   * @param info undefined
   * @return OK
   */
  vRAImpOrdenDespachoDatosGraficaRegistrarArriboGuiaObjResponse(info: QueryInfo): __Observable<__StrictHttpResponse<DatosGraficaRegistrarArriboGuiaObj>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'PATCH',
      this.rootUrl + `/DatosGraficaRegistrarArriboGuiaObj`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<DatosGraficaRegistrarArriboGuiaObj>;
      })
    );
  }
  /**
   * DatosGraficaRegistrarArriboGuiaObj vRAImpOrdenDespacho
   * @param info undefined
   * @return OK
   */
  vRAImpOrdenDespachoDatosGraficaRegistrarArriboGuiaObj(info: QueryInfo): __Observable<DatosGraficaRegistrarArriboGuiaObj> {
    return this.vRAImpOrdenDespachoDatosGraficaRegistrarArriboGuiaObjResponse(info).pipe(
      __map(_r => _r.body as DatosGraficaRegistrarArriboGuiaObj)
    );
  }

  /**
   * ExportadorOrdenDespachoObj vRAImpOrdenDespacho
   * @param info undefined
   * @return OK
   */
  vRAImpOrdenDespachoExportadorOrdenDespachoObjResponse(info: QueryInfo): __Observable<__StrictHttpResponse<Array<ExportadorOrdenDespachoObj>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'PATCH',
      this.rootUrl + `/ExportadorOrdenDespachoObj`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<ExportadorOrdenDespachoObj>>;
      })
    );
  }
  /**
   * ExportadorOrdenDespachoObj vRAImpOrdenDespacho
   * @param info undefined
   * @return OK
   */
  vRAImpOrdenDespachoExportadorOrdenDespachoObj(info: QueryInfo): __Observable<Array<ExportadorOrdenDespachoObj>> {
    return this.vRAImpOrdenDespachoExportadorOrdenDespachoObjResponse(info).pipe(
      __map(_r => _r.body as Array<ExportadorOrdenDespachoObj>)
    );
  }

  /**
   * ProveedorOcPartidaPackingListObj vRAImpOrdenDespacho
   * @param info undefined
   * @return OK
   */
  vRAImpOrdenDespachoProveedorOcPartidaPackingListObjResponse(info: QueryInfo): __Observable<__StrictHttpResponse<Array<ProveedorOcPartidaPackingListObj>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'PATCH',
      this.rootUrl + `/ProveedorOcPartidaPackingListObj`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<ProveedorOcPartidaPackingListObj>>;
      })
    );
  }
  /**
   * ProveedorOcPartidaPackingListObj vRAImpOrdenDespacho
   * @param info undefined
   * @return OK
   */
  vRAImpOrdenDespachoProveedorOcPartidaPackingListObj(info: QueryInfo): __Observable<Array<ProveedorOcPartidaPackingListObj>> {
    return this.vRAImpOrdenDespachoProveedorOcPartidaPackingListObjResponse(info).pipe(
      __map(_r => _r.body as Array<ProveedorOcPartidaPackingListObj>)
    );
  }

  /**
   * Consultar lista paginada de vRAImpOrdenDespacho
   * @param info Filtros y ordenamientos
   * @return OK
   */
  vRAImpOrdenDespachoQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultVRAImpOrdenDespacho>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/vRAImpOrdenDespacho`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultVRAImpOrdenDespacho>;
      })
    );
  }
  /**
   * Consultar lista paginada de vRAImpOrdenDespacho
   * @param info Filtros y ordenamientos
   * @return OK
   */
  vRAImpOrdenDespachoQueryResult(info: QueryInfo): __Observable<QueryResultVRAImpOrdenDespacho> {
    return this.vRAImpOrdenDespachoQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultVRAImpOrdenDespacho)
    );
  }
}

module ProcesosL06OrdenDeCompraRegistrarArriboService {
}

export { ProcesosL06OrdenDeCompraRegistrarArriboService }
