import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PayCodiPage } from './pay-codi.page';

describe('PayCodiPage', () => {
  let component: PayCodiPage;
  let fixture: ComponentFixture<PayCodiPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayCodiPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PayCodiPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
