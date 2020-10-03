import { Component, OnInit } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { Post } from '../model/post';
import { Store } from '@ngrx/store';
import { PostsState } from '../../store/reducers/reducers';
import { UtilsService } from '../../services/utils.service';
import { PostService } from '../services/post.service';
import { map } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss'],
})
export class PostsListComponent implements OnInit {
  posts$: Observable<Post[]>;
  isLoading$: Observable<boolean>;

  constructor(
    private store: Store<PostsState>,
    public utilsService: UtilsService,
    private postService: PostService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.posts$ = this.postService.getAll();
    this.getAllPosts();
  }

  createPost($event: { post: Post; files: File[] }): void {
    this.postService.createPostWithFiles($event.post, $event.files).subscribe();
  }

  getAllPosts() {
    this.posts$ = this.postService.getAll();
  }

  clickNthImage(imageId: string, postId: string): void {
    // this.authService.user$.subscribe((user) => {
    //   this.postService.upvoteOrDownvote(user, po)
    // });
  }

  deletePost(post: Post) {
    this.postService.deletePostById(post.postId).subscribe();
  }

  upvoteImage($event: { postId: string; imageId: string }): void {
    this.authService.user$
      .pipe(
        map((user) => {
          return this.postService.addVote($event.postId, $event.imageId, user.uid);
        })
      )
      .subscribe();
  }

  downvoteImageWithPostIdAndImageId($event: { postId: string; imageId: string }): void {
    this.authService.user$
      .pipe(
        map((user) => {
          this.postService.remoteVote($event.postId, $event.imageId, user.uid);
          // let index = -1;
          // if ($event.post.images[$event.n].voters) {
          // index = $event.post.images[$event.n].voters.lastIndexOf(user.uid);
          // }
          return EMPTY;
          // return this.postService.remoteVote($event.post.postId, $event.imageId, index);
        })
      )
      .subscribe();
  }

  downvoteOrUpvote($event: { post: Post; imageId: string }) {
    this.postService.upvoteOrDownvote($event.post, $event.imageId);
  }
}
