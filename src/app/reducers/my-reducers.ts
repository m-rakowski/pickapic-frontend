import { createReducer, on } from '@ngrx/store';
import { Post } from '../model/post';
import { createPostDone, getAllPostsDone } from '../actions/my-actions';

export const postsReducer = createReducer<Post[]>(
  [],
  on(getAllPostsDone, (state, action) => {
    console.log('on get all posts done ', state, action);
    return action.posts;
  }),
  on(createPostDone, (state, action) => {
    console.log('createPostDone', state, action);
    return state.concat(action.post);
  })
);
