import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DetailEditPage } from './detail-edit.page';

describe('DetailEditPage', () => {
  let component: DetailEditPage;
  let fixture: ComponentFixture<DetailEditPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailEditPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DetailEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
