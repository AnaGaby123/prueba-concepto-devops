import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  Renderer2,
  ViewChild,
} from '@angular/core';
import {filter, findIndex, replace, trim} from 'lodash-es';
import {validator} from '@appUtil/strings';

@Component({
  selector: 'app-multiple-emails-input',
  templateUrl: './multiple-emails-input.component.html',
  styleUrls: ['./multiple-emails-input.component.scss'],
})
export class MultipleEmailsInputComponent {
  @ViewChild('inputElement') inputElement: ElementRef<HTMLInputElement>;
  @ViewChild('emailsContainer') emailsContainer: ElementRef<HTMLElement>;
  @Output() getEmails: EventEmitter<Array<string>> = new EventEmitter<Array<string>>();
  @Output() deleteItem: EventEmitter<string> = new EventEmitter<string>();
  @Input() emails: Array<string> = [];
  currentEmail = '';
  activeError = false;
  inputNativeElement;

  constructor(private renderer: Renderer2) {}

  onBlur(): void {
    this.handleValidate(false);
  }

  onEnter(): void {
    this.inputNativeElement = this.renderer.selectRootElement(this.inputElement.nativeElement);
    this.inputNativeElement.blur();
  }

  onKeydown(event: KeyboardEvent): void {
    const {key} = event;
    if (key === ' ' || key === ',' || key === ';') {
      setTimeout(() => {
        this.handleValidate(true);
      }, 500);
    }
  }

  validate(value: string): void {
    if (this.activeError) {
      this.activeError = !validator.email.test(value);
    }
  }

  handleValidate(clean: boolean): void {
    this.currentEmail = trim(this.currentEmail);
    if (clean) {
      this.currentEmail = replace(replace(this.currentEmail, ';', ''), ',', '');
    }
    this.activeError = !validator.email.test(this.currentEmail);
    if (!this.activeError && this.currentEmail) {
      if (findIndex(this.emails, (email: string) => email === this.currentEmail) === -1) {
        this.emails = [...this.emails, this.currentEmail];
        this.onSelectedEmails();
      }
      this.currentEmail = '';
      this.inputNativeElement = this.renderer.selectRootElement(this.inputElement.nativeElement);
      this.inputNativeElement.focus();
      setTimeout(() => {
        this.scrollTo();
      }, 100);
    }
  }

  scrollTo(): void {
    const emailContainerNativeElement = this.renderer.selectRootElement(
      this.emailsContainer.nativeElement,
      true,
    );
    emailContainerNativeElement.scrollTop = emailContainerNativeElement.scrollHeight;
  }

  onRemoveEmail(value: string): void {
    this.emails = filter(this.emails, (email) => email !== value);
    this.deleteItem.emit(value);
    this.onSelectedEmails();
  }

  onSelectedEmails(): void {
    this.getEmails.emit(this.emails);
  }
}
