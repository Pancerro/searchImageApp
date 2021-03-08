import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalBigImageComponent } from './modal-big-image.component';

describe('ModalBigImageComponent', () => {
  let component: ModalBigImageComponent;
  let fixture: ComponentFixture<ModalBigImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalBigImageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalBigImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
