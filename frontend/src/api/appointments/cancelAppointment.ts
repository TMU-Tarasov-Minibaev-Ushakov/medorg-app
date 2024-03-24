import {client} from "../client";
import queryString from 'query-string';
import {Appointment} from "./getMyAppointments";


export const cancelAppointment = async (id: number) => {
  return await client
    .post<{ message: string }>(`/appointments/cancel/${id}`)
    .then((res) => res.data);
}