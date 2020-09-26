import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from '../model/post';
import { from, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { User } from '../model/user';
import { AuthService } from '../../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private httpClient: HttpClient, private angularFireDatabase: AngularFireDatabase, private authService: AuthService) {}

  posts$: AngularFireList<Post> = this.angularFireDatabase.list<Post>('/posts');

  getAll(): Observable<Post[]> {
    return this.posts$.valueChanges();
  }

  createPost(post: Post): Observable<any> {
    return this.authService.user$.pipe(
      switchMap((user: User) => {
        const newPost: Post = {
          ...post,
          additionDate: 1,
          addedByUser: user,
        };

        console.log('to zarz idzie do bakcendu', newPost);
        return from(this.posts$.push(newPost));
      })
    );
  }

  deletePostById(id: string): Observable<void> {
    return from(this.angularFireDatabase.object('/posts/' + id).remove());
  }

  updatePost(post: Post): Observable<void> {
    console.log(post);
    return from(this.angularFireDatabase.object('/posts/' + post.id).update(post));
  }
}
