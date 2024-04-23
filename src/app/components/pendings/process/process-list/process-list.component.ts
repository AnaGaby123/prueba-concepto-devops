import {
  AfterContentChecked,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';

// Utils

@Component({
  selector: 'app-process-list',
  templateUrl: './process-list.component.html',
  styleUrls: ['./process-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProcessListComponent implements AfterContentChecked {
  constructor(private store: Store<AppState>, private cdr: ChangeDetectorRef) {}

  ngAfterContentChecked(): void {
    this.cdr.detectChanges();
  }
}
