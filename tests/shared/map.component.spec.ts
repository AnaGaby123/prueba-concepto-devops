import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {MapComponent} from '@appComponents/shared/map/map.component';
import {StoreModule} from '@ngrx/store';
import {provideMockStore} from '@ngrx/store/testing';

describe('MapComponent', () => {
  let component: MapComponent;
  let fixture: ComponentFixture<MapComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [MapComponent],
        imports: [StoreModule.forRoot(provideMockStore)],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(MapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
