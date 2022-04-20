import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AnswerPage } from './answer.page';

describe('AnswerPage', () => {
  let component: AnswerPage;
  let fixture: ComponentFixture<AnswerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnswerPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AnswerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
