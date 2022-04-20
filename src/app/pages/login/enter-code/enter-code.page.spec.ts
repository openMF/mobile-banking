import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EnterCodePage } from './enter-code.page';

describe('EnterCodePage', () => {
  let component: EnterCodePage;
  let fixture: ComponentFixture<EnterCodePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnterCodePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EnterCodePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
