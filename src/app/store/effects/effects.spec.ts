import { provideMockActions } from '@ngrx/effects/testing';
import { TestBed } from '@angular/core/testing';
import { cold, hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';
import { PostEffects } from './effects';
import { PostService } from '../../posts/services/post.service';
import { Post } from '../../posts/model/post';
import { actionGetAllPosts, actionGetAllPostsDone } from '../actions/actions';
import { Action } from '@ngrx/store';
import { User } from '../../posts/model/user';

describe('UserEffects', () => {
  let actions$: Observable<Action>;
  let effects: PostEffects;
  let postService: PostService;

  beforeEach(() => {
    actions$ = new Observable<Action>();

    TestBed.configureTestingModule({
      providers: [
        provideMockActions(() => actions$),
        {
          provide: PostService,
          useValue: {
            getAll: jest.fn(),
            createPost: jest.fn(),
            deletePostById: jest.fn(),
          },
        },
      ],
    });

    effects = TestBed.inject(PostEffects);
    postService = TestBed.inject(PostService);
  });

  describe('actionGetAllPosts', () => {
    it('should return an actionGetAllPostsDone action', () => {
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
      const action = actionGetAllPosts();
      const outcome = actionGetAllPostsDone({ posts: mockedPosts });

      actions$ = hot('-a', { a: action });
      const response = cold('-a|', { a: mockedPosts });
      const expected = cold('--b', { b: outcome });
      postService.getAll = jest.fn(() => response);

      expect(effects.getAllPosts$).toBeObservable(expected);
    });
  });
});
