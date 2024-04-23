import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {DropdownButtonCustomComponent} from '@appComponents/shared/dropdown-button-custom/dropdown-button-custom.component';
import {TranslateModule} from '@ngx-translate/core';

describe('DropdownButtonCustomComponent', () => {
  let component: DropdownButtonCustomComponent;
  let fixture: ComponentFixture<DropdownButtonCustomComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [DropdownButtonCustomComponent],
        imports: [TranslateModule.forRoot()],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(DropdownButtonCustomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
