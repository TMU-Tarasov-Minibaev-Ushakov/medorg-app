import { z } from "zod";

export const createAppointmentSchema = z.object({
    body: z.object({
        date: z
            .coerce
            .date({
                required_error: "Date is required",
            }),
        hour: z
            .coerce
            .number({
                required_error: "Hour is required"
            })
            .int()
            .min(0, "Hour must be a number between 0 and 23")
            .max(23, "Hour must be a number between 0 and 23"),
        doctorId: z
            .coerce
            .number({
                required_error: "Doctor ID is required"
            })
            .int()
            .positive("Doctor ID must be a positive number"),
        patientId: z
            .coerce
            .number({
                required_error: "Patient ID is required"
            })
            .int()
            .positive("Patient ID must be a positive number"),
    }),
});
