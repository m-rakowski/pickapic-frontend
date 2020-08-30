import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from '../model/post';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<Post[]> {
    return this.httpClient
      .get<Post[]>('http://localhost:3000/posts')
      .pipe(delay(1000));
  }

  createPost(post: Post): Observable<Post> {
    return this.httpClient
      .post<Post>('http://localhost:3000/posts', post)
      .pipe(delay(1000));
  }

  deletePostById(id: number): Observable<any> {
    return this.httpClient
      .delete<any>('http://localhost:3000/posts/' + id)
      .pipe(delay(1000));
  }
}
