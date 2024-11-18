import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextFieldInfoComponent } from './text-field-info.component';

describe('TextFieldInfoComponent', () => {
  let component: TextFieldInfoComponent;
  let fixture: ComponentFixture<TextFieldInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TextFieldInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TextFieldInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
