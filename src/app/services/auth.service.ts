import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

import { Observable } from 'rxjs';
import { User } from '../posts/model/user';
import { auth } from 'firebase';

@Injectable({ providedIn: 'root' })
export class AuthService {
  readonly user$: Observable<User>;

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

  createUserWithEmailAndPassword(email: string, password: string) {
    return this.angularFireAuth.createUserWithEmailAndPassword(email, password);
  }

  signInWithGoogle() {
    return this.angularFireAuth.signInWithPopup(new auth.GoogleAuthProvider());
  }
}
