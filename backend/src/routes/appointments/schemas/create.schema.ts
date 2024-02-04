import { z } from "zod";

export const createAppointmentSchema = z.object({
    body: z.object({
        date: z
            .string({
                required_error: "Date is required",
            })
            .refine((date) => {
                const dateRegex = /^\d{2}-\d{2}-\d{4}$/;

                if (!dateRegex.test(date)) {
                    return false;
                }

                const dateParts = date.split("-").map(Number);
                const day = dateParts[0];
                const month = dateParts[1];
                const year = dateParts[2];

                return !(day < 1 || day > 31 || month < 1 || month > 12 || year < 1000 || year > 9999);

            }, "Invalid date format. Please use DD-MM-YYYY and make sure the date is valid"),
        hour: z
            .number({
                required_error: "Password is required",
            })
            .int()
            .min(0, "Hour must be a number between 0 and 23")
            .max(23, "Hour must be a number between 0 and 23"),
    }),
});
