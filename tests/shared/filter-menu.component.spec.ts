import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {FilterMenuComponent} from '@appComponents/shared/filter-menu/filter-menu.component';
import {LoggerConfig, NGXLogger, NGXLoggerHttpService} from 'ngx-logger';
import {NGXLoggerMock} from 'ngx-logger/testing';
import {MatDialog} from '@angular/material/dialog';

describe('FilterMenuComponent', () => {
  let component: FilterMenuComponent;
  let fixture: ComponentFixture<FilterMenuComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [FilterMenuComponent],
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
    fixture = TestBed.createComponent(FilterMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
