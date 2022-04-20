import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SoftTokenPage } from './soft-token.page';

describe('SoftTokenPage', () => {
  let component: SoftTokenPage;
  let fixture: ComponentFixture<SoftTokenPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SoftTokenPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SoftTokenPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
