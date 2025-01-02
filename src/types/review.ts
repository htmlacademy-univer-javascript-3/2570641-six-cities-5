import { User } from '@/types/user';

export type Review = {
    id: string;
    date: string;
    user: User;
    comment: string;
    rating: number;
};

export type Reviews = Review[];
