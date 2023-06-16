import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VarietyTableComponent } from './variety-table.component';

describe('VarietyTableComponent', () => {
  let component: VarietyTableComponent;
  let fixture: ComponentFixture<VarietyTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VarietyTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VarietyTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
