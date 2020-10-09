import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Post } from '../model/post';
import { Image } from '../model/image';

@Component({
  selector: 'app-post-element',
  templateUrl: './post-element.component.html',
  styleUrls: ['./post-element.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostElementComponent implements OnInit {
  constructor() {}

  @Input()
  post: Post;

  @Output()
  clickedImageWithId = new EventEmitter<{ post: Post; imageId: string }>();

  @Output()
  upvoteImage = new EventEmitter<{ postId: string; imageId: string }>();

  @Output()
  downVoteImage = new EventEmitter<{ postId: string; imageId: string }>();

  @Output()
  delete = new EventEmitter<Post>();

  ngOnInit(): void {}

  getVoteCount(post: Post, imageId: string): number {
    let count = 0;
    if (post.images[imageId].voters) {
      Object.values(post.images[imageId].voters).forEach((vote) => {
        if (vote) {
          count += 1;
        }
      });
    }
    return count;
  }

  getImagesAsList(post: Post): Image[] {
    if (!post || !post.images) {
      return [];
    } else {
      return Object.keys(post.images).map((key) => ({ ...post.images[key], imageId: key }));
    }
  }
}
