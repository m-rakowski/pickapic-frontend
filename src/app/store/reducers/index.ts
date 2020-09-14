import { createReducer, on } from '@ngrx/store';
import {
  actionCreatePost,
  actionCreatePostDone,
  actionDeleteLastPost,
  actionDeleteLastPostDone,
  actionDeleteNthPostError,
  actionGetAllPosts,
  actionGetAllPostsDone,
} from '../actions';
import { Post } from '../../posts/model/post';

export interface PostsState {
  entities: { [id: number]: Post };
  loading: boolean;
}

export const initialState: PostsState = {
  entities: {},
  loading: false,
};

export const postsReducer = createReducer<PostsState>(
  initialState,
  on(actionGetAllPosts, (state) => {
    return { ...state, loading: true };
  }),
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
  on(actionCreatePost, (state, action) => {
    return { ...state, loading: true };
  }),
  on(actionCreatePostDone, (state, action) => {
    console.log('actionCreatePostDone', state, action);
    const newState = JSON.parse(JSON.stringify(state));
    newState.entities[action.post.id] = action.post;
    newState.loading = false;
    console.log('newState', newState);
    return newState;
  }),
  on(actionDeleteLastPost, (state) => {
    return { ...state, loading: true };
  }),
  on(actionDeleteNthPostError, (state) => {
    return { ...state, loading: false };
  }),
  on(actionDeleteLastPostDone, (state, action) => {
    console.log('actionDeleteLastPostDone', state, action);
    const newState = JSON.parse(JSON.stringify(state));

    console.log('actionDeleteLastPostDone newState', newState);
    delete newState.entities[action.removedId];
    newState.loading = false;
    console.log('actionDeleteLastPostDone newState AFTER deleting', newState);
    return newState;
  })
);
