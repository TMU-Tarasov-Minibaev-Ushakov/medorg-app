import {client} from "../client";

export type Doctor = {
  id: number,
  userId: number,
  user: {
    id: number,
    email: string
  }
};

export type GetDoctorResponse = {
  doctor: Doctor
};

export const getDoctorByUserId = async (userId: number) => {
    return client.get<GetDoctorResponse>('/users/doctor-by-user-id/' + userId)
      .then((res) => res.data);
};