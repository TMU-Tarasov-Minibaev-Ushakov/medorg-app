import {client} from "../client";
import queryString from 'query-string';
import {Appointment} from "./getMyAppointments";

type GetDoctorsAppointmentsInput = {
  doctorId: number,
  fromDateString?: string,
  toDateString?: string
};

export const getDoctorsAppointments = async (params: GetDoctorsAppointmentsInput) => {
  const { doctorId, fromDateString, toDateString } = params;
  return await client
    .get<{ appointments: Appointment[] }>(`/appointments/doctors-appointments?${queryString.stringify({
      doctorId,
      from: fromDateString,
      to: toDateString
    })}`)
    .then((res) => res.data);
}