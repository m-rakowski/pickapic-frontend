import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { PostEffects } from './store/effects';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { postsReducer } from './store/reducers';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    ReactiveFormsModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({posts: postsReducer}),
    StoreDevtoolsModule.instrument({maxAge: 10}),
    EffectsModule.forRoot([PostEffects])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}

