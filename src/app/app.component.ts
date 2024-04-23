import {Component, OnDestroy, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {NGXLogger} from 'ngx-logger';
import * as servicesLogger from '@appUtil/logger';
import {filter} from 'rxjs/operators';
import {Router, RouterEvent} from '@angular/router';
import {AuthService} from '@appServices/auth/auth.service';
import {Subscription} from 'rxjs';
const FILE_NAME = 'app.component.ts';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'ProquifaDotNet';
  urlSubscription: Subscription;
  constructor(
    private translate: TranslateService,
    private logger: NGXLogger,
    private router: Router,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.logger.debug(servicesLogger.generateMessage(FILE_NAME, 'Init'));

    this.translate.addLangs(['en', 'es']);
    this.translate.setDefaultLang('es');

    const browserLang = this.translate.getBrowserLang();
    this.translate.use('es' /*browserLang.match(/es|en/) ? browserLang : 'es'*/);
    // DOCS: Subcripción para saber a que URL intenta acceder
    const urlObservable = this.router.events.pipe(
      filter((e: RouterEvent): e is RouterEvent => e instanceof RouterEvent),
    );
    this.urlSubscription = urlObservable.subscribe((e: RouterEvent) => {
      this.authService.attemptedUrl = e.url;
    });
  }

  ngOnDestroy() {
    this.urlSubscription.unsubscribe();
  }
}
