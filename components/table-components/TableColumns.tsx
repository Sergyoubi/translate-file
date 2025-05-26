"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import Action from "./Action";

export type TypeOfTranslation = {
  id: string;
  key: string;
  value: string;
};

export const TableColumns: ColumnDef<TypeOfTranslation>[] = [
  // ID column
  {
    accessorKey: "id",
    header: () => <div className="text-left">Translation_ID</div>,
    cell: ({ row }) => {
      const { id } = row.original;
      return <div className="">{id.slice(0, 7) + "..."}</div>;
    },
  },
  // key column
  {
    accessorKey: "key",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Key
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return <div className="ml-3">{row.getValue("key")}</div>;
    },
  },
  //Value column
  {
    accessorKey: "value",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Translation
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return <div className="ml-3">{row.getValue("value")}</div>;
    },
  },
  // action column
  {
    id: "actions",
    header: () => <div className="text-left">Action</div>,
    cell: ({ row }) => {
      const { id, value } = row.original;
      return <Action id={id} value={value} />;
    },
  },
];
