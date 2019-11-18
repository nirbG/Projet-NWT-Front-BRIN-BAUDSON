import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MesEnvieComponent } from './mes-envie.component';

describe('MesEnvieComponent', () => {
  let component: MesEnvieComponent;
  let fixture: ComponentFixture<MesEnvieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MesEnvieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MesEnvieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
