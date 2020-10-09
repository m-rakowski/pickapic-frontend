import { Observable } from 'rxjs';
import { Post } from '../model/post';

export abstract class PostService {
  abstract getAll(): Observable<Post[]>;

  abstract createPost(post: Post, imageUrls: string[]): Observable<any>;

  abstract deletePostById(id: string): Observable<any>;

  abstract updatePost(post: Post): Observable<any>;

  abstract getVoters(postId: string, imageId: string): Observable<string[]>;

  abstract remoteVote(postId: string, imageId: string, userId: string): Observable<any>;

  abstract addVote(postId: string, imageId: string, userId: string): Observable<any>;

  abstract deletePost(postId: string): Observable<any>;

  abstract uploadImages(files: File[]): Observable<string[]>;

  abstract createPostWithFiles(post: Post, files: File[]): Observable<any>;

  abstract getPostById(postId: string): Observable<Post>;

  abstract addImagesToPost(imageUrls: string[], postId: string): Observable<any>;

  abstract removePost(post: Post): Observable<any>;
}
