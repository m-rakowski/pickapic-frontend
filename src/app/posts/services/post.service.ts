import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from '../model/post';
import { from, Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { DocumentReference } from '@angular/fire/firestore/interfaces';
import { firestore } from 'firebase';
@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private httpClient: HttpClient, private angularFirestore: AngularFirestore) {}

  getAll(): Observable<Post[]> {
    return this.angularFirestore.collection<Post>('posts').valueChanges({ idField: 'id' });
  }

  createPost(post: Post): Observable<DocumentReference> {
    return from(this.angularFirestore.collection<Post>('posts').add({ ...post, created: firestore.Timestamp.now() }));
  }

  deletePostById(id: string): Observable<void> {
    return from(this.angularFirestore.doc('posts/' + id).delete());
  }

  updatePost(post: Post): Observable<void> {
    return from(this.angularFirestore.doc('posts/' + post.id).update(post));
  }
}
