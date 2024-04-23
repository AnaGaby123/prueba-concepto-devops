/* Core Imports */
import {ChangeDetectorRef, Component, HostListener, OnInit} from '@angular/core';
import {CdkDragDrop} from '@angular/cdk/drag-drop';
import {lastValueFrom, Observable, of} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {take} from 'rxjs/operators';

/* Models Imports */
import {IProducts} from '@appModels/store/pendings/purchasing-manager/process-purchase/process-purchase-details/process-purchase-details.models';
import {DropListOption, IDropListMulti} from '@appModels/drop-list/drop-list-option';
import {ICard} from '@appModels/card/card';
import {ITabOption} from '@appModels/botonera/botonera-option';
import {IPageInfo} from '@iharbeck/ngx-virtual-scroller';
import {IDataMail} from '@appModels/correo/correo';

/* Tools Imports */
import {debounce, findIndex, isEmpty} from 'lodash-es';

/* Common Imports */
import {
  DEFAULT_TIME_DEBOUNCE_SEARCH,
  PAGING_LIMIT,
  RESPONSIVE_MENU_WIDTH_LIMIT,
  VIEW_IPAD,
  VIEW_MACBOOKAIR,
} from '@appUtil/common.protocols';

/* Selectors Imports */
import {processPurchaseDetailsSelectors} from '@appSelectors/pendings/purchasing-manager/process-purchase';

/* Actions Imports */
import {processPurchaseDetailsActions} from '@appActions/pendings/purchasing-manager/process-purchase';
import {IProviderContact} from '@appModels/provider-contacts/provider-contacts.model';

interface IPopUpConfig {
  isOpen: boolean;
  target: HTMLElement;
}

