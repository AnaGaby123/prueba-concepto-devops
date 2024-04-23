/* tslint:disable */
import { Injectable } from '@angular/core';

/**
 * Global configuration for ApiCatalogos services
 */
@Injectable({
  providedIn: 'root',
})
export class ApiCatalogosConfiguration {
  rootUrl: string = 'https://172.24.20.17/Catalogos';
}

export interface ApiCatalogosConfigurationInterface {
  rootUrl?: string;
}
