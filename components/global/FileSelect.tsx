"use client";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type TypeofFileData = {
  fileData?: {
    id: string;
    fileName: string;
  }[];
};

const FileSelect = ({ fileData }: TypeofFileData) => {
  const router = useRouter();
  const handleFileSelect = (fileName: string) => {
    const selectedFile = fileData?.find((file) => file.fileName === fileName);
    if (selectedFile) {
      router.push(`/dashboard/file/${selectedFile.id}`);
    }
  };

  return (
    <Select onValueChange={handleFileSelect}>
      <SelectTrigger className="w-[80%] mt-10">
        <SelectValue placeholder="Translation Files" />
      </SelectTrigger>
      <SelectContent>
        {fileData?.map((file) => (
          <SelectItem key={file.id} value={file.fileName}>
            {file.fileName}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default FileSelect;
