import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Post } from './model/post';
import { createPost, getAllPosts } from './actions/my-actions';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AppState } from './model/add-state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  posts$: Observable<Post[]>;
  formGroup: FormGroup;

  constructor(private store: Store<AppState>) {
  }

  createPost(): void {
    console.log('create post ', this.formGroup.value);
    if (this.formGroup.valid) {
      this.store.dispatch(createPost({post: this.formGroup.value}));
    }
  }

  ngOnInit(): void {
    this.createForm();
    this.posts$ = this.store.select('posts');
  }

  getAllPosts() {
    this.store.dispatch(getAllPosts());
  }

  formControl(controlName: string): FormControl {
    return this.formGroup.get(controlName) as FormControl;
  }

  private createForm(): void {
    this.formGroup = new FormGroup({
      title: new FormControl('', [Validators.required]),
      content: new FormControl('', [Validators.required]),
    });
  }
}
