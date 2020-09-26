import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PostsState } from '../reducers/reducers';

export const getPostsState = createFeatureSelector<PostsState>('posts');
export const selectPostsAsArray = createSelector(getPostsState, (state: PostsState) => {
  return Object.keys(state.entities).map((i) => state.entities[i]);
});

export const selectLastPost = createSelector(getPostsState, (state: PostsState) => {
  const lastId = Object.keys(state.entities).length;
  return state.entities[lastId];
});

export const selectIsLoading = createSelector(getPostsState, (state: PostsState) => {
  return state.loading;
});

export const selectNthPost = createSelector(getPostsState, (state: PostsState, props: { id: string }) => {
  return state.entities[props.id];
});
