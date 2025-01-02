import { User } from '@/types/user';

export interface Comment {
  id: string;
  date: string;
  comment: string;
  user: User;
  rating: number;
}


export type Comments = Comment[];
