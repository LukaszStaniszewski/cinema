import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowRepertuireComponent } from './show-repertuire.component';

describe('ShowRepertuireComponent', () => {
  let component: ShowRepertuireComponent;
  let fixture: ComponentFixture<ShowRepertuireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowRepertuireComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowRepertuireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
