import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GetEmailPage } from './get-email.page';

describe('GetEmailPage', () => {
  let component: GetEmailPage;
  let fixture: ComponentFixture<GetEmailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetEmailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GetEmailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
