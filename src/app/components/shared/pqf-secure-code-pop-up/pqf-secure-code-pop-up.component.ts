import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import {ENUM_SECURE_POP} from '@appUtil/common.protocols';
import {PqfGenericPopUpComponent} from '@appComponents/shared/pqf-generic-pop-up/pqf-generic-pop-up.component';
import {InputValidators, RegexValidatorsByDigits} from '@appHelpers/shared/shared.helpers';
import {convertArrayToString} from '@appUtil/util';
import {compact, isEqual, map as _map} from 'lodash-es';

@Component({
  selector: 'pqf-secure-code-pop-up',
  templateUrl: './pqf-secure-code-pop-up.component.html',
  styleUrls: ['./pqf-secure-code-pop-up.component.scss'],
})
export class PqfSecureCodePopUpComponent extends PqfGenericPopUpComponent
  implements OnInit, AfterViewInit, OnChanges {
  @Input() secureCode: string[] = [null, null, null, null];
  @Input() status: string = ENUM_SECURE_POP.default;
  @Input() textHeaderContent: string = '';
  @Output() arrayCodeChangeEmitter: EventEmitter<Array<string>> = new EventEmitter<Array<string>>();
  @Output() stringCodeCompleteEmitter: EventEmitter<string> = new EventEmitter<string>();
  @ViewChild('input1', {static: false}) input1: ElementRef;
  @ViewChild('input2', {static: false}) input2: ElementRef;
  @ViewChild('input3', {static: false}) input3: ElementRef;
  @ViewChild('input4', {static: false}) input4: ElementRef;
  readonly statusSecurePop = ENUM_SECURE_POP;
  readonly regexCharacterValidators = RegexValidatorsByDigits;
  readonly inputTypes = InputValidators;
  codeSecure: string[] = [];

  ngOnInit(): void {}

  constructor(public cdr: ChangeDetectorRef) {
    super();
  }

  ngAfterViewInit(): void {
    if (this.codeSecure[0] === null) {
      this.input1.nativeElement.focus();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['secureCode']) {
      if (!isEqual(this.codeSecure, changes['secureCode'].currentValue)) {
        this.codeSecure = [...changes['secureCode'].currentValue];
        this.arrayCodeChangeEmitter.emit([...changes['secureCode'].currentValue]);
      }
    }
    if (changes['status'] && changes['status'].currentValue === this.statusSecurePop.error) {
      setTimeout(() => {
        this.arrayCodeChangeEmitter.emit([null, null, null, null]);
        this.codeSecure = [null, null, null, null];
        this.stringCodeCompleteEmitter.emit('');

        this.input1.nativeElement.focus();
      }, 800);
    }
    this.cdr.detectChanges();
  }

  getCheckImage = (): string =>
    this.status === ENUM_SECURE_POP.success
      ? 'assets/Images/components-src/pop-up/success.svg'
      : 'assets/Images/components-src/pop-up/alert.svg';

  getStatusSecureCode = (): string => ENUM_SECURE_POP[this.status];

  handleValidateNumber(event: InputEvent, position: number): void {
    if (
      !this.testWithRegexCharacterValidator(event.data) &&
      event.inputType !== 'deleteContentBackward'
    ) {
      event.preventDefault();
    } else {
      this.emitSecureCode(position, event.data);
    }
  }

  handleValidateNumberUp(event: KeyboardEvent, position: number): void {
    if (this.testWithRegexCharacterValidator(event.key)) {
      switch (position) {
        case 0:
          this.input2.nativeElement.focus();
          break;
        case 1:
          this.input3.nativeElement.focus();
          break;
        case 2:
          this.input4.nativeElement.focus();
          break;
      }
    }
  }

  private testWithRegexCharacterValidator = (key: string): boolean =>
    this.regexCharacterValidators[this.inputTypes.Number].test(key);

  private emitSecureCode(position: number, value: string): void {
    this.codeSecure = _map(this.codeSecure, (o: string, index) => {
      if (index === position) {
        return value;
      }
      return o;
    });
    this.arrayCodeChangeEmitter.emit(this.codeSecure);
    if (compact(this.codeSecure).length === 4) {
      this.stringCodeCompleteEmitter.emit(convertArrayToString(this.codeSecure));
    }
  }

  // DOCS: Cerrar pop
  handleClose(event) {
    this.event.emit(event);
  }
}
