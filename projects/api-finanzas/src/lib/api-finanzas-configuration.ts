/* tslint:disable */
import { Injectable } from '@angular/core';

/**
 * Global configuration for ApiFinanzas services
 */
@Injectable({
  providedIn: 'root',
})
export class ApiFinanzasConfiguration {
  rootUrl: string = 'https://172.24.20.17/Finanzas';
}

export interface ApiFinanzasConfigurationInterface {
  rootUrl?: string;
}
