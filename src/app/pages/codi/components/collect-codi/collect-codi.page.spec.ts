import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CollectCodiPage } from './collect-codi.page';

describe('CollectCodiPage', () => {
  let component: CollectCodiPage;
  let fixture: ComponentFixture<CollectCodiPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollectCodiPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CollectCodiPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
