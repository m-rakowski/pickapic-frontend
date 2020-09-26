import { Image } from './image';
import { User } from './user';

export interface Post {
  id?: string;
  additionDate?: number;
  question?: string;
  images: Image[];
  addedByUser?: User;
}
