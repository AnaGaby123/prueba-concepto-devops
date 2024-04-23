/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiLogisticaConfiguration as __Configuration } from '../api-logistica-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { CerrarOfertaTotalesPartidasClienteObj } from '../models/cerrar-oferta-totales-partidas-cliente-obj';
@Injectable({
  providedIn: 'root',
})
class ProcesosL01CotizacionCerrarOfertaTopIndexService extends __BaseService {
  static readonly CerrarOfertaTotalesPartidasClienteObtenerPath = '/CerrarOfertaTotalesPartidasCliente';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Obtener CerrarOfertaTotalesPartidasCliente
   * @param idUsuario undefined
   * @return OK
   */
  CerrarOfertaTotalesPartidasClienteObtenerResponse(idUsuario: string): __Observable<__StrictHttpResponse<CerrarOfertaTotalesPartidasClienteObj>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idUsuario != null) __params = __params.set('idUsuario', idUsuario.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/CerrarOfertaTotalesPartidasCliente`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<CerrarOfertaTotalesPartidasClienteObj>;
      })
    );
  }
  /**
   * Obtener CerrarOfertaTotalesPartidasCliente
   * @param idUsuario undefined
   * @return OK
   */
  CerrarOfertaTotalesPartidasClienteObtener(idUsuario: string): __Observable<CerrarOfertaTotalesPartidasClienteObj> {
    return this.CerrarOfertaTotalesPartidasClienteObtenerResponse(idUsuario).pipe(
      __map(_r => _r.body as CerrarOfertaTotalesPartidasClienteObj)
    );
  }
}

module ProcesosL01CotizacionCerrarOfertaTopIndexService {
}

export { ProcesosL01CotizacionCerrarOfertaTopIndexService }
