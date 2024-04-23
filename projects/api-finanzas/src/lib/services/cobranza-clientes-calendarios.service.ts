/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiFinanzasConfiguration as __Configuration } from '../api-finanzas-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { FacturasPendientesClienteObj } from '../models/facturas-pendientes-cliente-obj';
@Injectable({
  providedIn: 'root',
})
class CobranzaClientesCalendariosService extends __BaseService {
  static readonly FacturasPendientesClienteDetalleDiccionarioFacturasPendientesClientePath = '/DiccionarioFacturasPendientesCliente';
  static readonly FacturasPendientesClienteDetalleObtenerPath = '/FacturasPendientesClienteDetalle';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * DiccionarioFacturasPendientesCliente FacturasPendientesClienteDetalle
   * @param idCliente undefined
   * @return OK
   */
  FacturasPendientesClienteDetalleDiccionarioFacturasPendientesClienteResponse(idCliente: string): __Observable<__StrictHttpResponse<{[key: string]: number}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idCliente != null) __params = __params.set('idCliente', idCliente.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/DiccionarioFacturasPendientesCliente`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{[key: string]: number}>;
      })
    );
  }
  /**
   * DiccionarioFacturasPendientesCliente FacturasPendientesClienteDetalle
   * @param idCliente undefined
   * @return OK
   */
  FacturasPendientesClienteDetalleDiccionarioFacturasPendientesCliente(idCliente: string): __Observable<{[key: string]: number}> {
    return this.FacturasPendientesClienteDetalleDiccionarioFacturasPendientesClienteResponse(idCliente).pipe(
      __map(_r => _r.body as {[key: string]: number})
    );
  }

  /**
   * Obtener FacturasPendientesClienteDetalle
   * @param idCliente undefined
   * @return OK
   */
  FacturasPendientesClienteDetalleObtenerResponse(idCliente: string): __Observable<__StrictHttpResponse<FacturasPendientesClienteObj>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idCliente != null) __params = __params.set('idCliente', idCliente.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/FacturasPendientesClienteDetalle`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<FacturasPendientesClienteObj>;
      })
    );
  }
  /**
   * Obtener FacturasPendientesClienteDetalle
   * @param idCliente undefined
   * @return OK
   */
  FacturasPendientesClienteDetalleObtener(idCliente: string): __Observable<FacturasPendientesClienteObj> {
    return this.FacturasPendientesClienteDetalleObtenerResponse(idCliente).pipe(
      __map(_r => _r.body as FacturasPendientesClienteObj)
    );
  }
}

module CobranzaClientesCalendariosService {
}

export { CobranzaClientesCalendariosService }
