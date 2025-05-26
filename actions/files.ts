"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const saveNewFile = async (fileName: string) => {
  try {
    const newFile = await prisma.translationFile.create({
      data: {
        fileName,
        updatedBy: "Current User",
      },
    });

    if (newFile) {
      return { status: 201, message: "Success", fileId: newFile.id };
    }
  } catch (error: any) {
    console.log(
      `Error from Server Actions  files.ts/saveNewFile() - Error: ${error.message}`
    );
    return {
      status: 500,
      message: "An issue occured on our end! Please upload file later.",
    };
  }
};

export const appendKeyAndValueToFile = async (
  fileId: string,
  key: string,
  value: string
) => {
  try {
    const currentFile = await prisma.translationFile.findUnique({
      where: {
        id: fileId,
      },
    });

    if (!currentFile) {
      return { status: 404 };
    }

    const appendedKeyAndValue = await prisma.translationContent.create({
      data: {
        fileId,
        key,
        value,
      },
    });

    if (appendedKeyAndValue)
      return {
        status: 201,
      };
  } catch (error: any) {
    console.log(
      `Error from Server Actions files.ts/appendKeyAndValueToFile() - Error: ${error.message}`
    );
    return {
      status: 500,
      message: "An issue occured on our end! Please upload file later.",
    };
  }
};

export const getFileContent = async (fileId: string) => {
  try {
    const currentFile = await prisma.translationFile.findUnique({
      where: {
        id: fileId,
      },
      select: {
        id: true,
        fileName: true,
        updatedBy: true,
        translations: {
          select: {
            id: true,
            key: true,
            value: true,
          },
        },
      },
    });

    if (!currentFile) {
      return { status: 404 };
    }

    return { status: 200, currentFile };
  } catch (error: any) {
    console.log(
      `Error from Server Actions files.ts/getFileContent() - Error: ${error.message}`
    );
    return {
      status: 500,
      message: "An issue occured on our end!",
    };
  }
};

export const getAllFilesIdAndName = async () => {
  try {
    const filesIdAndName = await prisma.translationFile.findMany({
      select: {
        id: true,
        fileName: true,
      },
    });

    if (!filesIdAndName) return { status: 404 };

    return { status: 200, filesIdAndName };
  } catch (error: any) {
    console.log(
      `Error from Server Actions files.ts/getFileId() - Error: ${error.message}`
    );
    return {
      status: 500,
      message: "An issue occured on our end!",
    };
  }
};

export const updateTranslation = async (id: string, value: string) => {
  try {
    const currentTranslation = await prisma.translationContent.findUnique({
      where: {
        id: id,
      },
      select: {
        fileId: true,
      },
    });

    if (!currentTranslation) return { status: 404 };

    const newTranslation = await prisma.translationContent.update({
      where: {
        id: id,
      },
      data: {
        value: value,
      },
    });

    if (newTranslation) {
      revalidatePath(`/dashboard/file/${currentTranslation.fileId}`);
      return { status: 200 };
    }
  } catch (error: any) {
    console.log(
      `Error from Server Actions files.ts/updateTranslation() - Error: ${error.message}`
    );
    return {
      status: 500,
      message: "An issue occured on our end!",
    };
  }
};

export const deleteTranslation = async (id: string) => {
  try {
    const currentTranslation = await prisma.translationContent.findUnique({
      where: {
        id: id,
      },
      select: {
        fileId: true,
      },
    });

    if (!currentTranslation) return { status: 404 };

    const deletedTranslation = await prisma.translationContent.delete({
      where: {
        id: id,
      },
    });

    if (deletedTranslation) {
      revalidatePath(`/dashboard/file/${currentTranslation.fileId}`);
      return { status: 200 };
    }
  } catch (error: any) {
    console.log(
      `Error from Server Actions files.ts/deleteTranslation() - Error: ${error.message}`
    );
    return {
      status: 500,
      message: "An issue occured on our end!",
    };
  }
};

export const translateToEnglish = async (value: string) => {
  try {
    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "meta-llama/llama-3.3-8b-instruct:free",
          messages: [
            {
              role: "user",
              content: `Translate this sentence to English: ${value}`,
            },
            {
              role: "system",
              content: `You are an intelligent translator! Your job is to translate the input from user. When you respond, just respond with the translated value.
              #example: 
                - User query: Translate this sentence to English "Ma voiture ne démarre pas"
                - Your response should be like: "My car won't start."
              `,
            },
          ],
        }),
      }
    );

    const data = await response.json();
    const translatedText = data.choices?.[0]?.message?.content;
    //console.log(translatedText);

    if (response.status !== 200) {
      return {
        status: 403,
        message:
          "We have an issue from our AI Provider! Please translate manually",
      };
    }

    return { status: 200, translatedText: translatedText };
  } catch (error: any) {
    console.log(
      `Error from Server Actions files.ts/translateToEnglish() - Error: ${error.message}`
    );
    return {
      status: 500,
      message: "An issue occured on our end!",
    };
  }
};

export const translateToFrench = async (value: string) => {
  try {
    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "meta-llama/llama-3.3-8b-instruct:free",
          messages: [
            {
              role: "user",
              content: `Translate this sentence to French: ${value}`,
            },
            {
              role: "system",
              content: `You are an intelligent translator! Your job is to translate the input from user. When you respond, just respond with the translated value.
              #example: 
                - User query: Translate this sentence to French: "My car won't start."
                - Your response should be like: "Ma voiture ne démarre pas"
              `,
            },
          ],
        }),
      }
    );

    const data = await response.json();
    const translatedText = data.choices?.[0]?.message?.content;
    //console.log(translatedText);

    if (response.status !== 200) {
      return {
        status: 403,
        message:
          "We have an issue from our AI Provider! Please translate manually",
      };
    }

    return { status: 200, translatedText: translatedText };
  } catch (error: any) {
    console.log(
      `Error from Server Actions files.ts/translateToFrench() - Error: ${error.message}`
    );
    return {
      status: 500,
      message: "An issue occured on our end!",
    };
  }
};

export const translateToSpanish = async (value: string) => {
  try {
    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "meta-llama/llama-3.3-8b-instruct:free",
          messages: [
            {
              role: "user",
              content: `Translate this sentence to Spanish: ${value}`,
            },
            {
              role: "system",
              content: `You are an intelligent translator! Your job is to translate the input from user. When you respond, just respond with the translated value.
              #example: 
                - User query: Translate this sentence to Spanish: "My car won't start.
                - Your response should be like: "Mi coche no arranca"
              `,
            },
          ],
        }),
      }
    );

    const data = await response.json();
    const translatedText = data.choices?.[0]?.message?.content;
    //console.log(translatedText);

    if (response.status !== 200) {
      return {
        status: 403,
        message:
          "We have an issue from our AI Provider! Please translate manually",
      };
    }

    return { status: 200, translatedText: translatedText };
  } catch (error: any) {
    console.log(
      `Error from Server Actions files.ts/translateToFrench() - Error: ${error.message}`
    );
    return {
      status: 500,
      message: "An issue occured on our end!",
    };
  }
};