@Component({
  selector: 'app-generate',
  templateUrl: './generate.component.html',
  styleUrls: ['./generate.component.scss'],
})
export class GenerateComponent implements OnInit {
  // FIXME: Se comentaron hasta la implementación de los nuevos servicios de Marcas
  /*cardOptions$: Observable<Array<ICard>> = this.store.select(
    processPurchaseDetailsSelectors.selectCardOptions,
  );
  selectedFamilyName$: Observable<string> = this.store.select(
    processPurchaseDetailsSelectors.selectCurrentFamilyName,
  );
  tabOptions$: Observable<Array<ITabOption>> = this.store.select(
    processPurchaseDetailsSelectors.selectTabOptions,
  );*/
  cardOptions$ = of(null);
  selectedFamilyName$ = of(null);
  tabOptions$ = of(null);
  totalFamilies$: Observable<number> = this.store.select(
    processPurchaseDetailsSelectors.selectTotalFamilies,
  );
  tapSelected$: Observable<ITabOption> = this.store.select(
    processPurchaseDetailsSelectors.selectTabSelected,
  );
  isLoadingGeneralData$: Observable<boolean> = this.store.select(
    processPurchaseDetailsSelectors.selectGeneralDataIsLoading,
  );
  companyThatBuysOptions$: Observable<Array<DropListOption>> = this.store.select(
    processPurchaseDetailsSelectors.selectCompanyThatBuysOptions,
  );
  companyThatBuysSelected$: Observable<DropListOption> = this.store.select(
    processPurchaseDetailsSelectors.selectCompanyBuysSelected,
  );
  shippingCompanyOptions$: Observable<Array<DropListOption>> = this.store.select(
    processPurchaseDetailsSelectors.selectShippingCompanyOptions,
  );
  shippingCompanySelected$: Observable<DropListOption> = this.store.select(
    processPurchaseDetailsSelectors.selectShippingCompanySelected,
  );
  products$: Observable<Array<IProducts>> = this.store.select(
    processPurchaseDetailsSelectors.selectProductsOfCurrentFamily,
  );
  totalProducts$: Observable<number> = this.store.select(
    processPurchaseDetailsSelectors.selectTotalProducts,
  );
  isLoadingProducts$: Observable<boolean> = this.store.select(
    processPurchaseDetailsSelectors.selectIsLoadingProducts,
  );
  isLoadingMoreProducts$: Observable<boolean> = this.store.select(
    processPurchaseDetailsSelectors.selectMoreProducts,
  );
  productsToGenerateOrder$: Observable<Array<IProducts>> = this.store.select(
    processPurchaseDetailsSelectors.selectListProductsToGenerateOrder,
  );
  pzasToGenerateOrder$: Observable<number> = this.store.select(
    processPurchaseDetailsSelectors.selectPzasToGenerateOrder,
  );
  nameLinkTo$: Observable<string | boolean> = this.store.select(
    processPurchaseDetailsSelectors.selectWhoToLink,
  );
  totalAmount$ = of(0);
  // FIXME: Se comentaron hasta la implementación de los nuevos servicios de Marcas
  /*totalPieces$: Observable<number> = this.store.select(
    processPurchaseDetailsSelectors.selectTotalPzas,
  );
  totalAmount$: Observable<number> = this.store.select(
    processPurchaseDetailsSelectors.selectTotalAmount,
  );*/
  dataByType$: Observable<Array<DropListOption>> = this.store.select(
    processPurchaseDetailsSelectors.selectDataByType,
  );
  dataByTypeSelected$: Observable<DropListOption> = this.store.select(
    processPurchaseDetailsSelectors.selectDataByTypeSelected,
  );
  subtotal$: Observable<number> = this.store.select(processPurchaseDetailsSelectors.selectSubtotal);
  total$: Observable<number> = this.store.select(processPurchaseDetailsSelectors.selectTotal);
  tax$: Observable<number> = this.store.select(processPurchaseDetailsSelectors.selectTax);
  validationDropDownList$: Observable<boolean> = this.store.select(
    processPurchaseDetailsSelectors.selectDropDownListValidation,
  );
  isMexican$: Observable<boolean> = this.store.select(
    processPurchaseDetailsSelectors.selectIsMexican,
  );
  searchTerm$: Observable<string> = this.store.select(
    processPurchaseDetailsSelectors.selectSearchTermOfCurrentFamily,
  );
  isOpenPopUpMail$: Observable<boolean> = this.store.select(
    processPurchaseDetailsSelectors.selectPopUpMail,
  );
  subject$: Observable<string> = this.store.select(
    processPurchaseDetailsSelectors.selectPurchaseOrderSubject,
  );
  fileName$: Observable<string> = this.store.select(
    processPurchaseDetailsSelectors.selectPurchaseOrderPdfFileName,
  );
  mailList$: Observable<Array<IDropListMulti>> = this.store.select(
    processPurchaseDetailsSelectors.selectMailList,
  );
  contactsList$: Observable<Array<IDropListMulti>> = this.store.select(
    processPurchaseDetailsSelectors.selectContactsList,
  );
  // FIXME: Se comentaron hasta la implementación de los nuevos servicios de Marcas
  /*currentTotals$: Observable<ICurrentTotals> = this.store.select(
    processPurchaseDetailsSelectors.selectCurrentTotals,
  );*/
  currentTotals$ = of(null);
  providerContactSelected$: Observable<IProviderContact> = this.store.select(
    processPurchaseDetailsSelectors.selectedProviderContact,
  );

  selectContactsProvidersDropList$: Observable<Array<DropListOption>> = this.store.select(
    processPurchaseDetailsSelectors.selectContactsProvidersDropList,
  );

  productsResults: Array<IProducts>;
  handleKeySearch = debounce(
    (value: string) => this.changeSearchTerm(value),
    DEFAULT_TIME_DEBOUNCE_SEARCH,
  );
  popUps: {
    question: IPopUpConfig;
    notAdd: IPopUpConfig;
    notChangeFamily: IPopUpConfig;
  };
  timer;
  readonly QUESTION_POP = 'question';
  readonly MAIL_POP = 'mail';
  readonly NOT_ADD_POP = 'notAdd';
  readonly NOT_CHANGE_FAMILY = 'notChangeFamily';
  lodashIsEmpty = isEmpty;
  viewType: string;
  viewIpad = VIEW_IPAD;
  viewMacBookAir = VIEW_MACBOOKAIR;
  flagNotAdd: string;
  iPageInfo: IPageInfo;

  constructor(private cdr: ChangeDetectorRef, private store: Store) {
    this.popUps = {
      [this.QUESTION_POP]: {isOpen: false, target: null},
      [this.NOT_ADD_POP]: {isOpen: false, target: null},
      [this.NOT_CHANGE_FAMILY]: {isOpen: false, target: null},
    };
  }

  ngOnInit(): void {
    this.onResize();
  }

  @HostListener('window:resize')
  onResize(): void {
    this.viewType =
      window.innerWidth < RESPONSIVE_MENU_WIDTH_LIMIT ? this.viewIpad : this.viewMacBookAir;
  }

