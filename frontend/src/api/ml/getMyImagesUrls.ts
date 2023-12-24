import {client} from "../client";
import {AxiosResponse} from "axios";

type GetMyImagesUrlsInput = {
    authToken: string;
}
export const getMyImagesUrls = async ({ authToken }: GetMyImagesUrlsInput) => {
    return await client.get<any, AxiosResponse<{ images: { id: number, url: string }[]}>>('/ml/x-ray/my-images', {
        headers: {
            "authorization": authToken
        }
    }).then((res) => res.data);
}