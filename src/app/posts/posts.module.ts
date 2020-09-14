import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsListComponent } from './posts-list/posts-list.component';
import { PostsRoutingModule } from './posts-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../shared/material/material.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [PostsListComponent],
  imports: [CommonModule, PostsRoutingModule, ReactiveFormsModule, MaterialModule, TranslateModule.forChild()],
})
export class PostsModule {}
