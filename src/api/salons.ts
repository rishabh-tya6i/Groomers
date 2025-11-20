import { get } from './client';

export type Salon = {
  id: number;
  name: string;
  description: string;
  city: string;
  contactPhone: string;
  contactEmail: string;
  imageUrl?: string;
};

export type ServiceEntity = {
  id: number;
  name: string;
  description: string;
  priceCents: number;
  durationMinutes: number;
  imageUrl?: string;
};

export const fetchSalons = () => get<Salon[]>('/api/salons');
export const fetchSalonServices = (id: number) => get<ServiceEntity[]>(`/api/salons/${id}/services`);
