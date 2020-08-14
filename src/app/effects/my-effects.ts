import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { PostService } from '../services/post.service';
import { createPost, createPostDone, getAllPosts, getAllPostsDone } from '../actions/my-actions';
import { Post } from '../model/post';


@Injectable({
  providedIn: 'root'
})
export class PostEffects {

  getAllPosts$ = createEffect(() => this.actions$
    .pipe(
      ofType(getAllPosts),
      mergeMap(() => this.postService.getAll()
        .pipe(
          map((posts: Post[]) => getAllPostsDone({posts})),
          catchError(() => EMPTY)
        )
      )
    )
  );
  addPost$ = createEffect(() => this.actions$
    .pipe(
      ofType(createPost),
      tap((x) => {
        console.log('effect addPost caught an action of type createPost, the action is', x);
      }),
      mergeMap((action) => this.postService.createPost(action.post)
        .pipe(
          map((post: Post) => createPostDone({post})),
          catchError(() => EMPTY)
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private postService: PostService
  ) {
  }
}
