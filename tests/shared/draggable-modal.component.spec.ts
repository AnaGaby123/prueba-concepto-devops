import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {DraggableModalComponent} from '@appComponents/shared/draggable-modal/draggable-modal.component';

describe('DraggableModalComponent', () => {
  let component: DraggableModalComponent;
  let fixture: ComponentFixture<DraggableModalComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [DraggableModalComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(DraggableModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
