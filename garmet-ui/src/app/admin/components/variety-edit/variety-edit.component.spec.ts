import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VarietyEditComponent } from './variety-edit.component';

describe('VarietyEditComponent', () => {
  let component: VarietyEditComponent;
  let fixture: ComponentFixture<VarietyEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VarietyEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VarietyEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
