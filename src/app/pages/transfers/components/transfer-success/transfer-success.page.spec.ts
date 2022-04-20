import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TransferSuccessPage } from './transfer-success.page';

describe('TransferSuccessPage', () => {
  let component: TransferSuccessPage;
  let fixture: ComponentFixture<TransferSuccessPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransferSuccessPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TransferSuccessPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
