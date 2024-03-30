export type CreateAppointmentInput = {
  date: string;
  hour: number;
  doctorId: number;
  patientId: number;
};

export enum AppointmentStatus {
  PLANNED = "planned",
  CANCELLED = "cancelled",
  COMPLETED = "completed",
}
