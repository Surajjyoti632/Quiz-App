import { TestBed } from '@angular/core/testing';
import { UserRouteGuardService } from './user-route-guard.service';



describe('UserRouteGuardService', () => {
  let service: UserRouteGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserRouteGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
