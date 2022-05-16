import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PayOrderPage } from './pay-order.page';

describe('PayOrderPage', () => {
  let component: PayOrderPage;
  let fixture: ComponentFixture<PayOrderPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayOrderPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PayOrderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
