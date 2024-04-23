/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiCatalogosConfiguration as __Configuration } from '../api-catalogos-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { Location } from '../models/location';
import { DirectionsPqfObj } from '../models/directions-pqf-obj';
import { ParametroGeocoding } from '../models/parametro-geocoding';
@Injectable({
  providedIn: 'root',
})
class ConfiguracionDireccionesGoogleService extends __BaseService {
  static readonly CoordenadasParaGoogleCoordenadasParaGoogleCdmxPath = '/CoordenadasParaGoogleCdmx';
  static readonly CoordenadasParaGoogleCoordenadasParaGoogleGdlPath = '/CoordenadasParaGoogleGdl';
  static readonly DirectionsProcessPath = '/GoogleDirections';
  static readonly GeocodingProcessPath = '/GoogleGeocoding';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * CoordenadasParaGoogleCdmx CoordenadasParaGoogle
   * @return OK
   */
  CoordenadasParaGoogleCoordenadasParaGoogleCdmxResponse(): __Observable<__StrictHttpResponse<Location>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/CoordenadasParaGoogleCdmx`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Location>;
      })
    );
  }
  /**
   * CoordenadasParaGoogleCdmx CoordenadasParaGoogle
   * @return OK
   */
  CoordenadasParaGoogleCoordenadasParaGoogleCdmx(): __Observable<Location> {
    return this.CoordenadasParaGoogleCoordenadasParaGoogleCdmxResponse().pipe(
      __map(_r => _r.body as Location)
    );
  }

  /**
   * CoordenadasParaGoogleGdl CoordenadasParaGoogle
   * @return OK
   */
  CoordenadasParaGoogleCoordenadasParaGoogleGdlResponse(): __Observable<__StrictHttpResponse<Location>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/CoordenadasParaGoogleGdl`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Location>;
      })
    );
  }
  /**
   * CoordenadasParaGoogleGdl CoordenadasParaGoogle
   * @return OK
   */
  CoordenadasParaGoogleCoordenadasParaGoogleGdl(): __Observable<Location> {
    return this.CoordenadasParaGoogleCoordenadasParaGoogleGdlResponse().pipe(
      __map(_r => _r.body as Location)
    );
  }

  /**
   * Process Directions
   * @param location undefined
   * @return OK
   */
  DirectionsProcessResponse(location: Location): __Observable<__StrictHttpResponse<DirectionsPqfObj>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = location;
    let req = new HttpRequest<any>(
      'PATCH',
      this.rootUrl + `/GoogleDirections`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<DirectionsPqfObj>;
      })
    );
  }
  /**
   * Process Directions
   * @param location undefined
   * @return OK
   */
  DirectionsProcess(location: Location): __Observable<DirectionsPqfObj> {
    return this.DirectionsProcessResponse(location).pipe(
      __map(_r => _r.body as DirectionsPqfObj)
    );
  }

  /**
   * Process Geocoding
   * @param parametroGeocoding undefined
   * @return OK
   */
  GeocodingProcessResponse(parametroGeocoding: ParametroGeocoding): __Observable<__StrictHttpResponse<Location>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = parametroGeocoding;
    let req = new HttpRequest<any>(
      'PATCH',
      this.rootUrl + `/GoogleGeocoding`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Location>;
      })
    );
  }
  /**
   * Process Geocoding
   * @param parametroGeocoding undefined
   * @return OK
   */
  GeocodingProcess(parametroGeocoding: ParametroGeocoding): __Observable<Location> {
    return this.GeocodingProcessResponse(parametroGeocoding).pipe(
      __map(_r => _r.body as Location)
    );
  }
}

module ConfiguracionDireccionesGoogleService {
}

export { ConfiguracionDireccionesGoogleService }
