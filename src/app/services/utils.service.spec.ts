import { UtilsService } from './utils.service';
import { TestBed } from '@angular/core/testing';
import { User } from '../posts/model/user';
import { Post } from '../posts/model/post';
import { Image } from '../posts/model/image';

describe('UtilsService', () => {
  let service: UtilsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UtilsService);
  });

  describe('userHasAlreadyVoted', () => {
    it('should return true if user upvoted one photo', () => {
      const user: User = { displayName: 'John', email: 'john@doe', uid: '100' };
      const post: Post = { postId: '1', question: 'question', images: [{ url: 'url', voters: ['100'] }] };
      const hasVoted = service.hasUserVotedForPost(user, post);
      expect(hasVoted).toBe(true);
    });

    it('should return true if user upvoted two photos', () => {
      const user: User = { displayName: 'John', email: 'john@doe', uid: '100' };
      const post: Post = {
        postId: '1',
        question: 'question',
        images: [
          { url: 'url', voters: ['100'] },
          { url: 'url', voters: ['100'] },
        ],
      };
      const hasVoted = service.hasUserVotedForPost(user, post);
      expect(hasVoted).toBe(true);
    });

    it('should return false if user did not upvote any photo', () => {
      const user: User = { displayName: 'John', email: 'john@doe', uid: '100' };
      const post: Post = { postId: '1', question: 'question', images: [{ url: 'url', voters: ['101'] }] };
      const hasVoted = service.hasUserVotedForPost(user, post);
      expect(hasVoted).toBe(false);
    });

    it('should return false if no images', () => {
      const user: User = { displayName: 'John', email: 'john@doe', uid: '100' };
      const post: any = { id: '1', question: 'question' };
      const hasVoted = service.hasUserVotedForPost(user, post);
      expect(hasVoted).toBe(false);
    });

    it('should return false if no votes', () => {
      const user: User = { displayName: 'John', email: 'john@doe', uid: '100' };
      const post: any = { id: '1', question: 'question', images: [{ url: 'url' }] };
      const hasVoted = service.hasUserVotedForPost(user, post);
      expect(hasVoted).toBe(false);
    });
  });

  describe('hasUserVotedForThisImage', () => {
    it("should return true when image contains user's id", () => {
      const user: User = { displayName: 'John', email: 'john@doe', uid: '100' };
      const image: Image = { url: 'url', voters: ['100'] };
      expect(service.hasUserVotedForImage(user, image)).toEqual(true);
    });
    it("should return false when image contains user's id", () => {
      const user: User = { displayName: 'John', email: 'john@doe', uid: '100' };
      const image: Image = { url: 'url', voters: ['101'] };
      expect(service.hasUserVotedForImage(user, image)).toEqual(false);
    });
    it("should return false when image contains user's id", () => {
      const user: User = { displayName: 'John', email: 'john@doe', uid: '100' };
      const image: Image = { url: 'url', voters: [] };
      expect(service.hasUserVotedForImage(user, image)).toEqual(false);
    });
  });
});
