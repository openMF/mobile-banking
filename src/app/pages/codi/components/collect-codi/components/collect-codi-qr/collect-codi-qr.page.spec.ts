import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CollectCodiQrPage } from './collect-codi-qr.page';

describe('CollectCodiQrPage', () => {
  let component: CollectCodiQrPage;
  let fixture: ComponentFixture<CollectCodiQrPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollectCodiQrPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CollectCodiQrPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