  async fetchProducts(): Promise<void> {
    // FIXME: Se comentaron hasta la implementación de los nuevos servicios de Marcas
    /*const idFamilyProvider: string = await this.store
      .pipe(
        select(processPurchaseDetailsSelectors.selectIdFamilyProvider),
        take(1),
      )
      .toPromise();
    this.store.dispatch(
      processPurchaseDetailsActions.FETCH_PRODUCTS_LOAD({
        isFirstPage: false,
        IdProveedorFamilia: idFamilyProvider,
      }),
    );*/
  }

  async handleOptionSelected(option: ICard): Promise<void> {
    const addedProducts = await lastValueFrom(
      this.store.pipe(
        select(processPurchaseDetailsSelectors.selectListProductsToGenerateOrder),
        take(1),
      ),
    );
    if (isEmpty(addedProducts)) {
      this.store.dispatch(
        processPurchaseDetailsActions.SET_FAMILY_SELECTED({
          IdProveedorFamilia: option.value,
        }),
      );
    } else {
      this.handleQuestionPop(this.NOT_CHANGE_FAMILY, true);
    }
  }

  async onSelectOption(tabSelected: ITabOption): Promise<void> {
    // FIXME: Se comentaron hasta la implementación de los nuevos servicios de Marcas
    /*const idFamilyProvider: string = await this.store
      .pipe(
        select(processPurchaseDetailsSelectors.selectIdFamilyProvider),
        take(1),
      )
      .toPromise();
    this.store.dispatch(
      processPurchaseDetailsActions.SET_TAB_SELECTED({
        tabSelected,
        IdProveedorFamilia: idFamilyProvider,
      }),
    );*/
  }

  async selectFilterByType(filter: DropListOption): Promise<void> {
    // FIXME: Se comentaron hasta la implementación de los nuevos servicios de Marcas
    /* const idFamilyProvider: string = await this.store
      .pipe(
        select(processPurchaseDetailsSelectors.selectIdFamilyProvider),
        take(1),
      )
      .toPromise();
    this.store.dispatch(
      processPurchaseDetailsActions.SET_FILTER_SELECTED({
        dataByTypeSelected: filter,
        IdProveedorFamilia: idFamilyProvider,
      }),
    );*/
  }

  async changeSearchTerm(searchTerm: string): Promise<void> {
    // FIXME: Se comentaron hasta la implementación de los nuevos servicios de Marcas
    /*const idFamilyProvider: string = await this.store
      .pipe(
        select(processPurchaseDetailsSelectors.selectIdFamilyProvider),
        take(1),
      )
      .toPromise();
    this.store.dispatch(
      processPurchaseDetailsActions.SET_SEARCH_TERM({
        searchTerm,
        IdProveedorFamilia: idFamilyProvider,
      }),
    );*/
  }

  saveInputValue(optionSelected: DropListOption, type: string): void {
    if (type === 'companyThatBuys') {
      this.store.dispatch(
        processPurchaseDetailsActions.SET_COMPANY_BUYS_SELECTED({
          companyBuysSelected: optionSelected,
        }),
      );
    } else {
      this.store.dispatch(
        processPurchaseDetailsActions.SET_SHIPPING_COMPANY_SELECTED({
          shippingCompanySelected: optionSelected,
        }),
      );
    }
  }

  async fetchMoreProducts(event: IPageInfo): Promise<void> {
    const products: Array<IProducts> = await lastValueFrom(
      this.store.pipe(
        select(processPurchaseDetailsSelectors.selectProductsOfCurrentFamily),
        take(1),
      ),
    );
    if (event.endIndex !== products.length - 1) {
      return;
    }

    const currentTotalProducts: number = await lastValueFrom(
      this.store.pipe(select(processPurchaseDetailsSelectors.selectTotalProducts), take(1)),
    );

    const currentPage: number = await lastValueFrom(
      this.store.pipe(
        select(processPurchaseDetailsSelectors.selectDesiredPageOfCurrentFamily),
        take(1),
      ),
    );

    const isLoading: boolean = await lastValueFrom(
      this.store.pipe(select(processPurchaseDetailsSelectors.selectIsLoadingProducts), take(1)),
    );

    if (event.endIndex !== currentTotalProducts - 1 && currentTotalProducts > 0) {
      const totalPages =
        currentTotalProducts >= PAGING_LIMIT ? Math.ceil(currentTotalProducts / PAGING_LIMIT) : 0;
      if (
        currentPage > totalPages ||
        products.length > currentTotalProducts ||
        isLoading ||
        products.length === 0
      ) {
        return;
      }
      // FIXME: Se comentaron hasta la implementación de los nuevos servicios de Marcas
      /*const idFamilyProvider: string = await this.store
        .pipe(
          select(processPurchaseDetailsSelectors.selectIdFamilyProvider),
          take(1),
        )
        .toPromise();
      this.store.dispatch(
        processPurchaseDetailsActions.SET_IS_LOADING_MORE_PRODUCTS({
          isLoadingMoreProducts: true,
          IdProveedorFamilia: idFamilyProvider,
        }),
      );*/
      await this.fetchNextChunk();
    }
  }

