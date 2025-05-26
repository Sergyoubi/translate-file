import React from "react";

type TypeOfFileData = {
  fileId: string | undefined;
  filename: string | undefined;
  updatedBy: string | undefined;
};

const DataHeader = ({ fileId, filename, updatedBy }: TypeOfFileData) => {
  return (
    <div className="w-[90%] h-[15%] flex-center border border-slate-200 rounded-lg">
      <div className="w-full h-full flex flex-col justify-center items-start gap-1 border-r border-slate-200">
        <p className="text-sm font-extralight  text-slate-600 ml-3 flex-center gap-2">
          <span className="size-2 rounded-full bg-green-200"></span> File Id
        </p>
        <p className="text-base font-medium text-black ml-3">
          <span>{fileId?.slice(0, 23) + "..."}</span>
        </p>
      </div>
      <div className="w-full h-full flex flex-col justify-center items-start gap-1 border-r border-slate-200">
        <p className="text-sm font-extralight  text-slate-600 ml-3 flex-center gap-2">
          <span className="size-2 rounded-full bg-rose-200"></span> Filename
        </p>
        <p className="text-base font-medium text-black ml-3">
          <span>{filename}</span>
        </p>
      </div>
      <div className="w-full h-full flex flex-col justify-center items-start gap-1">
        <p className="text-sm font-extralight  text-slate-600 ml-3 flex-center gap-2">
          <span className="size-2 rounded-full bg-blue-400"></span> Updated By
        </p>
        <p className="text-base font-medium text-black ml-3">
          <span>{updatedBy}</span>
        </p>
      </div>
    </div>
  );
};

export default DataHeader;
