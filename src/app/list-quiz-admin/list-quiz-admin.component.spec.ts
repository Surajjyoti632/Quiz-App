import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListQuizAdminComponent } from './list-quiz-admin.component';

describe('ListQuizAdminComponent', () => {
  let component: ListQuizAdminComponent;
  let fixture: ComponentFixture<ListQuizAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListQuizAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListQuizAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
