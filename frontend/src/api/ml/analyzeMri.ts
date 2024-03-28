import {client} from "../client";
import {AxiosResponse} from "axios";

type AnalyzeMRI = {
    authToken: string;
    imageId: number;
}

export type AnalyzeMRIResponse = {
    processed_image: string;
};

export const analyzeMRI = async ({ authToken, imageId }: AnalyzeMRI) => {
    return await client.get<any, AxiosResponse<AnalyzeMRIResponse>>('/ml/mri/analyze/' + imageId).then((res) => res.data);
}