import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquirectComponent } from './equirect.component';

describe('EquirectComponent', () => {
  let component: EquirectComponent;
  let fixture: ComponentFixture<EquirectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EquirectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EquirectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
