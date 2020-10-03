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
      addedByUser: { email: 'firstUser@fake.mail', uid: '49Pp18yPPsQcy22wje2ItLn1HL62' },
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
    {
      addedByUser: { email: 'secondUser@fake.mail', uid: '49Pp18yPPsQcy22wje2ItLn1HL62' },
      additionDate: 1,
      images: [
        {
          url: 'someUrl1',
          voters: [],
        },
        {
          url: 'someUrl2',
          voters: ['DHA9Hj4kX3S08AxXRE2xqtBVVJ92'],
        },
      ],
      question: 'Big or small?',
    },
  ];

  const emptyPostsState: PostsState = {
    loading: false,
    entities: {},
  };

  const postsState: PostsState = {
    loading: true,
    entities: {
      firstPostId: {
        addedByUser: { email: 'firstUser@fake.mail', uid: '49Pp18yPPsQcy22wje2ItLn1HL62' },
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
      secondPostId: {
        addedByUser: { email: 'secondUser@fake.mail', uid: '49Pp18yPPsQcy22wje2ItLn1HL62' },
        additionDate: 1,
        images: [
          {
            url: 'someUrl3',
            voters: [],
          },
          {
            url: 'someUrl4',
            voters: ['DHA9Hj4kX3S08AxXRE2xqtBVVJ92'],
          },
        ],
        question: 'Big or small?',
      },
    },
  };
});
