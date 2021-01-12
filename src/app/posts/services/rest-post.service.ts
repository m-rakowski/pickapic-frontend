import { HttpClient } from '@angular/common/http';
import { Post } from '../model/post';
import { Observable, of } from 'rxjs';
import { map, mergeMap, pluck, switchMap, tap } from 'rxjs/operators';
import { User } from '../model/user';
import { AuthService } from '../../services/auth.service';
import { UtilsService } from '../../services/utils.service';
import { Image } from '../model/image';
import { PostService } from './post.service';
import { Injectable } from '@angular/core';
import { PostRequest } from '../model/post-request';

@Injectable()
export class RestPostService implements PostService {
  constructor(
    private httpClient: HttpClient,
    private authService: AuthService,
    private utilsService: UtilsService
  ) {}

  getAll(): Observable<Post[]> {
    return this.httpClient.get<Post[]>('/api/posts');
  }

  createPost(post: Post, imageUrls): Observable<any> {
    const postRequest: PostRequest = {
      question: post.question,
      imageIds: imageUrls,
    };

    return this.createPost2(postRequest);
  }

  createPost2(postRequest: PostRequest): Observable<any> {
    return this.httpClient.post<Post>('/api/posts', postRequest);
  }

  deletePostById(id: string): Observable<any> {
    return this.httpClient.delete('/api/posts/' + id);
  }

  updatePost(post: Post): Observable<any> {
    return this.httpClient.put('/api/posts/' + post.postId, post);
  }

  getVoters(postId: string, imageId: string): Observable<string[]> {
    return this.httpClient.get('/api/posts' + postId).pipe(
      pluck('images'),
      map((images: { [key: number]: Image }) => {
        const image: Image = images[imageId];
        return Object.values(image.voters);
      })
    );
  }

  remoteVote(postId: string, imageId: string, userId: string): Observable<any> {
    const path = '/posts/' + postId + '/images/' + imageId + '/voters';
    return this.httpClient.delete('/api' + path);
  }

  addVote(postId: string, imageId: string, userId: string): Observable<any> {
    const path = '/posts/' + postId + '/images/' + imageId + '/voters/' + userId;
    return this.httpClient.post('/api' + path, userId);
  }

  deletePost(postId: string): Observable<any> {
    return this.httpClient.delete('/api/posts/' + postId);
  }

  uploadImages(files: File[]): Observable<string[]> {
    const formData = new FormData();
    files.forEach((file) => formData.append('files', file));
    return this.httpClient.post<string[]>('/api/images/image', formData);
  }

  createPostWithFiles(post: Post, files: File[]): Observable<any> {
    return this.uploadImages(files).pipe(
      mergeMap((imageIds: string[]) => {
        return this.createPost(post, imageIds);
      })
    );
  }

  getPostById(postId: string): Observable<Post> {
    return this.httpClient.get('/api/posts/' + postId);
  }

  addImagesToPost(imageUrls: string[], postId: string): Observable<any> {
    return of({});
  }

  removePost(post: Post): Observable<any> {
    return this.httpClient.delete('api/posts/' + post.postId);
  }
}
