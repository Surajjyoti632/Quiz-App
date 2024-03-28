import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListQuizUserComponent } from './list-quiz-user.component';

describe('ListQuizUserComponent', () => {
  let component: ListQuizUserComponent;
  let fixture: ComponentFixture<ListQuizUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListQuizUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListQuizUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
