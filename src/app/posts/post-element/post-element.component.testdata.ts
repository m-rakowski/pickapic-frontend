import { Post } from '../model/post';
import { MaterialModule } from '../../shared/material/material.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { createTranslateLoader } from '../../app.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';

export const onePost: Post = {
  images: {},
  question: 'batman or superman?',
  postId: '123213213123123',
  addedByUser: {
    displayName: 'user1',
    email: 'asdasd@asdsa.adasd',
    uid: 'adasdasd',
  },
  additionDate: '2021-01-01',
  imageIds: [],
};

export const postElementComponentImports = [
  MaterialModule,
  TranslateModule.forRoot({
    loader: {
      provide: TranslateLoader,
      useFactory: createTranslateLoader,
      deps: [HttpClient],
    },
  }),
  HttpClientModule,
];
