import { createReducer, on } from '@ngrx/store';

import { Post } from '../../posts/model/post';
import {
  actionCreatePost,
  actionCreatePostDone,
  actionDeleteLastPostDone,
  actionDeletePostDone,
  actionDownvotePostImageDone,
  actionGetAllPosts,
  actionGetAllPostsDone,
  actionUpvotePostImageDone,
} from '../actions/actions';

export interface PostsState {
  entities: { [id: string]: Post };
  loading: boolean;
}

export const initialState: PostsState = {
  entities: {},
  loading: false,
};

export const postsReducer = createReducer<PostsState>(
  initialState,
  on(actionGetAllPosts, (state, action) => {
    return { ...state, loading: true };
  }),
  on(actionGetAllPostsDone, (state, action) => {
    const newEntities = {};
    action.posts.forEach((post) => (newEntities[post.postId] = post));
    // const newEntities: { [id: string]: Post } = action.posts.reduce((acc, curr: Post) => (acc[curr.id] = curr), {});

    return { ...state, entities: newEntities, loading: false };
  }),
  on(actionCreatePost, (state, action) => {
    return { ...state, loading: true };
  }),
  on(actionCreatePostDone, (state, action) => {
    return { ...state, loading: false };
  }),
  on(actionDeleteLastPostDone, (state, action) => {
    const newState = JSON.parse(JSON.stringify(state));
    delete newState.entities[action.removedId];
    newState.loading = false;
    return newState;
  }),
  on(actionUpvotePostImageDone, (state, action) => {
    return { ...state };
  }),
  on(actionDownvotePostImageDone, (state, action) => {
    // const newState: PostsState = JSON.parse(JSON.stringify(state));
    // const i = newState.entities[action.post.postId].images[action.imageId].voters.indexOf(action.userId);
    // newState.entities[action.post.postId].images[action.imageId].voters.splice(i, 1);
    return { ...state, loading: false };
  }),
  on(actionDeletePostDone, (state, action) => {
    return { ...state };
  })
);
