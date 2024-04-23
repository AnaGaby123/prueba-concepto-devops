/* Core Imports */
import {Component, Input} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-without-results',
  templateUrl: './without-results.component.html',
  styleUrls: ['./without-results.component.scss'],
})
export class WithoutResultsComponent {
  @Input() title = '';
  @Input() minHeight = '150px';

  constructor(private translateService: TranslateService) {
    this.title = !this.title ? translateService.instant('common.withoutResults') : this.title;
  }
}
