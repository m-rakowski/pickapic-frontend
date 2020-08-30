import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsListComponent } from './posts-list/posts-list.component';
import { PostsRoutingModule } from './posts-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [PostsListComponent],
  imports: [CommonModule, PostsRoutingModule, ReactiveFormsModule],
})
export class PostsModule {}
