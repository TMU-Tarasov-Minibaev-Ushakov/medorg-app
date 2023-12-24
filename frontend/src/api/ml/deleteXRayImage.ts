import { client } from "../client";

export const deleteXRayImage = async (imageId: string | number, authToken: string) => {
    return await client
        .delete(
            "/ml/x-ray/images/" + imageId,
            {
                headers: {
                    "authorization": authToken
                },
            }
        )
        .then((res) => res.data);
};
