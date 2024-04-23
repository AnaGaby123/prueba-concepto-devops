/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiLogisticaConfiguration as __Configuration } from '../api-logistica-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { GraficasDashboardDeclararArribos } from '../models/graficas-dashboard-declarar-arribos';
@Injectable({
  providedIn: 'root',
})
class ProcesosL06OrdenDeCompraDeclararArribosDashboardService extends __BaseService {
  static readonly GraficasDashboardDeclararArribosObtenerPath = '/GraficasDashboardDeclararArribos';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Obtener GraficasDashboardDeclararArribos
   * @param PHS undefined
   * @return OK
   */
  GraficasDashboardDeclararArribosObtenerResponse(PHS?: boolean): __Observable<__StrictHttpResponse<GraficasDashboardDeclararArribos>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (PHS != null) __params = __params.set('PHS', PHS.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/GraficasDashboardDeclararArribos`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<GraficasDashboardDeclararArribos>;
      })
    );
  }
  /**
   * Obtener GraficasDashboardDeclararArribos
   * @param PHS undefined
   * @return OK
   */
  GraficasDashboardDeclararArribosObtener(PHS?: boolean): __Observable<GraficasDashboardDeclararArribos> {
    return this.GraficasDashboardDeclararArribosObtenerResponse(PHS).pipe(
      __map(_r => _r.body as GraficasDashboardDeclararArribos)
    );
  }
}

module ProcesosL06OrdenDeCompraDeclararArribosDashboardService {
}

export { ProcesosL06OrdenDeCompraDeclararArribosDashboardService }
