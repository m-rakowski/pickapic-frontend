import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { catchError, map, mergeMap, tap, withLatestFrom } from 'rxjs/operators';
import { PostService } from '../../services/post.service';
import { Post } from '../../model/post';
import {
  actionCreatePost,
  actionCreatePostDone,
  actionDeleteLastPost,
  actionDeleteLastPostDone,
  actionDeleteNthPost,
  actionGetAllPosts,
  actionGetAllPostsDone
} from '../actions';
import { PostsState } from '../reducers';
import { Store } from '@ngrx/store';
import { selectLastPost } from '../selectors';


@Injectable({
  providedIn: 'root'
})
export class PostEffects {

  getAllPosts$ = createEffect(() => this.actions$
    .pipe(
      ofType(actionGetAllPosts),
      exhaustMap(() => this.postService.getAll()
        .pipe(
          map((posts: Post[]) => actionGetAllPostsDone({posts})),
          catchError(() => EMPTY)
        )
      )
    )
  );
  createPost$ = createEffect(() => this.actions$
    .pipe(
      ofType(actionCreatePost),
      exhaustMap((action) => this.postService.createPost(action.post)
        .pipe(
          map((post: Post) => actionCreatePostDone({post})),
          catchError(() => EMPTY)
        )
      )
    )
  );
  deleteLastPost$ = createEffect(() => this.actions$
    .pipe(
      ofType(actionDeleteLastPost),
      withLatestFrom(this.store$.select(selectLastPost)),
      map(([_, post]) => {
        return post ? actionDeleteNthPost({id: post.id}) : actionDeleteNthPostError();
      })
    )
  );
  deleteNthPost$ = createEffect(() => this.actions$
    .pipe(
      ofType(actionDeleteNthPost),
      exhaustMap((action) => this.postService.deletePostById(action.id)
        .pipe(
          map((post: Post) => actionDeleteLastPostDone({post})),
          catchError(() => EMPTY)
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private store$: Store<PostsState>,
    private postService: PostService
  ) {
  }
}
