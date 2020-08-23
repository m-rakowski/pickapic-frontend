import { createReducer, on } from '@ngrx/store';
import { actionCreatePostDone, actionDeleteLastPost, actionDeleteNthPost, actionGetAllPostsDone } from '../actions';
import { Post } from '../../model/post';

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
  on(actionGetAllPostsDone, (state, action) => {
    console.log('actionGetAllPostsDone', state, action);
    const newEntities: { [id: number]: Post } = {};
    action.posts.forEach(post => newEntities[post.id] = post);
    const newState: PostsState = {
      loading: false,
      entities: newEntities
    };

    console.log('newState', newState);
    return newState;
  }),

  on(actionCreatePostDone, (state, action) => {
    console.log('actionCreatePostDone', state, action);
    const newState = JSON.parse(JSON.stringify(state));
    newState.entities[action.post.id] = action.post;

    console.log('newState', newState);
    return newState;
  }),

  on(actionDeleteNthPost, (state, action) => {
    console.log('actionDeleteLastPost', state, action);
    const newState = JSON.parse(JSON.stringify(state));
    delete newState.entities[action.id];

    console.log('newState', newState);
    return newState;
  })
);
