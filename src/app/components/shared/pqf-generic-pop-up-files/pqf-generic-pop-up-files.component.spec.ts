import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PqfGenericPopUpFilesComponent} from './pqf-generic-pop-up-files.component';

describe('PqfGenericPopUpFilesComponent', () => {
  let component: PqfGenericPopUpFilesComponent;
  let fixture: ComponentFixture<PqfGenericPopUpFilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PqfGenericPopUpFilesComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PqfGenericPopUpFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
