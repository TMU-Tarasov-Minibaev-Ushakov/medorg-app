import {client} from "../client";

type CreateAppointmentInput = {
  doctorId: number,
  date: string
  hour: number
}

export const createAppointment = async ({ doctorId, date, hour }: CreateAppointmentInput) => {
  return client.post('appointments/create', {
    doctorId,
    date,
    hour
  }).then((res) => res.data);
}