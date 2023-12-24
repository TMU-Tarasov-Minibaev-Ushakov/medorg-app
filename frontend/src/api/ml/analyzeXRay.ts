import {client} from "../client";
import {AxiosResponse} from "axios";

type AnalyzeXRay = {
    authToken: string;
    imageId: number;
}

export type AnalyzeXRayResponse = {
    predicted_class: number;
    processed_image: string;
};

export const analyzeXRay = async ({ authToken, imageId }: AnalyzeXRay) => {
    return await client.get<any, AxiosResponse<AnalyzeXRayResponse>>('/ml/x-ray/analyze/' + imageId, {
        headers: {
            "authorization": authToken
        }
    }).then((res) => res.data);
}