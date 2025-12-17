import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  constructor(private location: Location, private router: Router) {}

  routeBack() {
    this.location.back();
  }

  routeBackOrGoTo(route: string) {
    if (window.history.length > 1) {
      this.location.back();
    } else {
      this.router.navigate([route]);
    }
  }
}
