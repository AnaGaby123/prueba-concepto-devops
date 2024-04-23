import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {UploadViewFileComponent} from '@appComponents/shared/upload-view-file/upload-view-file.component';
import {LoggerConfig, NGXLogger, NGXLoggerHttpService} from 'ngx-logger';
import {NGXLoggerMock} from 'ngx-logger/testing';
import {MatDialog} from '@angular/material/dialog';

describe('UploadViewFileComponent', () => {
  let component: UploadViewFileComponent;
  let fixture: ComponentFixture<UploadViewFileComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [UploadViewFileComponent],
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
    fixture = TestBed.createComponent(UploadViewFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
