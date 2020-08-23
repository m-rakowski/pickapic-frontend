import { createAction, props } from '@ngrx/store';
import { Post } from '../../model/post';


export const actionGetAllPosts = createAction('[Post] Get All Posts');
export const actionGetAllPostsDone = createAction('[Post] Get All Posts Done', props<{ posts: Post[] }>());

export const actionCreatePost = createAction('[Post] Add one post', props<{ post: Post }>());
export const actionCreatePostDone = createAction('[Post] Add one post done', props<{ post: Post }>());

export const actionDeleteNthPost = createAction('[Post] Delete Nth Post', props<{ id: number }>());
export const actionDeleteNthPostDone = createAction('[Post] Delete Nth Post Done', props<{ post: Post }>());

export const actionDeleteLastPost = createAction('[Post] Delete Last Post');
export const actionDeleteLastPostDone = createAction('[Post] Delete Last Post Done', props<{ post: Post }>());
