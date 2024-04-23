import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {GenericInputFileComponent} from '@appComponents/shared/generic-input-file/generic-input-file.component';
import {LoggerConfig, NGXLogger, NGXLoggerHttpService} from 'ngx-logger';
import {NGXLoggerMock} from 'ngx-logger/testing';
import {MatDialog} from '@angular/material/dialog';

describe('GenericInputFileComponent', () => {
  let component: GenericInputFileComponent;
  let fixture: ComponentFixture<GenericInputFileComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [GenericInputFileComponent],
        providers: [
          {provide: NGXLogger, useClass: NGXLoggerMock},
          {provide: MatDialog, useClass: class {}},
          {provide: NGXLoggerHttpService, useClass: class {}},
          {provide: LoggerConfig, useClass: class {}},
        ],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(GenericInputFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
