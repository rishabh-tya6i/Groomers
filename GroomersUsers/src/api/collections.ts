import { get } from './client';

export type Salon = {
  id: number;
  name: string;
  description: string;
  city: string;
  contactPhone: string;
  contactEmail: string;
  imageUrl?: string;
  latitude: number;
  longitude: number;
  services: string[];
};

export const getRecommendedSalons = () => get<Salon[]>('/api/collections/recommended');
export const getNewSalons = () => get<Salon[]>('/api/collections/new');
export const getTrendingSalons = () => get<Salon[]>('/api/collections/trending');