  fetchNextChunk(): Promise<unknown> {
    return new Promise((resolve, reject) => {
      clearTimeout(this.timer);
      this.timer = setTimeout(async () => {
        await this.fetchProducts();
        resolve([]);
      }, 200);
    });
  }

  handleQuestionPop(pop: string, fromBtn: boolean, emit?: boolean): void {
    if (fromBtn) {
      this.popUps = {
        ...this.popUps,
        [pop]: {
          isOpen: true,
        },
      };
    } else {
      if (emit) {
        this.store.dispatch(processPurchaseDetailsActions.LINK_TO_PROVIDER_LOAD());
      } else {
        this.popUps = {
          ...this.popUps,
          [pop]: {
            isOpen: false,
          },
        };
      }
    }
  }

  async handleMailPop(pop: string, fromBtn: boolean, emit?: IDataMail): Promise<void> {
    if (fromBtn) {
      this.store.dispatch(processPurchaseDetailsActions.GENERATE_OC_AND_PDF_LOAD());
    } else {
      if (emit.activeSend) {
        this.store.dispatch(processPurchaseDetailsActions.SEND_MAIL_LOAD({mailData: emit}));
      } else {
        const idPurchaseOrder: string = await lastValueFrom(
          this.store.pipe(select(processPurchaseDetailsSelectors.selectIdPurchaseOrder), take(1)),
        );

        this.store.dispatch(
          processPurchaseDetailsActions.DELETE_PURCHASE_ORDER_LOAD({
            idPurchaseOrder,
          }),
        );
      }
    }
  }

  noReturnPredicate(): boolean {
    return false;
  }

  handleTrackByProduct(index: number, product: IProducts): number {
    return product.Index;
  }

  async dropProduct(event: CdkDragDrop<any[]>): Promise<void> {
    const productsToGenerateOrder: any = await lastValueFrom(
      this.store.pipe(
        select(processPurchaseDetailsSelectors.selectListProductsToGenerateOrder),
        take(1),
      ),
    );
    const index = findIndex(
      productsToGenerateOrder,
      (o: IProducts) =>
        o.IdOcPendienteCompraProducto === event.item.data.IdOcPendienteCompraProducto,
    );
    const addProduct = true;

    if (index === -1 && event.previousContainer !== event.container && addProduct) {
      await this.addProduct(event.item.data);
    }
  }

  async addProduct(newProduct: IProducts): Promise<void> {
    // FIXME: Se comentaron hasta la implementación de los nuevos servicios de Marcas
    /*const idFamilyProvider: string = await this.store
      .pipe(
        select(processPurchaseDetailsSelectors.selectIdFamilyProvider),
        take(1),
      )
      .toPromise();

    this.store.dispatch(
      processPurchaseDetailsActions.SET_NEW_PRODUCT_TO_GENERATE_ORDER({
        newProduct,
        IdProveedorFamilia: idFamilyProvider,
      }),
    );*/
  }

  async addProductFromButton(newProduct: IProducts): Promise<void> {
    const productsToGenerateOrder: any = await lastValueFrom(
      this.store.pipe(
        select(processPurchaseDetailsSelectors.selectListProductsToGenerateOrder),
        take(1),
      ),
    );

    const index = findIndex(
      productsToGenerateOrder,
      (o: IProducts) => o.IdOcPendienteCompraProducto === newProduct.IdOcPendienteCompraProducto,
    );

    const addProduct = true;

    if (addProduct && index === -1) {
      await this.addProduct(newProduct);
    }
  }

