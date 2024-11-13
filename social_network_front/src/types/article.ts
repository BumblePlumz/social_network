import { User } from './user';

export interface Article {
  id: string;
  title: string;
  content: string;
  authorID: string;
  author: User;
  comment: [];
  createdAt: string;
  updatedAt: string;
  isOwner: boolean;
}