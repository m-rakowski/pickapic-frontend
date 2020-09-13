import { Component } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';
import { AuthService } from './services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  user$: Observable<any>;

  constructor(translate: TranslateService, private authService: AuthService) {
    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang('en');

    // the lang to use, if the lang isn't available, it will use the current loader to get them
    translate.use('en');

    this.user$ = this.authService.user$;
  }

  signOut(): void {
    this.authService.signOut();
  }
}
