import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Post } from './model/post';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PostsState } from './store/reducers';
import { selectPostsAsArray } from './store/selectors';
import { actionCreatePost, actionDeleteLastPost, actionGetAllPosts } from './store/actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  posts$: Observable<Post[]>;
  formGroup: FormGroup;

  constructor(private store: Store<PostsState>) {
  }

  ngOnInit(): void {
    this.createForm();
    this.posts$ = this.store.select(selectPostsAsArray);
    this.getAllPosts();
  }

  createPost(): void {
    if (this.formGroup.valid) {
      this.store.dispatch(actionCreatePost({post: this.formGroup.value}));
    }
  }

  getAllPosts() {
    this.store.dispatch(actionGetAllPosts());
  }

  formControl(controlName: string): FormControl {
    return this.formGroup.get(controlName) as FormControl;
  }

  deleteLastPost() {
    this.store.dispatch(actionDeleteLastPost());
  }

  private createForm(): void {
    this.formGroup = new FormGroup({
      title: new FormControl('', [Validators.required]),
      content: new FormControl('', [Validators.required]),
    });
  }
}
