import { Route } from '@angular/compiler/src/core';
import { Injectable } from '@angular/core';
import { CanLoad, Router, UrlSegment } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanLoad {

  constructor(private router: Router) { }

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> | boolean {
    const token = localStorage.getItem('auth-token');
    debugger
    if (token) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
}
