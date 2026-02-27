"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { useState } from "react";
import { User } from "@/lib/type/User";
import UserModal from "./UserModal";
import { deleteUser } from "./actions";
import { useRouter } from "next/navigation";

type Props = {
  users: User[];
};

const UserTable = ({ users }: Props) => {
  const router = useRouter();
  const [sorting, setSorting] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");

  const columns: ColumnDef<User>[] = [
    {
      header: "Nama",
      accessorKey: "name",
    },
    {
      header: "Email",
      accessorKey: "email",
    },
    {
      header: "Aksi",
      cell: ({ row }) => {
        const user = row.original;
        return (
          <div className="flex items-center gap-3">
            <UserModal triggerLabel="Edit" initialData={user} />

            <button
              onClick={async () => {
                if (!confirm("Yakin ingin menghapus user ini?")) return;
                await deleteUser(user.id);
                router.refresh();
              }}
              className="text-red-600 bg-red-100 rounded-full px-2 py-0.5"
            >
              Hapus
            </button>
          </div>
        );
      },
    },
  ];

  const table = useReactTable({
    data: users,
    columns,
    state: {
      sorting,
      globalFilter,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="bg-background border rounded-xl shadow-sm p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Pengaturan User</h1>
        <p className="text-sm text-foreground/60">Kelola user admin</p>
      </div>

      {/* Header */}
      <div className="flex justify-between mb-4">
        <input
          value={globalFilter ?? ""}
          onChange={(e) => setGlobalFilter(e.target.value)}
          placeholder="Cari user..."
          className="border px-3 py-1 rounded-md text-sm"
        />

        <UserModal triggerLabel="Tambah User" />
      </div>

      {/* Table */}
      <table className="min-w-full text-sm border">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  onClick={header.column.getToggleSortingHandler()}
                  className="px-4 py-3 text-left font-semibold cursor-pointer border-b"
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext(),
                  )}
                  {{
                    asc: " ↑",
                    desc: " ↓",
                  }[header.column.getIsSorted() as string] ?? null}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody>
          {table.getRowModel().rows.length === 0 ? (
            <tr>
              <td colSpan={3} className="text-center py-10">
                Tidak ada user
              </td>
            </tr>
          ) : (
            table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="hover:bg-muted">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-4 py-3 border-b">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-4 text-sm">
        <div className="flex items-center gap-2">
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Prev
          </button>

          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>

        <div>
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </div>

        <select
          value={table.getState().pagination.pageSize}
          onChange={(e) => table.setPageSize(Number(e.target.value))}
          className="border px-2 py-1 rounded"
        >
          {[5, 10, 20, 50].map((size) => (
            <option key={size} value={size}>
              {size} per page
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default UserTable;
