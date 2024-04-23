import {
  AfterContentChecked,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import {IDropListMulti} from '@appModels/drop-list/drop-list-option';

@Component({
  selector: 'app-drop-list-contact',
  templateUrl: './drop-list-contact.component.html',
  styleUrls: ['./drop-list-contact.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DropListContactComponent implements AfterContentChecked {
  @Output() emitValue: EventEmitter<IDropListMulti> = new EventEmitter<IDropListMulti>();
  @Input() options: IDropListMulti[] = [];
  @Input() minHeight = 64;
  @Input() icon = 'assets/Images/contactos-mail.svg';
  isOpen = false;
  title: string;

  constructor(private cdr: ChangeDetectorRef) {}

  ngAfterContentChecked(): void {
    this.cdr.detectChanges();
  }

  closeGlobal(): void {
    if (this.isOpen) {
      this.openOptions();
    }
  }

  openOptions(): void {
    this.isOpen = !this.isOpen;
  }

  selectOption(item: IDropListMulti, $event): void {
    this.emitValue.emit(item);
    $event.stopPropagation();
  }
}
