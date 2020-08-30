import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../model/post';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { PostsState } from '../../store/reducers';
import { selectIsLoading, selectPostsAsArray } from '../../store/selectors';
import {
  actionCreatePost,
  actionDeleteLastPost,
  actionGetAllPosts,
} from '../../store/actions';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss'],
})
export class PostsListComponent implements OnInit {
  posts$: Observable<Post[]>;
  isLoading$: Observable<boolean>;
  formGroup: FormGroup;

  constructor(private store: Store<PostsState>) {}

  ngOnInit(): void {
    this.createForm();
    this.posts$ = this.store.select(selectPostsAsArray);
    this.isLoading$ = this.store.select(selectIsLoading);
    this.getAllPosts();
  }

  createPost(): void {
    if (this.formGroup.valid) {
      this.store.dispatch(actionCreatePost({ post: this.formGroup.value }));
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
