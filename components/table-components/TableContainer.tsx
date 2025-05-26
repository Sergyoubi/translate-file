"use client";

import { useState } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  ColumnFiltersState,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  ChevronRight,
  ChevronLeft,
  FolderDown,
  LoaderCircle,
} from "lucide-react";
import { exportTranslationsAsJSON, TranslationEntry } from "@/lib/utils";
interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export const TableContainer = <TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) => {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const table = useReactTable({
    data,
    columns,
    getPaginationRowModel: getPaginationRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnFilters,
    },
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
  });

  const exportAsJSONFile = async () => {
    try {
      exportTranslationsAsJSON(data as TranslationEntry[], {
        onStart: () => setIsLoading(true),
        onFinish: () => setIsLoading(false),
        onError: (error) => {
          setIsLoading(false);
          console.log(`Export failed: ${error}`);
        },
      });
    } catch (error) {
      console.log(`We have an issue exporting file. Error: ${error}`);
    }
  };

  return (
    <div className="w-[90%] h-[85%] flex flex-col gap-2">
      <div className="w-full h-[15%] flex justify-start items-center">
        <Input
          value={(table.getColumn("key")?.getFilterValue() as string) ?? ""}
          onChange={(event) => {
            table.getColumn("key")?.setFilterValue(event.target.value);
          }}
          placeholder="Find key..."
          className="w-[30%]"
        />
      </div>
      <div className="w-full h-[95%] border border-slate-200 rounded-lg flex flex-col">
        <section className="w-full h-[90%] flex justify-center items-start">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </section>
        <section className="w-full h-[10%] flex-center">
          <div className="w-[80%] h-full flex-center gap-3">
            <Button
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="mb-3"
            >
              <ChevronLeft /> Prev
            </Button>
            <Button
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="mb-3"
            >
              Next <ChevronRight />
            </Button>
          </div>
          <div className="w-[20%] h-full flex-center">
            <Button
              size="sm"
              className="mb-3 bg-teal-700"
              onClick={exportAsJSONFile}
            >
              {isLoading ? (
                <>
                  <LoaderCircle className="size-6 animate-spin" /> Exporting
                </>
              ) : (
                <>
                  <FolderDown /> Export
                </>
              )}
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
};
