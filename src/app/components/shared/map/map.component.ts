import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  Renderer2,
  ViewChild,
} from '@angular/core';
import {Loader} from '@googlemaps/js-api-loader';
import {Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {Subscription} from 'rxjs';
import {
  selectApiKeyMaps,
  selectClientPinImage,
  selectMapStyles,
  selectProquifaCdmxCords,
  selectProquifaGuadalajaraCords,
  selectProquifaPinImage,
} from '@appSelectors/settings/settings.selectors';
import {Cords} from '@appModels/store/settings/settings.model';
import Marker = google.maps.Marker;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements AfterViewInit, OnDestroy {
  @ViewChild('map') mapInput: ElementRef;
  @Input() clientCoords;
  @Input() clientRoute: DropListOption = {} as DropListOption;
  @Output() event: EventEmitter<{lat: number; lng: number}> = new EventEmitter<{
    lat;
    lng;
  }>();
  latData: number;
  lngData: number;
  apiKey: Subscription;
  apiKeyValue = null;
  clientPin: Subscription;
  clientPinValue = '';
  directionsRenderer: google.maps.DirectionsRenderer = null;
  directionsService: google.maps.DirectionsService = null;
  map: google.maps.Map;
  mapElement;
  mapsStyles: Subscription;
  mapsStylesValue = [];
  marker: Marker;
  proquifaCDMXCoords: Subscription;
  proquifaCDMXCoordsValue = {};
  proquifaCoords;
  proquifaGuadalajaraCoords: Subscription;
  proquifaGuadalajaraCoordsValue = {};
  proquifaMarker: Marker;
  proquifaPin: Subscription;
  proquifaPinValue = '';

  constructor(
    private renderer2: Renderer2,
    private cdr: ChangeDetectorRef,
    private store: Store<AppState>,
  ) {
    this.apiKey = this.store
      .select(selectApiKeyMaps)
      .subscribe((value: string) => (this.apiKeyValue = value));
    this.mapsStyles = this.store
      .select(selectMapStyles)
      .subscribe((value: Array<string>) => (this.mapsStylesValue = value));
    this.clientPin = this.store
      .select(selectClientPinImage)
      .subscribe((value: string) => (this.clientPinValue = value));
    this.proquifaPin = this.store
      .select(selectProquifaPinImage)
      .subscribe((value: string) => (this.proquifaPinValue = value));
    this.proquifaCDMXCoords = this.store
      .select(selectProquifaCdmxCords)
      .subscribe((value: Cords) => (this.proquifaCDMXCoordsValue = value));
    this.proquifaGuadalajaraCoords = this.store
      .select(selectProquifaGuadalajaraCords)
      .subscribe((value: Cords) => (this.proquifaGuadalajaraCoordsValue = value));
  }

  d;

  ngAfterViewInit(): void {
    // DOCS Obtiene las coordenadas de origen
    if (this.clientRoute.label === 'Local') {
      this.proquifaCoords = this.proquifaCDMXCoordsValue;
    }
    if (this.clientRoute.label === 'Guadalajara') {
      this.proquifaCoords = this.proquifaGuadalajaraCoordsValue;
    }
    this.mapElement = this.renderer2.selectRootElement(this.mapInput.nativeElement, true);
    // DOCS Carga inicial del mapa
    const loader = new Loader({
      apiKey: this.apiKeyValue,
      version: 'weekly',
    });
    // DOCS Obtiene las coordenadas de la direccion del cliente
    loader.load().then(() => {
      this.directionsService = new google.maps.DirectionsService();
      this.directionsRenderer = new google.maps.DirectionsRenderer();
      this.lngData = this.clientCoords.lng;
      this.latData = this.clientCoords.lat;
      this.map = new google.maps.Map(this.mapElement as HTMLElement, {
        center: this.clientCoords,
        zoom: 16,
        streetViewControl: false,
        fullscreenControl: false,
        /*
         // DOCS limitar el movimiento dentro de la zona
         restriction:
           {latLngBounds: {
             north: -10,
             south: -40,
             east: 160,
             west: 100,
           }},*/
        styles: this.mapsStylesValue,
      });
      this.directionsRenderer.setMap(this.map);
      // DOCS Obtiene las nuevas coordenadas de destino segun la marca en el mapa obtenida en el evento click
      google.maps.event.addListener(this.map, 'click', (event) => {
        if (this.directionsRenderer) {
          this.directionsRenderer.setMap(null);
        }
        this.clientCoords = event.latLng;
        // DOCS Elimina la marca anterior
        this.marker.setMap(null);
        // DOCS Actualiza las coordenadas destino anteriores
        this.clientCoords = event.latLng;
        this.latData = this.clientCoords.lat();
        this.lngData = this.clientCoords.lng();
        // DOCS Obtiene las coordenadas del marcador nuevo
        this.marker.setPosition(this.clientCoords);
        this.renderMap();
        this.createMarkers();
        // DOCS almacenar coordenadas se enviaran cuando se le de al boton de confirmar ubicacion o coordenadas
      });
      this.createMarkers();
      this.renderMap();
    });
  }

  ngOnDestroy() {
    this.proquifaCDMXCoords.unsubscribe();
    this.apiKey.unsubscribe();
    this.clientPin.unsubscribe();
    this.clientPin.unsubscribe();
    this.mapsStyles.unsubscribe();
    this.proquifaGuadalajaraCoords.unsubscribe();
    this.proquifaPin.unsubscribe();
  }

  showMap(): void {
    this.event.emit({
      lat: this.latData,
      lng: this.lngData,
    });
  }

  // DOCS Funcion para pintar ruta de origen a destino en el mapa
  renderMap(): void {
    if (!this.directionsService) {
      this.directionsService = new google.maps.DirectionsService();
    }
    this.directionsService.route(
      {
        origin: this.proquifaCoords,
        destination: this.clientCoords,
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (response, status) => {
        if (status === 'OK') {
          this.directionsRenderer = new google.maps.DirectionsRenderer({
            suppressMarkers: true,
            directions: response,
            map: this.map,
          });
        }
      },
    );
  }

  // DOCS Funcion para colocar marcadores
  createMarkers(): void {
    // DOCS Se asigna la posicion del marcado con un titulo al sobreponer el mouse
    this.proquifaMarker = new google.maps.Marker({
      position: this.proquifaCoords,
      icon: this.proquifaPinValue,
    });
    this.marker = new google.maps.Marker({
      position: this.clientCoords,
      icon: this.clientPinValue,
    });
    this.marker.setMap(this.map);
    this.proquifaMarker.setMap(this.map);
  }
}
