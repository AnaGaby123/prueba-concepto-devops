import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SeeQuotedItemPopUpComponent} from './see-quoted-item-pop-up.component';

describe('SeeQuotedItemPopUpComponent', () => {
  let component: SeeQuotedItemPopUpComponent;
  let fixture: ComponentFixture<SeeQuotedItemPopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SeeQuotedItemPopUpComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeeQuotedItemPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
