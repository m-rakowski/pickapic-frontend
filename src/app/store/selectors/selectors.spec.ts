import { Post } from '../../posts/model/post';
import { selectLastPost, selectPostsAsArray } from './selectors';
import { PostsState } from '../reducers/reducers';

describe('Posts selectors', () => {
  describe('selectPostsAsArray', () => {
    it('should return posts as an array', () => {
      expect(selectPostsAsArray.projector(postsState)).toEqual(postsAsArray);
    });

    it('should return an empty array', () => {
      expect(selectPostsAsArray.projector(emptyPostsState)).toEqual([]);
    });
  });

  describe('getLastPost', () => {
    it('should return the last post', () => {
      expect(selectLastPost.projector(postsState)).toEqual({
        id: 2,
        content: 'Second post',
        title: 'Title 2',
      });
    });

    it('should return {} when postsState is empty', () => {
      expect(selectLastPost.projector(emptyPostsState)).toEqual(undefined);
    });
  });

  const postsAsArray: Post[] = [
    {
      id: 1,
      content: 'First post',
      title: 'Title 1',
    },
    {
      id: 2,
      content: 'Second post',
      title: 'Title 2',
    },
  ];

  const emptyPostsState: PostsState = {
    loading: false,
    entities: {},
  };

  const postsState: PostsState = {
    loading: true,
    entities: {
      1: {
        id: 1,
        content: 'First post',
        title: 'Title 1',
      },
      2: {
        id: 2,
        content: 'Second post',
        title: 'Title 2',
      },
    },
  };
});
