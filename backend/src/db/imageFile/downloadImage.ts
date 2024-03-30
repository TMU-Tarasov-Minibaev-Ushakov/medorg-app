import { prisma } from "..";
import { DownloadImageInput } from "./types";

export async function downloadImage({ id }: DownloadImageInput) {
  const imageFile = await prisma.imageFile.findUniqueOrThrow({
    where: {
      id,
    },
  });

  return imageFile.binaryData;
}
