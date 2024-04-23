import {ActivationEnd, Router} from '@angular/router';
import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {TranslateService} from '@ngx-translate/core';
import {merge} from 'rxjs';
import {distinctUntilChanged, filter, tap, withLatestFrom} from 'rxjs/operators';

import {AppState, selectSettingsState} from '@appCore/core.state';
import {LocalStorageService} from '@appCore/local-storage/local-storage.service';
import {TitleService} from '@appCore/title/title.service';

import {CHANGE_LANGUAGE} from '@appActions/settings/settings.actions';
import {selectSettingsLanguage} from '@appSelectors/settings/settings.selectors';

import {SETTINGS_KEY} from '@appUtil/common.protocols';

@Injectable()
export class SettingsEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private router: Router,
    private localStorageService: LocalStorageService,
    private titleService: TitleService,
    private translateService: TranslateService,
  ) {}

  persistSettings = createEffect(
    () =>
      this.actions$.pipe(
        ofType(CHANGE_LANGUAGE),
        withLatestFrom(this.store.pipe(select(selectSettingsState))),
        tap(([action, settings]) => this.localStorageService.setItem(SETTINGS_KEY, settings)),
      ),
    {dispatch: false},
  );

  setTranslateServiceLanguage = createEffect(
    () =>
      this.store.pipe(
        select(selectSettingsLanguage),
        distinctUntilChanged(),
        tap((language) => this.translateService.use(language)),
      ),
    {dispatch: false},
  );

  setTitle = createEffect(
    () =>
      merge(
        this.actions$.pipe(ofType(CHANGE_LANGUAGE)),
        this.router.events.pipe(filter((event) => event instanceof ActivationEnd)),
      ).pipe(
        tap(() => {
          this.titleService.setTitle(this.router.routerState.snapshot.root, this.translateService);
        }),
      ),
    {dispatch: false},
  );
}
