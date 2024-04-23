/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiFinanzasConfiguration as __Configuration } from '../api-finanzas-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { FccPagoCliente } from '../models/fcc-pago-cliente';
import { ParametroDistribuidorParcialidadesPagos } from '../models/parametro-distribuidor-parcialidades-pagos';
@Injectable({
  providedIn: 'root',
})
class CobranzaClientesParcialidadesPagosService extends __BaseService {
  static readonly DistribuidorParcialidadesPagosProcessPath = '/DistribuidorParcialidadesPagos';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Process DistribuidorParcialidadesPagos
   * @param param undefined
   * @return OK
   */
  DistribuidorParcialidadesPagosProcessResponse(param: ParametroDistribuidorParcialidadesPagos): __Observable<__StrictHttpResponse<FccPagoCliente>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = param;
    let req = new HttpRequest<any>(
      'PATCH',
      this.rootUrl + `/DistribuidorParcialidadesPagos`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<FccPagoCliente>;
      })
    );
  }
  /**
   * Process DistribuidorParcialidadesPagos
   * @param param undefined
   * @return OK
   */
  DistribuidorParcialidadesPagosProcess(param: ParametroDistribuidorParcialidadesPagos): __Observable<FccPagoCliente> {
    return this.DistribuidorParcialidadesPagosProcessResponse(param).pipe(
      __map(_r => _r.body as FccPagoCliente)
    );
  }
}

module CobranzaClientesParcialidadesPagosService {
}

export { CobranzaClientesParcialidadesPagosService }
