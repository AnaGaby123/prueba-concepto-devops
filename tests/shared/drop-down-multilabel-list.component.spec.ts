import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {DropDownMultilabelListComponent} from '@appComponents/shared/drop-down-multilabel-list/drop-down-multilabel-list.component';

describe('DropDownMultilabelListComponent', () => {
  let component: DropDownMultilabelListComponent;
  let fixture: ComponentFixture<DropDownMultilabelListComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [DropDownMultilabelListComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(DropDownMultilabelListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
