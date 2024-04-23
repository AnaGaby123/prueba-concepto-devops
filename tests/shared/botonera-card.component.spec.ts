import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {BotoneraCardComponent} from '@appComponents/shared/botonera-card/botonera-card.component';

describe('BotoneraCardComponent', () => {
  let component: BotoneraCardComponent;
  let fixture: ComponentFixture<BotoneraCardComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [BotoneraCardComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(BotoneraCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
