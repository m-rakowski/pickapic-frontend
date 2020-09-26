import { createAction, props } from '@ngrx/store';
import { Post } from '../../posts/model/post';

export const actionGetAllPosts = createAction('[Post] Get All Posts');
export const actionGetAllPostsDone = createAction('[Post] Get All Posts Done', props<{ posts: Post[] }>());

export const actionCreatePost = createAction('[Post] Add one post', props<{ post: Post }>());
export const actionCreatePostDone = createAction('[Post] Add one post done', props<{ post: Post }>());

export const actionDeleteNthPost = createAction('[Post] Delete Nth Post', props<{ id: string }>());
export const actionDeleteNthPostDone = createAction('[Post] Delete Nth Post Done', props<{ post: Post }>());

export const actionDeleteLastPost = createAction('[Post] Delete Last Post');
export const actionDeleteLastPostDone = createAction('[Post] Delete Last Post Done', props<{ removedId: string }>());
export const actionDeleteNthPostError = createAction('[Post] Delete Last Post Error');
export const actionClickPostImage = createAction('[Post] actionClickPostImage', props<{ i: number; post: Post }>());
export const actionClickPostImageDone = createAction('[Post] actionClickPostImageDone', props<{ i: number; post: Post; userId: string }>());
export const actionUpvotePostImage = createAction('[Post] actionUpvotePostImage', props<{ i: number; post: Post; userId: string }>());
export const actionDownvotePostImage = createAction('[Post] actionDownvotePostImage', props<{ i: number; post: Post; userId: string }>());
export const actionUpvotePostImageDone = createAction(
  '[Post] actionUpvotePostImageDone',
  props<{ i: number; post: Post; userId: string }>()
);
export const actionDownvotePostImageDone = createAction(
  '[Post] actionDownvotePostImageDone',
  props<{ i: number; post: Post; userId: string }>()
);
export const actionDownvotePostImageFailed = createAction('[Post] actionDownvotePostImageFailed');
