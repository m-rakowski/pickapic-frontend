import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { catchError, map, mergeMap, switchMap, withLatestFrom } from 'rxjs/operators';
import { PostService } from '../../posts/services/post.service';
import { Post } from '../../posts/model/post';
import { PostsState } from '../reducers/reducers';
import { Store } from '@ngrx/store';
import { selectNthPost } from '../selectors/selectors';
import {
  actionClickPostImage,
  actionCreatePost,
  actionCreatePostDone,
  actionDeletePost,
  actionDeletePostDone,
  actionDownvotePostImage,
  actionDownvotePostImageDone,
  actionGetAllPosts,
  actionGetAllPostsDone,
  actionUpvotePostImage,
  actionUpvotePostImageDone,
  emptyAction,
} from '../actions/actions';
import { AuthService } from '../../services/auth.service';
import { UtilsService } from '../../services/utils.service';

@Injectable({
  providedIn: 'root',
})
export class PostEffects {
  constructor(
    private actions$: Actions,
    private store$: Store<PostsState>,
    private postService: PostService,
    private authService: AuthService,
    private utilsService: UtilsService
  ) {}

  getAllPosts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actionGetAllPosts),
      switchMap(() =>
        this.postService.getAll().pipe(
          map((posts: Post[]) => actionGetAllPostsDone({ posts })),
          catchError((err) => {
            console.error(err);
            return EMPTY;
          })
        )
      )
    )
  );

  createPost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actionCreatePost),
      switchMap((action) =>
        this.postService.uploadImages(action.files).pipe(
          mergeMap((downloadUrls: string[]) => {
            return this.postService.createPost(action.post, downloadUrls);
          })
        )
      ),
      map(() => actionCreatePostDone()),
      catchError((err) => {
        console.error(err);
        return EMPTY;
      })
    )
  );

  clickImage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actionClickPostImage),
      switchMap((action) =>
        this.authService.user$
          .pipe(withLatestFrom(this.store$.select(selectNthPost, { id: action.post.postId })))
          .pipe(
            map(([user, post]) => {
              if (this.utilsService.hasUserVotedForPost(user, post)) {
                if (this.utilsService.hasUserVotedForImageInPost(user, post, action.imageId)) {
                  return actionDownvotePostImage({
                    imageId: action.imageId,
                    post: action.post,
                    userId: user.uid,
                  });
                } else {
                  // return emptyAction();
                }
              } else {
                return actionUpvotePostImage({
                  imageId: action.imageId,
                  post: action.post,
                  userId: user.uid,
                });
              }
            })
          )
      ),
      catchError((err) => {
        console.error(err);
        return EMPTY;
      })
    )
  );

  downvoteImage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actionDownvotePostImage),
      switchMap((action) => {
        return this.authService.user$.pipe(
          switchMap((user) => {
            const newPost: Post = JSON.parse(JSON.stringify(action.post));
            // const index = newPost.images[action.imageId].voters.indexOf(user.uid);
            // newPost.images[action.imageId].voters.splice(index, 1);
            return this.postService.updatePost(newPost).pipe(
              map((whatigot) => {
                // console.log(whatigot, 'whatigot');
                // const newPost: Post = JSON.parse(JSON.stringify(action.post));
                // newPost.images[action.imageId].voters.push(user.uid);
                return actionDownvotePostImageDone();
              }),
              catchError((err) => {
                console.error(err);
                return EMPTY;
              })
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
            const newPost: Post = JSON.parse(JSON.stringify(action.post));
            if (!newPost.images[action.imageId].voters) {
              newPost.images[action.imageId].voters = [];
            }
            // newPost.images[action.imageId].voters[user.uid);
            return this.postService.updatePost(newPost).pipe(
              map(() => {
                return actionUpvotePostImageDone({
                  imageId: action.imageId,
                  post: newPost,
                  userId: user.uid,
                });
              }),
              catchError((err) => {
                console.error(err);
                return EMPTY;
              })
            );
          })
        );
      })
    )
  );
  deletePost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actionDeletePost),
      switchMap((action) => {
        return this.authService.user$.pipe(
          switchMap((user) => {
            return this.postService.deletePost(action.post).pipe(
              map(() => {
                return actionDeletePostDone();
              }),
              catchError((err) => {
                console.error(err);
                return EMPTY;
              })
            );
          })
        );
      })
    )
  );
  reload$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actionCreatePostDone, actionUpvotePostImageDone, actionDownvotePostImageDone, actionDeletePost),
      map(() => {
        return actionGetAllPosts();
      }),
      catchError((err) => {
        console.error(err);
        return EMPTY;
      })
    )
  );
}
