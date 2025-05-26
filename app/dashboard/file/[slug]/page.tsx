import { getFileContent } from "@/actions/files";
import DataHeader from "@/components/global/DataHeader";
import {
  TableColumns,
  TypeOfTranslation,
} from "@/components/table-components/TableColumns";
import { TableContainer } from "@/components/table-components/TableContainer";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "File Details",
};

const Page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const fileData = await getFileContent(slug);

  return (
    <main className="w-full h-full flex justify-center items-start">
      <div className="w-[90%] h-[90%] mt-10 flex flex-col justify-center items-center gap-3">
        <DataHeader
          fileId={fileData?.currentFile?.id}
          filename={fileData?.currentFile?.fileName}
          updatedBy={fileData?.currentFile?.updatedBy}
        />
        <TableContainer
          columns={TableColumns}
          data={fileData?.currentFile?.translations as TypeOfTranslation[]}
        />
      </div>
    </main>
  );
};

export default Page;
