import { get, post, del, put } from './client';

export type Appointment = {
  id: number;
  salonId: number;
  serviceId: number;
  startTime: string;
  status: string;
};

export type CreateAppointmentRequest = {
  salonId: number;
  serviceId: number;
  startTime: string;
  slotId?: number | null;
};

export const createAppointment = (data: CreateAppointmentRequest) => post<Appointment>('/api/appointments', data);
export const myBookings = () => get<Appointment[]>('/api/appointments/my-bookings');
export const cancelAppointment = (id: number) => del<void>(`/api/appointments/${id}`);
export const rescheduleAppointment = (id: number, newStartTime: string, newSlotId?: number | null) =>
  put<Appointment>(`/api/appointments/${id}/reschedule`, { newStartTime, newSlotId });
