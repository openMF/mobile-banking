import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ManageAccountPage } from './manage-account.page';

describe('ManageAccountPage', () => {
  let component: ManageAccountPage;
  let fixture: ComponentFixture<ManageAccountPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageAccountPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ManageAccountPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
