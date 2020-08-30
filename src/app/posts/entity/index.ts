// import { Post } from '../model/post';
// import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
// import { Action, createReducer } from '@ngrx/store';
// import { adapter } from '../adapter';
//
//
//
//
//
// export function selectPostId(a: Post): number {
//   return a.id;
// }
//
// export function sortByTitle(a: Post, b: Post): number {
//   return a.title.localeCompare(b.title);
// }
//
//
// export interface State extends EntityState<Post> {
//   // additional entities state properties
//   selectedPostId: number | null;
// }
//
// export const initialState: State = adapter.getInitialState({
//   // additional entity state properties
//   selectedPostId: null,
// });
//
// const PostReducer = createReducer(initialState);
//
// export function reducer(state: State | undefined, action: Action) {
//   return PostReducer(state, action);
// }
