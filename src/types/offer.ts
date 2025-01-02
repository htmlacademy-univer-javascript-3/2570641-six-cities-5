import { City } from '@/types/city';
import { Location } from '@/types/location';

export type Offer = {
    id: string;
    title: string;
    type: string;
    price: number;
    city: City;
    location: Location;
    isFavorite: boolean;
    isPremium: boolean;
    rating: number;
    previewImage: string;
};

export type Offers = Offer[];
