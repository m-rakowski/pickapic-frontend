import { TestBed } from '@angular/core/testing';
import { PostService } from './post.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Post } from '../model/post';

describe('PostService', () => {
  let service: PostService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(PostService);
    httpMock = TestBed.inject(HttpTestingController);

  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should return 2 posts', () => {
    const postsReturnedByApi: Post [] = [
      {
        id: 1,
        title: 'First post',
        content: 'Famous Blogger'
      },
      {
        id: 2,
        title: 'Second post',
        content: 'Famous Blogger'
      }
    ];

    service.getAll().subscribe(postsReturnedByService => {
      expect(postsReturnedByService.length).toBe(2);
      expect(postsReturnedByService).toEqual(postsReturnedByApi);
    });

    const req = httpMock.expectOne(`http://localhost:3000/posts`);
    req.flush(postsReturnedByApi);
    expect(req.request.method).toBe('GET');
  });

  it('should add 1 post', () => {
    const expectedPost: Post = {
      id: 3,
      title: 'Third post',
      content: 'Famous Blogger'
    };

    service.createPost(expectedPost).subscribe(post => {
      expect(post).toBe(expectedPost);
    });

    const req = httpMock.expectOne(`http://localhost:3000/posts`);
    req.flush(expectedPost);
    expect(req.request.method).toBe('POST');
  });

  it('should delete one post', () => {
    const expectedPost: Post = {
      id: 3,
      title: 'Third post',
      content: 'Famous Blogger'
    };

    service.deletePostById(3).subscribe(post => {
      expect(post).toBe(expectedPost);
    });

    const req = httpMock.expectOne(`http://localhost:3000/posts/3`);
    req.flush(expectedPost);
    expect(req.request.method).toBe('DELETE');
  });
});
