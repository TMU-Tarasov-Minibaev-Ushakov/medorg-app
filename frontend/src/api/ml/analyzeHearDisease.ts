import {client} from "../client";
import {AxiosResponse} from "axios";
import {HeartDiseaseData} from "../../features/HeartDiseasePage/HeartDiseasePage";

export const analyzeHearDisease = async (jsonData: HeartDiseaseData) => {
    return await client.post<any, AxiosResponse<{ result: (0|1)[] }>>('/ml/heart-disease/analyze/', {
        ...jsonData
    }, {
        headers: {
            'Content-Type': 'application/json',
            'authorization': localStorage.getItem('authToken') ?? ''
        }

    })
      .then((res) => res.data.result[0]);
}