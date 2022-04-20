import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TranfersPage } from './tranfers.page';

describe('TranfersPage', () => {
  let component: TranfersPage;
  let fixture: ComponentFixture<TranfersPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TranfersPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TranfersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
