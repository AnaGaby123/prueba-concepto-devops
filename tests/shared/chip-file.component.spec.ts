import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {ChipFileComponent} from '@appComponents/shared/chip-file/chip-file.component';

describe('ChipFileComponent', () => {
  let component: ChipFileComponent;
  let fixture: ComponentFixture<ChipFileComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ChipFileComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ChipFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
