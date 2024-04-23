/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiLogisticaConfiguration as __Configuration } from '../api-logistica-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { QueryResultVOcProveedorMarcaFamiliaNoConfirmada } from '../models/query-result-voc-proveedor-marca-familia-no-confirmada';
import { QueryInfo } from '../models/query-info';
@Injectable({
  providedIn: 'root',
})
class ProcesosL06OrdenDeCompraConfirmacionService extends __BaseService {
  static readonly vOcProveedorMarcaFamiliaNoConfirmadaQueryResultPath = '/vOcProveedorMarcaFamiliaNoConfirmada';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Consultar lista paginada de vOcProveedorFamiliaNoConfirmada
   * @param info Filtros y ordenamientos
   * @return OK
   */
  vOcProveedorMarcaFamiliaNoConfirmadaQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultVOcProveedorMarcaFamiliaNoConfirmada>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/vOcProveedorMarcaFamiliaNoConfirmada`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultVOcProveedorMarcaFamiliaNoConfirmada>;
      })
    );
  }
  /**
   * Consultar lista paginada de vOcProveedorFamiliaNoConfirmada
   * @param info Filtros y ordenamientos
   * @return OK
   */
  vOcProveedorMarcaFamiliaNoConfirmadaQueryResult(info: QueryInfo): __Observable<QueryResultVOcProveedorMarcaFamiliaNoConfirmada> {
    return this.vOcProveedorMarcaFamiliaNoConfirmadaQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultVOcProveedorMarcaFamiliaNoConfirmada)
    );
  }
}

module ProcesosL06OrdenDeCompraConfirmacionService {
}

export { ProcesosL06OrdenDeCompraConfirmacionService }
