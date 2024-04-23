import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {DropDownWithImageComponent} from '@appComponents/shared/drop-down-with-image/drop-down-with-image.component';

describe('DropDownWithIconComponent', () => {
  let component: DropDownWithImageComponent;
  let fixture: ComponentFixture<DropDownWithImageComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [DropDownWithImageComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(DropDownWithImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
