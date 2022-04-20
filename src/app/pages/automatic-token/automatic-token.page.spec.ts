import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AutomaticTokenPage } from './automatic-token.page';

describe('AutomaticTokenPage', () => {
  let component: AutomaticTokenPage;
  let fixture: ComponentFixture<AutomaticTokenPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutomaticTokenPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AutomaticTokenPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
