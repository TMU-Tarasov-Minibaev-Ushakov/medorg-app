import { client } from "../client";

export const uploadMriImage = async (file: File, authToken: string) => {
    const formData = new FormData();
    formData.append("image", file);

    return await client
        .post(
            "/ml/mri/images",
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "authorization": authToken
                },
            }
        )
        .then((res) => res.data);
};
