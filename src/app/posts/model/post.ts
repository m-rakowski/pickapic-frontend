import { firestore } from 'firebase';
export interface Post {
  id: string;
  title: string;
  content: string;
  created?: firestore.Timestamp;
}
