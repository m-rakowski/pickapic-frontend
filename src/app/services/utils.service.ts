import { Injectable } from '@angular/core';
import { User } from '../posts/model/user';
import { Post } from '../posts/model/post';
import { Image } from '../posts/model/image';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  constructor() {}

  hasUserVotedForPost(user: User, post: Post): boolean {
    if (!post.images) {
      return false;
    }
    return Object.keys(post.images).some((imageId) =>
      this.hasUserVotedForImage(user.uid, post.images[imageId])
    );
  }

  hasUserVotedForImage(userId: string, image: Image): boolean {
    if (!image.voters) {
      return false;
    }
    return Object.keys(image.voters).some((voteId) => image.voters[voteId] === userId);
  }

  hasUserVotedForImageInPost(user: User, post: Post, imageId: string) {
    return this.hasUserVotedForImage(user.uid, post.images[imageId]);
  }
}
