import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EMPTY, from, Observable, of } from 'rxjs';
import { map, mergeMap, switchMap, take, tap, toArray } from 'rxjs/operators';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import * as firebase from 'firebase';
import { User } from 'firebase';
import { UtilsService } from '../../services/utils.service';
import { PostService } from './post.service';
import { AuthService } from '../../services/auth.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { Image } from '../model/image';
import { Post } from '../model/post';

@Injectable()
export class FirebasePostService implements PostService {
  constructor(
    private httpClient: HttpClient,
    private angularFireDatabase: AngularFireDatabase,
    private authService: AuthService,
    private angularFireStorage: AngularFireStorage,
    private utilsService: UtilsService
  ) {}

  posts$: AngularFireList<Post> = this.angularFireDatabase.list<Post>('/posts');

  getAll(): Observable<Post[]> {
    return this.posts$.snapshotChanges().pipe(
      map((changes) => {
        return changes.map((c) => ({ postId: c.payload.key, ...c.payload.val() }));
      })
    );
  }

  createPost(post: Post, imageUrls: string[]): Observable<any> {
    return this.authService.user$.pipe(
      switchMap((user: User) => {
        const newPost: Post = {
          ...post,
          additionDate: firebase.database.ServerValue.TIMESTAMP,
          addedByUser: {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
          },
        };
        return from(this.posts$.push(newPost)).pipe(
          tap((x) => {
            this.addImagesToPost(imageUrls, x.key);
          })
        );
      })
    );
  }

  deletePostById(id: string): Observable<any> {
    return from(this.angularFireDatabase.object('/posts/' + id).remove());
  }

  updatePost(post: Post): Observable<any> {
    return from(this.angularFireDatabase.object('/posts/' + post.postId).update(post));
  }

  getVoters(postId: string, imageId: string): Observable<string[]> {
    return this.angularFireDatabase
      .list<string>('/posts/' + postId + '/images/' + imageId + '/voters')
      .valueChanges();
  }

  remoteVote(postId: string, imageId: string, userId: string): Observable<any> {
    const path = '/posts/' + postId + '/images/' + imageId + '/voters';
    return this.angularFireDatabase
      .list(path, (ref) => ref.orderByValue().equalTo(userId))
      .stateChanges()
      .pipe(
        take(1),
        switchMap((x) => {
          return this.angularFireDatabase.list(path).remove(x.key);
        })
      );
  }

  addVote(postId: string, imageId: string, userId: string): Observable<any> {
    return of(
      this.angularFireDatabase.list('/posts/' + postId + '/images/' + imageId + '/voters/').push(userId)
    );
  }

  deletePost(postId: string): Observable<any> {
    return from(this.angularFireDatabase.object('/posts/' + postId).remove());
  }

  deleteImages(downloadUrls: string[]): Observable<any> {
    downloadUrls.forEach((downloadUrl) => this.angularFireStorage.storage.refFromURL(downloadUrl).delete());
    return of({});
  }

  uploadImages(files: File[]): Observable<string[]> {
    return from(files).pipe(
      mergeMap((file) =>
        from(this.angularFireStorage.upload(Math.random().toString(36).substring(2), file)).pipe(
          mergeMap((angularFireUploadTask) => from(angularFireUploadTask.ref.getDownloadURL()))
        )
      ),
      toArray()
    );
  }

  createPostWithFiles(post: Post, files: File[]): Observable<any> {
    return this.uploadImages(files).pipe(
      take(1),
      mergeMap((downloadUrls: string[]) => {
        return this.createPost(post, downloadUrls);
      })
    );
  }

  getPostById(postId: string): Observable<Post> {
    return this.angularFireDatabase
      .object('/posts/' + postId)
      .snapshotChanges()
      .pipe(
        map((action) => {
          const val: Post = action.payload.val();
          return { ...val, postId: action.key };
        })
      );
  }

  addImagesToPost(imageUrls: string[], postId: string): Observable<any> {
    imageUrls.forEach((imageUrl) =>
      this.angularFireDatabase.list<Image>('/posts/' + postId + '/images').push({ url: imageUrl, voters: [] })
    );
    return EMPTY;
  }

  removePost(post: Post): Observable<any> {
    const downloadUrls = Object.values(post.images || []).map((images) => images.url);
    return this.deleteImages(downloadUrls).pipe(mergeMap(() => this.deletePostById(post.postId)));
  }
}
