/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiLogisticaConfiguration as __Configuration } from '../api-logistica-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { GMClienteCotizacion } from '../models/gmcliente-cotizacion';
@Injectable({
  providedIn: 'root',
})
class ProcesosL01CotizacionClienteService extends __BaseService {
  static readonly cotCotizacionCambiarClienteCambiarClienteCotizacionPath = '/cotCotizacionCambiarClienteNuevo';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * CambiarClienteCotizacion cotCotizacionCambiarCliente
   * @param gMClienteCotizacion undefined
   * @return OK
   */
  cotCotizacionCambiarClienteCambiarClienteCotizacionResponse(gMClienteCotizacion: GMClienteCotizacion): __Observable<__StrictHttpResponse<GMClienteCotizacion>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = gMClienteCotizacion;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/cotCotizacionCambiarClienteNuevo`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<GMClienteCotizacion>;
      })
    );
  }
  /**
   * CambiarClienteCotizacion cotCotizacionCambiarCliente
   * @param gMClienteCotizacion undefined
   * @return OK
   */
  cotCotizacionCambiarClienteCambiarClienteCotizacion(gMClienteCotizacion: GMClienteCotizacion): __Observable<GMClienteCotizacion> {
    return this.cotCotizacionCambiarClienteCambiarClienteCotizacionResponse(gMClienteCotizacion).pipe(
      __map(_r => _r.body as GMClienteCotizacion)
    );
  }
}

module ProcesosL01CotizacionClienteService {
}

export { ProcesosL01CotizacionClienteService }
