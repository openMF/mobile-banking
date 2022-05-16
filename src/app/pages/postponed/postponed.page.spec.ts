import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PostponedPage } from './postponed.page';

describe('PostponedPage', () => {
  let component: PostponedPage;
  let fixture: ComponentFixture<PostponedPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostponedPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PostponedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
