import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {DropDownSearchComponent} from '@appComponents/shared/drop-down-search/drop-down-search.component';
import {FormsModule} from '@angular/forms';

describe('DropDownSearchComponent', () => {
  let component: DropDownSearchComponent;
  let fixture: ComponentFixture<DropDownSearchComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [DropDownSearchComponent],
        imports: [FormsModule],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(DropDownSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
