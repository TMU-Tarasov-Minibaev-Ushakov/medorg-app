import {env} from "../../../env";
import FormData from "form-data";
import { request } from "http";

type XRayAnalysisResponse = {
    predicted_class: string;
    processed_image: string;
};

export async function analyzeXRayImageBuffer(imageFile: Buffer) {
    try {
        const analyzerUrl = env.ML_API_URL + "/xray";

        const formData = new FormData();
        formData.append("image", imageFile, "image.png");

        // send post request with http to analyzerUrl with formData as body
        const response = await new Promise<XRayAnalysisResponse>((resolve, reject) => {
            const req = request(analyzerUrl, {
                method: "POST",
                headers: formData.getHeaders()
            }, (res) => {
                let data = "";
                res.on("data", (chunk) => {
                    data += chunk;
                });
                res.on("end", () => {
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
            formData.pipe(req);
        });
        return response;

    } catch
        (error) {
        console.error(error);
        return null;
    }
}
