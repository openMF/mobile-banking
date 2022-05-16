import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CodiPage } from './codi.page';

describe('CodiPage', () => {
  let component: CodiPage;
  let fixture: ComponentFixture<CodiPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CodiPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CodiPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
