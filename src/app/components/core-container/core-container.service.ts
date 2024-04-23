import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {FilesData} from '@appComponents/catalogos/core-container/fileData';

@Injectable({
  providedIn: 'root',
})
export class CoreContainerService {
  private files = new BehaviorSubject<FilesData>(null);
  public files$ = this.files.asObservable();
  private target = new BehaviorSubject<HTMLElement>(null);
  public target$ = this.target.asObservable();

  constructor() {}

  setFile(newData: FilesData | null = null): void {
    this.files.next(newData);
  }
  // DOCS Se realizo mediante suscripcion para solucionar el seteo del target correctamente
  setTarget(newTarget: HTMLElement): void {
    this.target.next(newTarget);
  }
}
