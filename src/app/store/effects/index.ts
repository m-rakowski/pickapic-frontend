import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { catchError, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { PostService } from '../../posts/services/post.service';
import { Post } from '../../posts/model/post';
import {
  actionCreatePost,
  actionCreatePostDone,
  actionDeleteLastPost,
  actionDeleteLastPostDone,
  actionDeleteNthPost,
  actionDeleteNthPostError,
  actionGetAllPosts,
  actionGetAllPostsDone,
} from '../actions';
import { PostsState } from '../reducers';
import { Store } from '@ngrx/store';
import { selectLastPost } from '../selectors';

@Injectable({
  providedIn: 'root',
})
export class PostEffects {
  getAllPosts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actionGetAllPosts),
      switchMap(() =>
        this.postService.getAll().pipe(
          tap((x) => console.log('this is what I got from the firestore', x)),
          map((posts: Post[]) => actionGetAllPostsDone({ posts })),
          catchError(() => EMPTY)
        )
      )
    )
  );

  createPost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actionCreatePost),
      switchMap((action) =>
        this.postService.createPost(action.post).pipe(
          tap((x) => 'got action create post'),
          map(() => actionCreatePostDone({ post: action.post })),
          catchError(() => EMPTY)
        )
      )
    )
  );

  deleteLastPost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actionDeleteLastPost),
      withLatestFrom(this.store$.select(selectLastPost)),
      map(([_, post]) => {
        return post ? actionDeleteNthPost({ id: post.id }) : actionDeleteNthPostError();
      })
    )
  );

  deleteNthPost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actionDeleteNthPost),
      switchMap((action) =>
        this.postService.deletePostById(action.id).pipe(
          map(() => actionDeleteLastPostDone({ removedId: action.id })),
          catchError(() => EMPTY)
        )
      )
    )
  );

  constructor(private actions$: Actions, private store$: Store<PostsState>, private postService: PostService) {}
}
