-- CreateTable
CREATE TABLE "TranslationFile" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "fileName" TEXT NOT NULL,
    "updatedBy" TEXT NOT NULL DEFAULT 'John',

    CONSTRAINT "TranslationFile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TranslationContent" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "key" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "fileId" UUID,

    CONSTRAINT "TranslationContent_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TranslationContent" ADD CONSTRAINT "TranslationContent_fileId_fkey" FOREIGN KEY ("fileId") REFERENCES "TranslationFile"("id") ON DELETE SET NULL ON UPDATE CASCADE;
