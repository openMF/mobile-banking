import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SecondLoginPage } from './second-login.page';

describe('SecondLoginPage', () => {
  let component: SecondLoginPage;
  let fixture: ComponentFixture<SecondLoginPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecondLoginPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SecondLoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
