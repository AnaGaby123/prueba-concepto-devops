/* tslint:disable */
import { Injectable } from '@angular/core';

/**
 * Global configuration for Api services
 */
@Injectable({
  providedIn: 'root',
})
export class ApiConfiguration {
  rootUrl: string = 'https://172.24.28.13/Logistica';
}

export interface ApiConfigurationInterface {
  rootUrl?: string;
}
