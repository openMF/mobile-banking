import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PlanSocialPage } from './plan-social.page';

describe('PlanSocialPage', () => {
  let component: PlanSocialPage;
  let fixture: ComponentFixture<PlanSocialPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanSocialPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PlanSocialPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
