import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GenerateBarcodePage } from './generate-barcode.page';

describe('GenerateBarcodePage', () => {
  let component: GenerateBarcodePage;
  let fixture: ComponentFixture<GenerateBarcodePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenerateBarcodePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GenerateBarcodePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
