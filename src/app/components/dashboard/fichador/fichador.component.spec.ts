import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FichadorComponent } from './fichador.component';

describe('FichadorComponent', () => {
  let component: FichadorComponent;
  let fixture: ComponentFixture<FichadorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FichadorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FichadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
