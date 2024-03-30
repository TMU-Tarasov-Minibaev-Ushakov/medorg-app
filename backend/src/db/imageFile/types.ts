import { ImageFileType } from "../../types";

export type UploadImageInput = {
  userId: number;
  buffer: Buffer;
  type: ImageFileType;
};

export type DeleteImageInput = {
  imageId: number;
};

export type DownloadImageInput = {
  id: number;
};

export type GetImagesByUserIdInput = {
  userId: number;
  type: ImageFileType;
};
