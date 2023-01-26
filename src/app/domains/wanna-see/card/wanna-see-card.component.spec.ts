import { ComponentFixture, TestBed } from "@angular/core/testing";

import { WannaSeeCardComponent } from "./wanna-see-card.component";

describe("WannaSeeCardComponent", () => {
  let component: WannaSeeCardComponent;
  let fixture: ComponentFixture<WannaSeeCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WannaSeeCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(WannaSeeCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
