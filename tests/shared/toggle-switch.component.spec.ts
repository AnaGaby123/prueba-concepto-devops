import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {ToggleSwitchComponent} from '@appComponents/shared/toggle-switch/toggle-switch.component';
import {LoggerConfig, NGXLogger, NGXLoggerHttpService} from 'ngx-logger';
import {NGXLoggerMock} from 'ngx-logger/testing';
import {MatDialog} from '@angular/material/dialog';

describe('ToggleSwitchComponent', () => {
  let component: ToggleSwitchComponent;
  let fixture: ComponentFixture<ToggleSwitchComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ToggleSwitchComponent],
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
    fixture = TestBed.createComponent(ToggleSwitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
