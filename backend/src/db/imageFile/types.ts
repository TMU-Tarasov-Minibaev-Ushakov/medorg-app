export type UploadImageInput = {
    userId: number;
    buffer: Buffer;
}

export type DeleteImageInput = {
    imageId: number;
}

export type DownloadImageInput = {
    id: number;
}

export type GetImagesByUserIdInput = {
    userId: number;
}