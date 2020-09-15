import { firestore } from 'firebase';
export interface Post {
  id: string;
  created?: firestore.Timestamp;
  question: string;
  title1: string;
  title2: string;
  description1: string;
  description2: string;
  photo1Url: string;
  photo2Url: string;
}
