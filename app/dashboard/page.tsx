"use client";

import { appendKeyAndValueToFile, saveNewFile } from "@/actions/files";
import { FileUpload } from "@/components/ui/file-upload";
import { flattenJSON } from "@/lib/utils";
import React, { useState } from "react";
import { LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";

interface FileData {
  name: string;
  content: unknown;
}

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [status, setStatus] = useState<"idle" | "parsing" | "error" | "done">(
    "idle"
  );
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const readAndParseFiles = async (files: File[]): Promise<FileData[]> => {
    try {
      const dataPromises = files.map(async (file) => {
        const text = await file.text();
        try {
          const json = JSON.parse(text);
          return { name: file.name, content: json };
        } catch (error: any) {
          console.error(`Error parsing ${file.name}:`, error.message);
          return null;
        }
      });

      const data = (await Promise.all(dataPromises)).filter(
        (item): item is FileData => item !== null
      );

      return data;
    } catch (error) {
      throw new Error(`Failed to process files: ${error}`);
    }
  };

  const saveParsedData = async (fileData: FileData[]) => {
    try {
      setStatus("parsing");
      // Process each files sequentially
      for (const file of fileData) {
        try {
          const flattened = await flattenJSON(file.content);
          // 1- Save file in DB
          const savedFile = await saveNewFile(file.name);

          if (savedFile?.status === 201 && savedFile.fileId) {
            // 2 - iterate through flattened file.content object (key: value)
            // then append each key + value to a file sequentially
            const keyAndValueObject = Object.entries(flattened) as [
              string,
              string
            ][];

            const results = await Promise.all(
              keyAndValueObject.map(([key, value]) =>
                appendKeyAndValueToFile(savedFile?.fileId, key, value)
              )
            );
            const isAddingKeyAndValueSuccessful = results.every(
              (res) => res?.status === 201
            );

            if (isAddingKeyAndValueSuccessful) {
              router.push(`/dashboard/file/${savedFile.fileId}`);
              setStatus("done");
              setIsLoading(false);
            }
          } else {
            throw new Error(`Failed to save file: ${file.name}`);
          }
        } catch (error: any) {
          console.error(`Error processing ${file.name}:`, error.message);
          setError(`Failed to process ${file.name}`);
        }
      }
    } finally {
      setStatus("idle");
    }
  };

  const handleFileUpload = async (files: File[]) => {
    try {
      setIsLoading(true);
      const parsedData = await readAndParseFiles(files);

      if (parsedData.length === 0) {
        throw new Error("No valid JSON files were parsed");
      }
      await saveParsedData(parsedData);
    } catch (error: any) {
      setIsLoading(false);
      setStatus("error");
      setError("File upload error");
      console.error(`Error handling file. Error ${error.message} `);
    }
  };

  return (
    <div className="w-full h-full flex flex-col justify-start items-center">
      {status === "parsing" || isLoading ? (
        <div className="w-[80%] h-[80%] flex-center mt-10">
          <p className="font-semibold flex gap-2">
            Parsing file <LoaderCircle className="size-6 animate-spin" />
          </p>
        </div>
      ) : (
        <div className="w-[80%] h-[50%] border border-slate-100 rounded-lg flex-center mt-10">
          <FileUpload onChange={handleFileUpload} />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
