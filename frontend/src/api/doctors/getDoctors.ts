import {client} from "../client";

export type Doctor = {
  id: number,
  userId: number,
  user: {
    id: number,
    email: string
  }
};

export type GetDoctorsResponse = {
  doctors: Doctor[]
};

export const getDoctors = async () => {
    return client.get<GetDoctorsResponse>('/users/doctors')
      .then((res) => res.data);
};