import {env} from "../../../env";
import FormData from "form-data";
import {request} from "http";
import {loginSchema} from "../../auth/schemas/login.schema";

type MRIAnalysisResponse = {
    processed_image: string;
};

export type HeartDiseaseData = {
    Smoking: "Yes" | "No",
    AlcoholDrinking: "Yes" | "No",
    Stroke: "Yes" | "No",
    PhysicalHealth: number,
    MentalHealth: number,
    DiffWalking: "No" | "Yes",
    Sex: "Male" | "Female",
    Diabetic: "Yes" | "No",
    PhysicalActivity: "No" | "Yes",
    SleepTime: number,
    Asthma: "Yes" | "No",
    KidneyDisease: "Yes" | "No",
    SkinCancer: "Yes" | "No",
}

export async function analyzeHeartDisease(jsonData: HeartDiseaseData) {

    const orderedJsonData = {
        Smoking: jsonData.Smoking,
        AlcoholDrinking: jsonData.AlcoholDrinking,
        Stroke: jsonData.Stroke,
        PhysicalHealth: jsonData.PhysicalHealth,
        MentalHealth: jsonData.MentalHealth,
        DiffWalking: jsonData.DiffWalking,
        Sex: jsonData.Sex,
        Diabetic: jsonData.Diabetic,
        PhysicalActivity: jsonData.PhysicalActivity,
        SleepTime: jsonData.SleepTime,
        Asthma: jsonData.Asthma,
        KidneyDisease: jsonData.KidneyDisease,
        SkinCancer: jsonData.SkinCancer
    }
    try {
        const analyzerUrl = env.HEART_DESEASE_API_URL + "/classify";

        // send post request with http to analyzerUrl with formData as body
        return await new Promise<MRIAnalysisResponse>((resolve, reject) => {
            const req = request(analyzerUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                }
            }, (res) => {
                console.log(res.statusCode, res.statusMessage)
                let data = "";
                res.on("data", (chunk) => {
                    data += chunk;
                    console.log('Chunk')
                    console.log(chunk)
                });
                res.on("end", () => {
                    console.log('Response end');
                    console.log(data)
                    try {
                        resolve(JSON.parse(data));
                    } catch (error) {
                        reject(error);
                    }
                });
            });
            req.on("error", (error) => {
                reject(error);
            });
            req.write(JSON.stringify([orderedJsonData]));
            req.end();
        });

    } catch
        (error) {
        console.error(error);
        return null;
    }
}
