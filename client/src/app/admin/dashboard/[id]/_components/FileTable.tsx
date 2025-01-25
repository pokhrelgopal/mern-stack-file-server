"use client";

import type React from "react";
import { useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
  createColumnHelper,
  getSortedRowModel,
  type SortingState,
  type ColumnDef,
} from "@tanstack/react-table";
import { ArrowDown2, ArrowUp2, Trash } from "iconsax-react";
import { Checkbox } from "@/components/ui/checkbox";
import { File } from "@/types/file.types";
import { Button } from "@/components/ui/button";
import { formatDate } from "date-fns";
import FileTableHeader from "./FileTableHeader";
import FileTableSearch from "./FileTableSearch";
import { Pagination } from "@/components/elements/pagination";
import EmptyState from "./EmptyState";
import { CustomAlertDialog } from "@/components/elements/alert-dialog";
import {
  useMutation,
  useQueryClient,
  InvalidateQueryFilters,
} from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { deleteFile } from "@/lib/api/requests/file.requests";

const columnHelper = createColumnHelper<File>();

interface FileTableProps {
  data: File[];
  apiKey?: string;
}

const FileTable = ({ data, apiKey }: FileTableProps) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const queryClient = useQueryClient();
  const { showToast } = useToast();
  const { mutate, isPending } = useMutation({
    mutationFn: (id: string) => deleteFile(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["application"] as InvalidateQueryFilters);
      showToast("File deleted successfully", "success");
    },
    onError: (error) => {
      showToast(error.message, "error");
    },
  });
  const columns: ColumnDef<File, any>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <div className="w-0 flex items-center text-center mx-auto justify-center">
          <Checkbox
            checked={table.getIsAllPageRowsSelected()}
            onCheckedChange={(value) =>
              table.toggleAllPageRowsSelected(!!value)
            }
            aria-label="Select all"
          />
        </div>
      ),
      cell: ({ row }) => (
        <div className="w-0 flex items-center text-center mx-auto justify-center">
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label={`Select row ${row.id}`}
          />
        </div>
      ),
      enableSorting: false,
    },
    columnHelper.accessor("name", {
      header: ({ column }) => (
        <div
          className="flex items-center gap-2 cursor-pointer w-fit"
          onClick={() => column.toggleSorting()}
        >
          <span>File Name</span>
          {column.getIsSorted() ? (
            column.getIsSorted() === "asc" ? (
              <ArrowUp2 size={10} className="text-gray-500 stroke-gray-600" />
            ) : (
              <ArrowDown2 size={10} className="text-gray-500 stroke-gray-600" />
            )
          ) : (
            <span className="flex flex-col">
              <ArrowUp2 size={10} className="text-gray-500 stroke-gray-600" />
              <ArrowDown2 size={10} className="text-gray-500 stroke-gray-600" />
            </span>
          )}
        </div>
      ),
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("size", {
      header: "Size",
      cell: (info) => {
        const sizeInBytes = info.getValue();
        if (sizeInBytes < 1024) return `${sizeInBytes} B`;
        if (sizeInBytes < 1024 * 1024)
          return `${(sizeInBytes / 1024).toFixed(2)} KB`;
        return `${(sizeInBytes / (1024 * 1024)).toFixed(2)} MB`;
      },
    }),
    columnHelper.accessor("type", {
      header: "Type",
      cell: (info) => info.getValue(),
    }),

    columnHelper.accessor("createdAt", {
      header: ({ column }) => (
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => column.toggleSorting()}
        >
          <span>Created At</span>
          {column.getIsSorted() ? (
            column.getIsSorted() === "asc" ? (
              <ArrowUp2 size={10} className="text-gray-500 stroke-gray-600" />
            ) : (
              <ArrowDown2 size={10} className="text-gray-500 stroke-gray-600" />
            )
          ) : (
            <span className="flex flex-col">
              <ArrowUp2 size={10} className="text-gray-500 stroke-gray-600" />
              <ArrowDown2 size={10} className="text-gray-500 stroke-gray-600" />
            </span>
          )}
        </div>
      ),
      cell: (info) => formatDate(new Date(info.getValue()), "dd MMM yyyy"),
    }),
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <CustomAlertDialog
            title="Delete File"
            description="Are you sure you want to delete this file?"
            actionText="Delete"
            cancelText="Cancel"
            onAction={() => {
              mutate(row.original.id);
            }}
            trigger={
              <Button variant={"ghost"} size={"icon"} className="p-1">
                <Trash
                  size={20}
                  className="text-red-600 stroke-red-600 cursor-pointer"
                />
              </Button>
            }
          />
        </div>
      ),
    },
  ];

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="mt-4 bg-white p-5 min-h-[500px] rounded-lg flex flex-col justify-between">
      <div>
        <FileTableHeader apiKey={apiKey} />
        <FileTableSearch />
        {data.length == 0 ? (
          <div className="mt-4 bg-white p-5 min-h-[400px] rounded-lg flex flex-col justify-center">
            <EmptyState />
          </div>
        ) : (
          <div className="overflow-x-auto mt-4 border border-gray-100">
            <table className="min-w-full">
              <thead className="border-b border-gray-100">
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr
                    key={headerGroup.id}
                    className="divide-x divide-line-divider"
                  >
                    {headerGroup.headers.map((header) => (
                      <th
                        key={header.id}
                        scope="col"
                        className="p-3 text-left text-gray-600 text-b2b"
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {table.getRowModel().rows.map((row, index) => (
                  <tr
                    key={row.id}
                    className={`divide-x divide-line-divider ${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    }`}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td
                        key={cell.id}
                        className="p-2 whitespace-nowrap text-gray-600 text-b2"
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <div className="mt-8">
        <Pagination totalPages={10} />
      </div>
    </div>
  );
};

export default FileTable;
