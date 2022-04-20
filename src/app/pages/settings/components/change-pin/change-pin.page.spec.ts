import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ChangePinPage } from './change-pin.page';

describe('ChangePinPage', () => {
  let component: ChangePinPage;
  let fixture: ComponentFixture<ChangePinPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangePinPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ChangePinPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
