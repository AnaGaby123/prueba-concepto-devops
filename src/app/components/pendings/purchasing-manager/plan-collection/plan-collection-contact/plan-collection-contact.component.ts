import {Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild} from '@angular/core';
import {Observable} from 'rxjs';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import * as catalogsSelectors from '@appSelectors/catalogs/catalogs.selectors';
import {Store} from '@ngrx/store';
import * as catalogsActions from '@appActions/catalogs/catalogos.actions';
import {planCollectionActions} from '@appActions/pendings/purchasing-manager/manage-back-order';

@Component({
  selector: 'app-plan-collection-contact',
  templateUrl: './plan-collection-contact.component.html',
  styleUrls: ['./plan-collection-contact.component.scss'],
})
export class PlanCollectionContactComponent implements OnInit, OnDestroy {
  @ViewChild('imageElement') imageElement: ElementRef;

  itemsCountry$: Observable<Array<DropListOption>> = this.store.select(
    catalogsSelectors.selectCatPaisForDropDownList,
  );
  itemsRoutesDelivery$: Observable<Array<DropListOption>> = this.store.select(
    catalogsSelectors.selectvCatRutasEntregaForDropDownList,
  );
  itemsCatZona$: Observable<Array<DropListOption>> = this.store.select(
    catalogsSelectors.selectvCatZonaForDropDownList,
  );
  /// imagen estatica solo para pruebas de diseño
  errorImageNativeElement = false;
  defaultImageSource = 'assets/Images/logos/carnot_hover.png';
  /*  defaultImageSource = 'assets/Images/clientes/logo_proquifa_hover.svg';*/
  imageNativeElement;

  constructor(private renderer: Renderer2, private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(catalogsActions.GET_CAT_PAIS_LOAD());
    this.store.dispatch(catalogsActions.GET_CAT_ZONA_LOAD());
    this.store.dispatch(catalogsActions.GET_CAT_RUTA_ENTREGA_LOAD());
  }

  ngOnDestroy(): void {
    this.store.dispatch(planCollectionActions.CLEAN_SERVICES_CONTACT());
  }

  setImage(src?: string): string {
    if (src) {
      if (!this.errorImageNativeElement) {
        return src;
      } else {
        return this.defaultImageSource;
      }
    }
    return this.defaultImageSource;
  }

  errorImage(): void {
    if (!this.errorImageNativeElement) {
      this.renderer.setAttribute(this.imageNativeElement, 'src', this.defaultImageSource);
      this.errorImageNativeElement = true;
    }
    this.setImage();
  }
}
