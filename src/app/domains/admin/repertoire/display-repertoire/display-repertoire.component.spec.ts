import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayRepertoireComponent } from './display-repertoire.component';

describe('DisplayRepertoireComponent', () => {
  let component: DisplayRepertoireComponent;
  let fixture: ComponentFixture<DisplayRepertoireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayRepertoireComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplayRepertoireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
