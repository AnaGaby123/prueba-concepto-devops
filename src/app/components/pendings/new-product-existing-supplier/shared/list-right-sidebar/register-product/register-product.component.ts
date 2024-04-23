import {Component} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {CotPartidaInvestigacionProducto} from 'api-logistica';
import {attendInvestigationDetailsSelectors} from '@appSelectors/pendings/attend-investigation';
import {attendInvestigationDetailsActions} from '@appActions/pendings/attend-investigation';
import {AppState} from '@appCore/core.state';

@Component({
  selector: 'app-register-product',
  templateUrl: './register-product.component.html',
  styleUrls: ['./register-product.component.scss'],
})
export class RegisterProductComponent {
  cotPartidaInvestigacionProducto$: Observable<CotPartidaInvestigacionProducto> = this.store.select(
    attendInvestigationDetailsSelectors.selectCotPartidaInvestigacionProducto,
  );
  evidenceFile$: Observable<File> = this.store.select(
    attendInvestigationDetailsSelectors.selectEvidenceFile,
  );

  constructor(private store: Store<AppState>) {}

  handleSetRadio(prop: string, value: boolean) {
    this.store.dispatch(attendInvestigationDetailsActions.SET_RADIO_BUTTON_VALUE({prop, value}));
  }

  handleSetNotes(notes: string) {
    notes = notes?.trim();
    this.store.dispatch(attendInvestigationDetailsActions.SET_NOTES({notes}));
  }

  handleSetFile(file: File) {
    this.store.dispatch(
      attendInvestigationDetailsActions.SET_FILE({
        file,
      }),
    );
  }
}
