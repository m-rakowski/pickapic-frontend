import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from '../model/post';
import { from, Observable } from 'rxjs';
import { map, mergeMap, switchMap, tap, toArray } from 'rxjs/operators';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { User } from '../model/user';
import { AuthService } from '../../services/auth.service';
import { AngularFireStorage } from '@angular/fire/storage';
import * as firebase from 'firebase';
import { UtilsService } from '../../services/utils.service';
import { Image } from '../model/image';

@Injectable({
  providedIn: 'root',
})
export class PostService {
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

  deletePostById(id: string): Observable<void> {
    return from(this.angularFireDatabase.object('/posts/' + id).remove());
  }

  updatePost(post: Post): Observable<void> {
    return from(this.angularFireDatabase.object('/posts/' + post.postId).update(post));
  }

  getVoters(postId: string, imageId: string): Observable<string[]> {
    return this.angularFireDatabase
      .list<string>('/posts/' + postId + '/images/' + imageId + '/voters')
      .valueChanges();
  }

  remoteVote(postId: string, imageId: string, userId: string): void {
    const path = '/posts/' + postId + '/images/' + imageId + '/voters';
    // this.angularFireDatabase
    //   .list(path, (ref) => ref.orderByChild('userId').equalTo(userId))
    // .this.angularFireDatabase.object(path);
    const subscription = this.angularFireDatabase
      .list(path, (ref) => ref.orderByValue().equalTo(userId))
      .stateChanges()
      .subscribe((x) => {
        this.angularFireDatabase.list(path).remove(x.key);
        subscription.unsubscribe();
      });
    // .valueChanges()
    // .subscribe((x) => console.log(x));
    // .remove();

    // this.angularFireDatabase.object('/posts/' + postId + '/images/' + nthImage + '/voters/' + mthVote).remove();
    // this.angularFireDatabase
    //   .list<string>('/posts/' + postId + '/images/' + n + '/voters')
    //   .valueChanges()
    //   .pipe(
    //     map((userIds: string[]) => {
    //       return userIds.indexOf(uid);
    //     }),
    //     switchMap((indexOfUserId: number) => {
    //
    //       return EMPTY;
    //     })
    //   )
    //   .subscribe();
  }

  addVote(postId: string, imageId: string, userId: string): void {
    this.angularFireDatabase.list('/posts/' + postId + '/images/' + imageId + '/voters/').push(userId);
  }

  deletePost(post: Post) {
    return from(this.angularFireDatabase.object('/posts/' + post.postId).remove());
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
      mergeMap((downloadUrls: string[]) => {
        return this.createPost(post, downloadUrls);
      })
    );
  }

  getPostById(id: string): Observable<Post> {
    return this.angularFireDatabase
      .object('/posts/' + id)
      .snapshotChanges()
      .pipe(
        map((action) => {
          const val: Post = action.payload.val();
          return { ...val, postId: action.key };
        })
      );
  }

  upvoteOrDownvote(post: Post, imageId: string): void {
    const subscription = this.authService.user$.subscribe((user) => {
      if (!this.utilsService.hasUserVotedForPost(user, post)) {
        this.addVote(post.postId, imageId, user.uid);
      } else {
        if (this.utilsService.hasUserVotedForImageInPost(user, post, imageId)) {
          this.remoteVote(post.postId, imageId, user.uid);
        }
      }
      subscription.unsubscribe();
    });
  }

  private addImagesToPost(imageUrls: string[], postId: string) {
    imageUrls.forEach((imageUrl) =>
      this.angularFireDatabase.list<Image>('/posts/' + postId + '/images').push({ url: imageUrl, voters: [] })
    );
  }
}
