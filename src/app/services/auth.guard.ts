import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.authService.user$.pipe(
      map((authenticatedUser) => {
        if (route.data.routeForGuests) {
          return !authenticatedUser;
        } else {
          if (!authenticatedUser) {
            this.router.navigate(['sign-in']);
          }
          return !!authenticatedUser;
        }
      })
    );
  }
}
