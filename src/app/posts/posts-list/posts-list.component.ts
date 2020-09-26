import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../model/post';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { PostsState } from '../../store/reducers/reducers';
import { selectIsLoading, selectPostsAsArray } from '../../store/selectors/selectors';
import { actionClickPostImage, actionCreatePost, actionDeleteLastPost, actionGetAllPosts } from '../../store/actions/actions';
import { AngularFireStorage } from '@angular/fire/storage';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss'],
})
export class PostsListComponent implements OnInit {
  posts$: Observable<Post[]>;
  isLoading$: Observable<boolean>;
  formGroup: FormGroup;
  uploadProgressImage1$: Observable<number | undefined>;
  uploadProgressImage2$: Observable<number | undefined>;

  constructor(
    private store: Store<PostsState>,
    private angularFireStorage: AngularFireStorage, // it used to be readonly
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.posts$ = this.store.select(selectPostsAsArray);
    this.isLoading$ = this.store.select(selectIsLoading);
    this.getAllPosts();
  }

  createPost(): void {
    if (this.formGroup.valid) {
      const post: Post = {
        question: this.formGroup.get('question').value,
        images: [
          { url: (this.formGroup.get('images') as FormArray).at(0).value, voters: [] },
          { url: (this.formGroup.get('images') as FormArray).at(1).value, voters: [] },
        ],
      };
      this.store.dispatch(actionCreatePost({ post }));
    }
  }

  async uploadImage(i, event) {
    const angularFireUploadTask = await this.angularFireStorage.upload(Math.random().toString(36).substring(2), event.target.files[0]);
    const downloadURL = await angularFireUploadTask.ref.getDownloadURL();

    (this.formGroup.get('images') as FormArray).at(i).patchValue(downloadURL);
  }

  getAllPosts() {
    this.store.dispatch(actionGetAllPosts());
  }

  deleteLastPost() {
    this.store.dispatch(actionDeleteLastPost());
  }

  clickNthImage(i, post: Post) {
    this.store.dispatch(actionClickPostImage({ i, post }));
  }

  private createForm(): void {
    this.formGroup = new FormGroup({
      question: new FormControl('', [Validators.required]),
      images: new FormArray([new FormControl(), new FormControl()]),
    });
  }

  getVoteCount(post: Post, i: number) {
    return post.images[i].voters ? post.images[i].voters.length : 0;
  }
}
