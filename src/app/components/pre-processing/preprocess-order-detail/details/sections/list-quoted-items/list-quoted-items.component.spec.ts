import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {ListQuotedItemsComponent} from './list-quoted-items.component';
import {Store} from '@ngrx/store';
import {MatDialog} from '@angular/material/dialog';
import {TranslateFakeLoader, TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {ClientsContactComponent} from '@appComponents/shared/clients-contact/clients-contact.component';
import {ObservationsMessageTooltipComponent} from '@appComponents/pre-processing/preprocess-order-detail/details/sections/list-quoted-items/observations-message-tooltip/observations-message-tooltip.component';
import {HeaderInternalSalesItemComponent} from '@appComponents/shared/header-internal-sales-item/header-internal-sales-item.component';
import {SearchComponent} from '@appComponents/shared/search/search.component';
import {DeliveryAddressesTooltipComponent} from '@appComponents/shared/delivery-addresses-tooltip/delivery-addresses-tooltip.component';
import {FormsModule} from '@angular/forms';
import {By} from '@angular/platform-browser';
import {TranslateTestingModule} from 'ngx-translate-testing';

describe('QuotedItemsComponent', () => {
  let component: ListQuotedItemsComponent;
  let fixture: ComponentFixture<ListQuotedItemsComponent>;
  let compiled: HTMLElement;

  // DOCS: TRADUCCIONES A PROBAR
  const translations = {
    preProcessing: {
      searchByCatalog: 'Buscar por catálogo',
    },
  };

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [
          ListQuotedItemsComponent,
          ClientsContactComponent,
          ListQuotedItemsComponent,
          ObservationsMessageTooltipComponent,
          HeaderInternalSalesItemComponent,
          SearchComponent,
          DeliveryAddressesTooltipComponent,
        ],
        providers: [
          {
            provide: Store,
            useValue: {
              dispatch: () => {},
              select: () => {},
            },
          },
          {
            provide: MatDialog,
            useValue: {},
          },
        ],
        imports: [
          TranslateModule.forRoot({
            loader: {
              provide: TranslateLoader,
              useClass: TranslateFakeLoader,
            },
          }),
          FormsModule,
          TranslateTestingModule.withTranslations({es: translations}),
        ],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ListQuotedItemsComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('El componente debe ser creado', () => {
    expect(component).toBeTruthy();
  });

  it('Debe existir el componente app-search', () => {
    const appSearch: HTMLElement = compiled.querySelector('app-search');

    expect(appSearch).toBeTruthy();
  });

  it('El placeholder de app-search debe ser igual a Buscar por catálogo', () => {
    const appSearch = fixture.debugElement.query(By.css('app-search'))
      .componentInstance as SearchComponent;

    fixture.detectChanges();

    expect(appSearch.placeholder).toEqual('Buscar por catálogo');
  });

  it('La propiedad searchTerm de app-search debe recibir vacío', () => {
    const appSearch = fixture.debugElement.query(By.css('app-search'))
      .componentInstance as SearchComponent;

    expect(appSearch.searchTerm).toBeNull();
  });
});
