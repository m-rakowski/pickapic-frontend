import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  errorMessage: string;
  isSignUpFormVisible: boolean;
  signInFormGroup: FormGroup;

  constructor(private authService: AuthService, private angularFirestore: AngularFirestore, private router: Router) {}

  ngOnInit(): void {
    this.signInFormGroup = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
  }

  signIn(): void {
    if (this.signInFormGroup.valid) {
      this.authService
        .signInWithEmailOrUsername(this.signInFormGroup.get('email').value, this.signInFormGroup.get('password').value)
        .then((result) => {
          this.router.navigate(['']);
        })
        .catch((error) => {
          this.errorMessage = error.message;
        });
    }
  }

  signInWithGoogle(): void {
    this.authService
      .signInWithGoogle()
      .then((result) => {
        this.router.navigate(['']);
      })
      .catch((error) => {
        this.errorMessage = error.message;
      });
  }
}
