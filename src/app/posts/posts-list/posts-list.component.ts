import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../model/post';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { PostsState } from '../../store/reducers';
import { selectIsLoading, selectPostsAsArray } from '../../store/selectors';
import { actionCreatePost, actionDeleteLastPost, actionGetAllPosts } from '../../store/actions';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss'],
})
export class PostsListComponent implements OnInit {
  posts$: Observable<Post[]>;
  isLoading$: Observable<boolean>;
  formGroup: FormGroup;
  task: AngularFireUploadTask;
  uploadProgressPhoto1$: Observable<number | undefined>;
  uploadProgressPhoto2$: Observable<number | undefined>;
  private photo1Id: string;
  private photo2Id: string;

  constructor(private store: Store<PostsState>, private readonly angularFireStorage: AngularFireStorage) {}

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

  async uploadPhoto1(event) {
    this.photo1Id = Math.random().toString(36).substring(2);
    const angularFireUploadTask = await this.angularFireStorage.upload(this.photo1Id, event.target.files[0]);
    console.log('angularFireUploadTask', angularFireUploadTask);
    const downloadURL = await angularFireUploadTask.ref.getDownloadURL();
    console.log('downloadURL', downloadURL);

    this.formGroup.get('photo1Url').patchValue(downloadURL);
  }

  async uploadPhoto2(event) {
    this.photo2Id = Math.random().toString(36).substring(2);
    const angularFireUploadTask = await this.angularFireStorage.upload(this.photo2Id, event.target.files[0]);
    const downloadURL = await angularFireUploadTask.ref.getDownloadURL();
    this.formGroup.get('photo2Url').patchValue(downloadURL);
  }

  getAllPosts() {
    this.store.dispatch(actionGetAllPosts());
  }

  deleteLastPost() {
    this.store.dispatch(actionDeleteLastPost());
  }

  private createForm(): void {
    this.formGroup = new FormGroup({
      question: new FormControl('', [Validators.required]),
      title1: new FormControl('', [Validators.required]),
      title2: new FormControl('', [Validators.required]),
      description1: new FormControl('', [Validators.required]),
      description2: new FormControl('', [Validators.required]),
      photo1Url: new FormControl('', [Validators.required]),
      photo2Url: new FormControl('', [Validators.required]),
    });
  }
}
