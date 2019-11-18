import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaBDthequeComponent } from './ma-bdtheque.component';

describe('MaBDthequeComponent', () => {
  let component: MaBDthequeComponent;
  let fixture: ComponentFixture<MaBDthequeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaBDthequeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaBDthequeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
