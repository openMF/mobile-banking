import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ChangePhonePage } from './change-phone.page';

describe('ChangePhonePage', () => {
  let component: ChangePhonePage;
  let fixture: ComponentFixture<ChangePhonePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangePhonePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ChangePhonePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
