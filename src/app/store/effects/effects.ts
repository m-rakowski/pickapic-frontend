import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { catchError, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { PostService } from '../../posts/services/post.service';
import { Post } from '../../posts/model/post';
import { PostsState } from '../reducers/reducers';
import { Store } from '@ngrx/store';
import { selectLastPost, selectNthPost } from '../selectors/selectors';
import {
  actionClickPostImage,
  actionCreatePost,
  actionCreatePostDone,
  actionDeleteLastPost,
  actionDeleteLastPostDone,
  actionDeleteNthPost,
  actionDeleteNthPostError,
  actionDownvotePostImage,
  actionDownvotePostImageDone,
  actionGetAllPosts,
  actionGetAllPostsDone,
  actionUpvotePostImage,
  actionUpvotePostImageDone,
} from '../actions/actions';
import { AuthService } from '../../services/auth.service';
import { User } from '../../posts/model/user';

@Injectable({
  providedIn: 'root',
})
export class PostEffects {
  constructor(
    private actions$: Actions,
    private store$: Store<PostsState>,
    private postService: PostService,
    private authService: AuthService
  ) {}

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

  clickImage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actionClickPostImage),
      switchMap((action) =>
        this.authService.user$.pipe(withLatestFrom(this.store$.select(selectNthPost, { id: action.post.id }))).pipe(
          map(([user, post]) => {
            if (this.userHasAlreadyVoted(user, post)) {
              return actionDownvotePostImage({ i: action.i, post: action.post, userId: user.uid });
            } else {
              return actionUpvotePostImage({ i: action.i, post: action.post, userId: user.uid });
            }
          })
        )
      )
    )
  );

  downvoteImage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actionDownvotePostImage),
      switchMap((action) => {
        return this.authService.user$.pipe(
          switchMap((user) => {
            console.log('user is ', user);
            return this.postService.updatePost(action.post).pipe(
              map(() => {
                const newPost: Post = JSON.parse(JSON.stringify(action.post));
                newPost.images[action.i].voters.push(user.uid);
                return actionDownvotePostImageDone({ i: action.i, post: newPost, userId: user.uid });
              }),
              catchError(() => EMPTY)
            );
          })
        );
      })
    )
  );
  upvoteImage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actionUpvotePostImage),
      switchMap((action) => {
        return this.authService.user$.pipe(
          switchMap((user) => {
            console.log('user is ', user);

            const newPost: Post = JSON.parse(JSON.stringify(action.post));
            if (!newPost.images[action.i].voters) {
              newPost.images[action.i].voters = [];
            }
            newPost.images[action.i].voters.push(user.uid);
            return this.postService.updatePost(newPost).pipe(
              map(() => {
                return actionUpvotePostImageDone({ i: action.i, post: newPost, userId: user.uid });
              }),
              catchError(() => EMPTY)
            );
          })
        );
      })
    )
  );

  private userHasAlreadyVoted(user: User, post: Post) {
    post.images.forEach((image) => {
      if (image.voters && image.voters.includes(user.uid)) {
        return true;
      }
    });

    return false;
  }
}
