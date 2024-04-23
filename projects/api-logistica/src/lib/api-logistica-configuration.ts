/* tslint:disable */
import { Injectable } from '@angular/core';

/**
 * Global configuration for ApiLogistica services
 */
@Injectable({
  providedIn: 'root',
})
export class ApiLogisticaConfiguration {
  rootUrl: string = 'https://172.24.20.17/Logistica';
}

export interface ApiLogisticaConfigurationInterface {
  rootUrl?: string;
}
