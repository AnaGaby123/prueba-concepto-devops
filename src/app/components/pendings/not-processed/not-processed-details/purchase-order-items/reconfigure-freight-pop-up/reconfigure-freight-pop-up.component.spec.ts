import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ReconfigureFreightPopUpComponent} from './reconfigure-freight-pop-up.component';

describe('ReconfigureFreightPopUpComponent', () => {
  let component: ReconfigureFreightPopUpComponent;
  let fixture: ComponentFixture<ReconfigureFreightPopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReconfigureFreightPopUpComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReconfigureFreightPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
