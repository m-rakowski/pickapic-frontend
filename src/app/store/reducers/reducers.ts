import { createReducer, on } from '@ngrx/store';

import { Post } from '../../posts/model/post';
import {
  actionCreatePostDone,
  actionDeleteLastPostDone,
  actionDownvotePostImageDone,
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
  // on(actionGetAllPosts, (state) => {
  //   return { ...state, loading: true };
  // }),
  on(actionGetAllPostsDone, (state, action) => {
    console.log('actionGetAllPostsDone', state, action);
    const newEntities: { [id: number]: Post } = {};
    action.posts.forEach((post) => (newEntities[post.id] = post));
    const newState: PostsState = {
      loading: false,
      entities: newEntities,
    };
    newState.loading = false;
    console.log('newState', newState);
    return newState;
  }),
  // on(actionCreatePost, (state, action) => {
  //   return { ...state, loading: true };
  // }),
  on(actionCreatePostDone, (state, action) => {
    console.log('actionCreatePostDone', state, action);
    const newState = JSON.parse(JSON.stringify(state));
    newState.entities[action.post.id] = action.post;
    newState.loading = false;
    console.log('newState', newState);
    return newState;
  }),
  on(actionDeleteLastPostDone, (state, action) => {
    console.log('actionDeleteLastPostDone', state, action);
    const newState = JSON.parse(JSON.stringify(state));

    console.log('actionDeleteLastPostDone newState', newState);
    delete newState.entities[action.removedId];
    newState.loading = false;
    console.log('actionDeleteLastPostDone newState AFTER deleting', newState);
    return newState;
  }),

  on(actionUpvotePostImageDone, (state, action) => {
    const newState = JSON.parse(JSON.stringify(state));
    return newState;
  }),

  on(actionDownvotePostImageDone, (state, action) => {
    const newState: PostsState = JSON.parse(JSON.stringify(state));
    const i = newState.entities[action.post.id].images[action.i].voters.indexOf(action.userId);
    newState.entities[action.post.id].images[action.i].voters.splice(i, 1);
    return newState;
  })
);
