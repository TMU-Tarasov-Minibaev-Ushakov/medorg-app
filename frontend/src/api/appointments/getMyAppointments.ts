import {client} from "../client";

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

export const getMyAppointments = async () => {
  return await client
    .get<{ appointments: Appointment[] }>("/appointments/my-appointments")
    .then((res) => res.data);
}