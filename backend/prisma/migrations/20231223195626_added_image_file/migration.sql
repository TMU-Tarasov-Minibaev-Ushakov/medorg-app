-- CreateTable
CREATE TABLE "ImageFile" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "binaryData" BYTEA NOT NULL,

    CONSTRAINT "ImageFile_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ImageFile" ADD CONSTRAINT "ImageFile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
