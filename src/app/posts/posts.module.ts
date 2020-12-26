import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsListComponent } from './posts-list/posts-list.component';
import { PostsRoutingModule } from './posts-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../shared/material/material.module';
import { TranslateModule } from '@ngx-translate/core';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { PostElementComponent } from './post-element/post-element.component';
import { PostSubmissionFormComponent } from './post-submission-form/post-submission-form.component';
import { RestPostService } from './services/rest-post.service';
import { PostService } from './services/post.service';
import { FirebasePostService } from './services/firebase-post.service';

@NgModule({
  declarations: [PostsListComponent, PostElementComponent, PostSubmissionFormComponent],
  imports: [
    CommonModule,
    PostsRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    TranslateModule.forChild(),
    NgxDropzoneModule,
  ],
  providers: [
    {
      provide: PostService,
      useClass: RestPostService, // <--- Defining the swappable implementation.
    },
  ],
})
export class PostsModule {}
