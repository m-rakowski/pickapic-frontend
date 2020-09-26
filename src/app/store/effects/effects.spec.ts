import { provideMockActions } from '@ngrx/effects/testing';
import { TestBed } from '@angular/core/testing';
import { cold, hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';
import { PostEffects } from './effects';
import { PostService } from '../../posts/services/post.service';
import { Post } from '../../posts/model/post';
import { actionGetAllPosts, actionGetAllPostsDone } from '../actions/actions';
import { Action } from '@ngrx/store';

describe('UserEffects', () => {
  let actions$: Observable<Action>;
  let effects: PostEffects;
  let postService: PostService;

  beforeEach(() => {
    actions$ = new Observable<Action>();

    TestBed.configureTestingModule({
      providers: [
        PostEffects,
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
    fit('should return an actionGetAllPostsDone action', () => {
      const mockedPosts: Post[] = [
        {
          id: '1',
          title: 'First post title',
          content: 'Fist post content',
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
