import axios, { AxiosResponse } from "axios";
import { env } from "../../../env";
import { mockedResponseImageData } from "./mockedResponseImageData";

type XRayAnalysisResponse = {
  predicted_class: string;
  processed_image: string;
};

export async function analyzeXRayImageBuffer(imageData: Buffer) {
  const response = await axios.post<any, AxiosResponse<XRayAnalysisResponse>>(
    env.ML_API_URL,
    {
      image: imageData,
    },
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  )

  if (response.data) {
    return {
      predictedClass: response.data.predicted_class,
      processedImage: response.data.processed_image,
    };
  }

  throw new Error("Something went wrong while processing the image");
}
