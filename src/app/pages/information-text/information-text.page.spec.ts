import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InformationTextPage } from './information-text.page';

describe('InformationTextPage', () => {
  let component: InformationTextPage;
  let fixture: ComponentFixture<InformationTextPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InformationTextPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InformationTextPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
