import { createAction, props } from '@ngrx/store';
import { Post } from '../model/post';


export const getAllPosts = createAction('[Post] Get All Posts');
export const getAllPostsDone = createAction('[Post] Get All Posts Done', props<{ posts: Post[] }>());
export const createPost = createAction('[Post] Create Post', props<{ post: Post }>());
export const createPostDone = createAction('[Post] Create Post Done', props<{ post: Post }>());
