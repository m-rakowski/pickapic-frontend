import { Component, OnInit } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { Post } from '../model/post';
import { Store } from '@ngrx/store';
import { PostsState } from '../../store/reducers/reducers';
import { UtilsService } from '../../services/utils.service';
import { PostService } from '../services/post.service';
import { map, switchMap } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss'],
})
export class PostsListComponent implements OnInit {
  posts$: Observable<Post[]>;
  isLoading$: Observable<boolean>;
  profileForm: FormGroup;

  constructor(
    private store: Store<PostsState>,
    public utilsService: UtilsService,
    private postService: PostService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.profileForm = new FormGroup({ a: new FormControl() });
    this.posts$ = this.postService.getAll();
    this.getAllPosts();
  }

  createPost($event: { post: Post; files: File[] }): void {
    this.postService
      .createPostWithFiles($event.post, $event.files)
      .subscribe(() => (this.posts$ = this.postService.getAll()));
  }

  getAllPosts() {
    this.posts$ = this.postService.getAll();
  }

  deletePost(post: Post) {
    this.postService.removePost(post).subscribe();
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
          return EMPTY;
        })
      )
      .subscribe();
  }

  downvoteOrUpvote($event: { post: Post; imageId: string }) {
    this.authService.user$
      .pipe(
        switchMap((user) => {
          if (!this.utilsService.hasUserVotedForPost(user, $event.post)) {
            return this.postService.addVote($event.post.postId, $event.imageId, user.uid);
          } else {
            if (this.utilsService.hasUserVotedForImageInPost(user, $event.post, $event.imageId)) {
              return this.postService.remoteVote($event.post.postId, $event.imageId, user.uid);
            }
          }
        })
      )
      .subscribe();
  }
}
