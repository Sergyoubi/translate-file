import { House } from "lucide-react";
import Link from "next/link";

import { getAllFilesIdAndName } from "@/actions/files";
import FileSelect from "./FileSelect";

const Sidebar = async () => {
  const listOfTranslationFiles = await getAllFilesIdAndName();

  return (
    <div className="w-[20%] h-full flex flex-col justify-start items-center border-r border-slate-100">
      <Link
        href="/dashboard"
        className="w-[80%] mt-10 py-2 rounded-md group bg-neutral-100 hover:bg-neutral-200 flex justify-start items-center gap-2"
      >
        <House className="size-5 ml-3 text-neutral-500" />
        <p className="font-light text-neutral-600 text-sm group-hover:text-neutral-800">
          Dashboard
        </p>
      </Link>
      <FileSelect fileData={listOfTranslationFiles.filesIdAndName} />
    </div>
  );
};

export default Sidebar;