  async validateProduct(
    newProduct: IProducts,
    productsToGenerateOrder: Array<IProducts>,
  ): Promise<boolean> {
    const [productBase] = productsToGenerateOrder;
    let addProduct = true;
    if (productBase) {
      const {control: controlBase} = productBase;
      const {control: controlNew} = newProduct;

      if (controlBase === 'Normal') {
        addProduct = controlNew === 'Normal';
      } else {
        addProduct =
          controlNew === 'Nacional' || controlNew === 'Mundial' || controlNew === 'Origen';
      }

      if (!addProduct) {
        this.flagNotAdd = controlBase === 'Normal' ? 'isDifferentToNormal' : 'isNormal';

        this.popUps = {
          ...this.popUps,
          notAdd: {
            ...this.popUps.notAdd,
            isOpen: true,
          },
        };
      }
    }

    return addProduct;
  }

  async removeProduct(product: IProducts): Promise<void> {
    // FIXME: Se comentaron hasta la implementación de los nuevos servicios de Marcas
    /*const idFamilyProvider: string = await this.store
      .pipe(
        select(processPurchaseDetailsSelectors.selectIdFamilyProvider),
        take(1),
      )
      .toPromise();
    const typeOfProduct = product.FleteExpress
      ? 'Flete Express'
      : product.PartidaProgramada
      ? 'Programadas'
      : product.PartidaRegular
      ? 'Regulares'
      : product.StockDisponible
      ? 'Stock'
      : 'Todas';

    this.store.dispatch(
      processPurchaseDetailsActions.REMOVE_PRODUCT_OF_LIST_ORDER({
        productToRemove: product,
        IdProveedorFamilia: idFamilyProvider,
        typeOfProduct,
      }),
    );*/
  }

  async handlePopUpStock(IdPurchaseOrderPending: string, isOpen: boolean): Promise<void> {
    // FIXME: Se comentaron hasta la implementación de los nuevos servicios de Marcas
    /*const idFamilyProvider: string = await this.store
      .pipe(
        select(processPurchaseDetailsSelectors.selectIdFamilyProvider),
        take(1),
      )
      .toPromise();
    this.store.dispatch(
      processPurchaseDetailsActions.SET_POP_UP_STOCK_IS_OPEN({
        IdProveedorFamilia: idFamilyProvider,
        IdPurchaseOrderPending,
        isOpen,
      }),
    );*/
  }

  handlePopNotAdd(emit: boolean): void {
    this.popUps = {
      ...this.popUps,
      notAdd: {
        ...this.popUps.notAdd,
        isOpen: false,
      },
    };
  }

  getElement(id: string) {
    return document.getElementById(id) as HTMLElement;
  }

  async vsChange(iPageInfo: IPageInfo): Promise<void> {
    if (
      this.iPageInfo &&
      (this.iPageInfo.startIndex !== iPageInfo.startIndex ||
        this.iPageInfo.endIndex !== iPageInfo.endIndex)
    ) {
      // FIXME: Se comentaron hasta la implementación de los nuevos servicios de Marcas
      /*const idFamilyProvider: string = await this.store
        .pipe(
          select(processPurchaseDetailsSelectors.selectIdFamilyProvider),
          take(1),
        )
        .toPromise();
      const idPurchaseOrder: string = await this.store
        .pipe(
          select(processPurchaseDetailsSelectors.selectIdPurchaseOrder),
          take(1),
        )
        .toPromise();
      this.store.dispatch(
        processPurchaseDetailsActions.SET_POP_UP_STOCK_IS_IN_RANGE({
          startIndex: iPageInfo.startIndex,
          endIndex: iPageInfo.endIndex,
          counter: -1,
          IdProveedorFamilia: idFamilyProvider,
          IdPurchaseOrderPending: idPurchaseOrder,
        }),
      );*/
    }
    this.iPageInfo = iPageInfo;
  }

  takePiecesOfStock(product: IProducts): void {
    this.store.dispatch(
      processPurchaseDetailsActions.TAKE_PIECES_OF_STOCK_LOAD({
        product,
        generateOtherOcItem: product.NumeroPiezasOcPartidaStock > product.NumeroDePiezas,
      }),
    );
  }

  setContactSelectedProvider(contactSelected: DropListOption): void {
    this.store.dispatch(
      processPurchaseDetailsActions.SET_SELECTED_CONTACT_PROVIDER({
        contactSelected,
      }),
    );
  }
}
