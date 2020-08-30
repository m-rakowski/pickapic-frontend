import { initialState, postsReducer, PostsState } from './index';
import {
  actionCreatePostDone,
  actionDeleteNthPost,
  actionGetAllPostsDone,
} from '../actions';
import { Post } from '../../posts/model/post';

describe('Posts Reducer', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      const action = { type: 'NOOP' } as any;
      const result = postsReducer(undefined, action);

      expect(result).toBe(initialState);
    });
  });

  describe('actionGetAllPostsDone', () => {
    it('should set state to include all posts and set loading to false', () => {
      const action = actionGetAllPostsDone({ posts: mockedPosts });
      const result = postsReducer(initialState, action);

      const newState: PostsState = {
        entities: { 1: mockedPosts[0] },
        loading: false,
      };
      expect(result).toEqual(newState);
    });
  });

  describe('actionCreatePostDone', () => {
    it('should append state to include the new post and set loading to false', () => {
      const action = actionCreatePostDone({ post: mockedPosts[0] });
      const result = postsReducer(initialState, action);

      const newState: PostsState = {
        entities: { 1: mockedPosts[0] },
        loading: false,
      };
      expect(result).toEqual(newState);
    });
  });

  describe('actionDeleteNthPost', () => {
    it('should remove one post from state and set loading to false', () => {
      const stateWithOnePost: PostsState = {
        entities: { 1: mockedPosts[0] },
        loading: false,
      };
      const action = actionDeleteNthPost({ id: mockedPosts[0].id });
      const result = postsReducer(stateWithOnePost, action);

      const newState: PostsState = {
        entities: {},
        loading: false,
      };
      expect(result).toEqual(newState);
    });
  });

  const mockedPosts: Post[] = [
    {
      id: 1,
      title: 'First post',
      content: 'Content',
    },
  ];
});
