/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiLogisticaConfiguration as __Configuration } from '../api-logistica-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { DatosGraficaClienteEstrategiaCotizacionObj } from '../models/datos-grafica-cliente-estrategia-cotizacion-obj';
import { QueryInfo } from '../models/query-info';
import { ClienteEstrategiaCotizacionObj } from '../models/cliente-estrategia-cotizacion-obj';
import { ClienteEstrategiaCotizacionMarcasObj } from '../models/cliente-estrategia-cotizacion-marcas-obj';
@Injectable({
  providedIn: 'root',
})
class ProcesosL02AjustarOfertaEstablecerEstrategiaCotizacionService extends __BaseService {
  static readonly ClienteEstrategiaCotizacionDatosGraficaClienteEstrategiaCotizacionObjPath = '/DatosGraficaClienteEstrategiaCotizacionObj';
  static readonly ClienteEstrategiaCotizacionQueryResultPath = '/ObtenerClienteEstrategiaCotizacion';
  static readonly ClienteEstrategiaCotizacionMarcasQueryResultPath = '/ObtenerClienteEstrategiaCotizacionMarcas';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * DatosGraficaClienteEstrategiaCotizacionObj ClienteEstrategiaCotizacion
   * @param info undefined
   * @return OK
   */
  ClienteEstrategiaCotizacionDatosGraficaClienteEstrategiaCotizacionObjResponse(info: QueryInfo): __Observable<__StrictHttpResponse<DatosGraficaClienteEstrategiaCotizacionObj>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'PATCH',
      this.rootUrl + `/DatosGraficaClienteEstrategiaCotizacionObj`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<DatosGraficaClienteEstrategiaCotizacionObj>;
      })
    );
  }
  /**
   * DatosGraficaClienteEstrategiaCotizacionObj ClienteEstrategiaCotizacion
   * @param info undefined
   * @return OK
   */
  ClienteEstrategiaCotizacionDatosGraficaClienteEstrategiaCotizacionObj(info: QueryInfo): __Observable<DatosGraficaClienteEstrategiaCotizacionObj> {
    return this.ClienteEstrategiaCotizacionDatosGraficaClienteEstrategiaCotizacionObjResponse(info).pipe(
      __map(_r => _r.body as DatosGraficaClienteEstrategiaCotizacionObj)
    );
  }

  /**
   * QueryResult ClienteEstrategiaCotizacion
   * @param info undefined
   * @return OK
   */
  ClienteEstrategiaCotizacionQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<Array<ClienteEstrategiaCotizacionObj>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'PATCH',
      this.rootUrl + `/ObtenerClienteEstrategiaCotizacion`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<ClienteEstrategiaCotizacionObj>>;
      })
    );
  }
  /**
   * QueryResult ClienteEstrategiaCotizacion
   * @param info undefined
   * @return OK
   */
  ClienteEstrategiaCotizacionQueryResult(info: QueryInfo): __Observable<Array<ClienteEstrategiaCotizacionObj>> {
    return this.ClienteEstrategiaCotizacionQueryResultResponse(info).pipe(
      __map(_r => _r.body as Array<ClienteEstrategiaCotizacionObj>)
    );
  }

  /**
   * Consultar lista paginada de marcas con su estado de contrato en base al cliente
   * @param info Objeto con IdCliente y ordenamiento
   * @return OK
   */
  ClienteEstrategiaCotizacionMarcasQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<Array<ClienteEstrategiaCotizacionMarcasObj>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'PATCH',
      this.rootUrl + `/ObtenerClienteEstrategiaCotizacionMarcas`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<ClienteEstrategiaCotizacionMarcasObj>>;
      })
    );
  }
  /**
   * Consultar lista paginada de marcas con su estado de contrato en base al cliente
   * @param info Objeto con IdCliente y ordenamiento
   * @return OK
   */
  ClienteEstrategiaCotizacionMarcasQueryResult(info: QueryInfo): __Observable<Array<ClienteEstrategiaCotizacionMarcasObj>> {
    return this.ClienteEstrategiaCotizacionMarcasQueryResultResponse(info).pipe(
      __map(_r => _r.body as Array<ClienteEstrategiaCotizacionMarcasObj>)
    );
  }
}

module ProcesosL02AjustarOfertaEstablecerEstrategiaCotizacionService {
}

export { ProcesosL02AjustarOfertaEstablecerEstrategiaCotizacionService }
