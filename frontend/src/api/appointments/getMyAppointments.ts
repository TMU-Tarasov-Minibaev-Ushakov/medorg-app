import {client} from "../client";
import queryString from 'query-string';

export type Appointment = {
  id: number,
  date: string,
  hour: number,
  doctorId: number,
  status: 'planned' | 'completed' | 'canceled',
  doctor: {
    id: number,
    userId: number,
    user: {
      id: number,
      email: string
    }
  }
}

type GetMyAppointmentsInput = {
  fromDateString?: string,
  toDateString?: string
};

export const getMyAppointments = async (params: GetMyAppointmentsInput) => {
  const { fromDateString, toDateString } = params;
  return await client
    .get<{ appointments: Appointment[] }>(`/appointments/my-appointments?${queryString.stringify({
      from: fromDateString,
      to: toDateString
    })}`)
    .then((res) => res.data);
}