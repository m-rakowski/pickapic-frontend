import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  errorMessage: string;
  signUpFormGroup: FormGroup;

  constructor(
    private authService: AuthService,
    private angularFirestore: AngularFirestore,
    private router: Router,
    private angularFireAuth: AngularFireAuth
  ) {}

  ngOnInit(): void {
    this.signUpFormGroup = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
  }

  signUp(): void {
    this.angularFireAuth
      .createUserWithEmailAndPassword(this.signUpFormGroup.get('email').value, this.signUpFormGroup.get('password').value)
      .then((result) => {
        console.log(result);
        this.router.navigate(['']);
      })
      .catch((error) => {
        this.errorMessage = error.message;
      });
  }
}
