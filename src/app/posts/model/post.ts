import { Image } from './image';
import { User } from './user';

export interface Post {
  postId?: string;
  additionDate?: any;
  question?: string;
  images?: { [key: number]: Image };
  // images?: Image[];
  addedByUser?: User;
  imageIds?: string[];
}
