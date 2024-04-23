/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiLogisticaConfiguration as __Configuration } from '../api-logistica-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { ArchivoDetalle } from '../models/archivo-detalle';
import { GMSolicitarCartaDeDisponibilidad } from '../models/gmsolicitar-carta-de-disponibilidad';
import { EmpleadoDetalleObj } from '../models/empleado-detalle-obj';
import { QueryInfo } from '../models/query-info';
@Injectable({
  providedIn: 'root',
})
class ProcesosL05TramitarPedidoCartaDeDisponibilidadService extends __BaseService {
  static readonly CartaDeDisponibilidadGenerarCartaDeDisponibilidadPath = '/GenerarPDF/CartaDeDisponibilidad';
  static readonly CartaDeDisponibilidadObtenerEmpleadoRepresentanteLegalPath = '/GenerarPDF/ObtenerRepresentantesLegales';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Generador de PDF Carta de disponibilidad para los modulos: Pretramitar Pedido y Tramitar Pedido.
   * @param GMSolicitarCartaDeDisponibilidad Modelo con parametros.
   * @return OK
   */
  CartaDeDisponibilidadGenerarCartaDeDisponibilidadResponse(GMSolicitarCartaDeDisponibilidad: GMSolicitarCartaDeDisponibilidad): __Observable<__StrictHttpResponse<ArchivoDetalle>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = GMSolicitarCartaDeDisponibilidad;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/GenerarPDF/CartaDeDisponibilidad`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ArchivoDetalle>;
      })
    );
  }
  /**
   * Generador de PDF Carta de disponibilidad para los modulos: Pretramitar Pedido y Tramitar Pedido.
   * @param GMSolicitarCartaDeDisponibilidad Modelo con parametros.
   * @return OK
   */
  CartaDeDisponibilidadGenerarCartaDeDisponibilidad(GMSolicitarCartaDeDisponibilidad: GMSolicitarCartaDeDisponibilidad): __Observable<ArchivoDetalle> {
    return this.CartaDeDisponibilidadGenerarCartaDeDisponibilidadResponse(GMSolicitarCartaDeDisponibilidad).pipe(
      __map(_r => _r.body as ArchivoDetalle)
    );
  }

  /**
   * ObtenerEmpleadoRepresentanteLegal CartaDeDisponibilidad
   * @param info undefined
   * @return OK
   */
  CartaDeDisponibilidadObtenerEmpleadoRepresentanteLegalResponse(info: QueryInfo): __Observable<__StrictHttpResponse<Array<EmpleadoDetalleObj>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/GenerarPDF/ObtenerRepresentantesLegales`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<EmpleadoDetalleObj>>;
      })
    );
  }
  /**
   * ObtenerEmpleadoRepresentanteLegal CartaDeDisponibilidad
   * @param info undefined
   * @return OK
   */
  CartaDeDisponibilidadObtenerEmpleadoRepresentanteLegal(info: QueryInfo): __Observable<Array<EmpleadoDetalleObj>> {
    return this.CartaDeDisponibilidadObtenerEmpleadoRepresentanteLegalResponse(info).pipe(
      __map(_r => _r.body as Array<EmpleadoDetalleObj>)
    );
  }
}

module ProcesosL05TramitarPedidoCartaDeDisponibilidadService {
}

export { ProcesosL05TramitarPedidoCartaDeDisponibilidadService }
