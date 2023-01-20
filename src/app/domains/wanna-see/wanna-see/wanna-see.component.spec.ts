import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WannaSeeComponent } from './wanna-see.component';

describe('WannaSeeComponent', () => {
  let component: WannaSeeComponent;
  let fixture: ComponentFixture<WannaSeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WannaSeeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WannaSeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
