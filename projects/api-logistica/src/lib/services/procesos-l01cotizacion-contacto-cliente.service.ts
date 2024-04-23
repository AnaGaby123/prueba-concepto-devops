/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiLogisticaConfiguration as __Configuration } from '../api-logistica-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { GMContactosCliente } from '../models/gmcontactos-cliente';
@Injectable({
  providedIn: 'root',
})
class ProcesosL01CotizacionContactoClienteService extends __BaseService {
  static readonly cotCotizacionContactoClienteObtenerContactosClienteCotizacionPath = '/cotCotizacionContactoClienteNuevo';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * ObtenerContactosClienteCotizacion cotCotizacionContactoCliente
   * @param IdCotCotizaciones undefined
   * @return OK
   */
  cotCotizacionContactoClienteObtenerContactosClienteCotizacionResponse(IdCotCotizaciones: Array<string>): __Observable<__StrictHttpResponse<GMContactosCliente>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = IdCotCotizaciones;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/cotCotizacionContactoClienteNuevo`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<GMContactosCliente>;
      })
    );
  }
  /**
   * ObtenerContactosClienteCotizacion cotCotizacionContactoCliente
   * @param IdCotCotizaciones undefined
   * @return OK
   */
  cotCotizacionContactoClienteObtenerContactosClienteCotizacion(IdCotCotizaciones: Array<string>): __Observable<GMContactosCliente> {
    return this.cotCotizacionContactoClienteObtenerContactosClienteCotizacionResponse(IdCotCotizaciones).pipe(
      __map(_r => _r.body as GMContactosCliente)
    );
  }
}

module ProcesosL01CotizacionContactoClienteService {
}

export { ProcesosL01CotizacionContactoClienteService }
