import { initialState, postsReducer, PostsState } from './reducers';
import { actionCreatePostDone, actionDeleteNthPost, actionGetAllPostsDone } from '../actions/actions';
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
      const action = actionDeleteNthPost({ id: mockedPosts[0].postId });
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
      addedByUser: { email: 'someuser@fake.mail', uid: '49Pp18yPPsQcy22wje2ItLn1HL62' },
      additionDate: 1,
      images: [
        {
          url: 'someUrl1',
          voters: ['49Pp18yPPsQcy22wje2ItLn1HL62'],
        },
        {
          url: 'someUrl2',
          voters: ['DHA9Hj4kX3S08AxXRE2xqtBVVJ92'],
        },
      ],
      question: 'A dog or a cat?',
    },
  ];
});
