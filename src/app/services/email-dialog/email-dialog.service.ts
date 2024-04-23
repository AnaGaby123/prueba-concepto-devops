import {Injectable} from '@angular/core';
import {IMailDialogDataChildren} from '@appModels/correo/correo';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmailDialogService {
  private dataSubject: BehaviorSubject<IMailDialogDataChildren> = new BehaviorSubject<
    IMailDialogDataChildren
  >({});

  constructor() {}

  setData(data: IMailDialogDataChildren): void {
    this.dataSubject.next(data);
  }

  getData$(): Observable<IMailDialogDataChildren> {
    return this.dataSubject.asObservable();
  }
}
