import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {AuthState} from '@appModels/store/auth/auth.models';
import {selectAppVersion} from '@appSelectors/utils/utils.selectors';

@Component({
  selector: 'app-pqf-logo-version',
  templateUrl: './pqf-logo-version.component.html',
  styleUrls: ['./pqf-logo-version.component.scss'],
})
export class PqfLogoVersionComponent implements OnInit {
  @Input() onlyText = false;
  readonly appVersion$: Observable<string> = this.store.select(selectAppVersion);
  constructor(private store: Store<AuthState>) {}

  ngOnInit(): void {}
}
