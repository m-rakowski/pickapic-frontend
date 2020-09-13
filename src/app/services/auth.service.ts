import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  user$: Observable<any>;

  constructor(private angularFireAuth: AngularFireAuth) {
    this.user$ = this.angularFireAuth.user;
  }

  async signOut() {
    await this.angularFireAuth.signOut();
    location.reload();
  }

  signInWithEmailOrUsername(email: string, password: string) {
    return this.angularFireAuth.signInWithEmailAndPassword(email, password);
  }
}
