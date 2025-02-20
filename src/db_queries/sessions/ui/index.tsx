"use client";

import React, { useState, useMemo } from "react";
import useSWR from "swr";
import Link from "next/link";
import { ColumnDef , SortingState, flexRender, useReactTable, getCoreRowModel, getSortedRowModel, getFilteredRowModel, getPaginationRowModel } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableFooter } from "@/components/ui/table";
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuCheckboxItem } from "@/components/ui/dropdown-menu"

import { formatDistanceToNow, isBefore, isAfter } from "date-fns"; 
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";

import SessionProposedDisplay from "./client.proposeSession";
import Title from "@/app/reusables/content/title";
import { action__getSessions } from "./client.actions"; 


export type Session = {
  id: string;
  title: string;
  date: string | Date; // Date can be string or Date object
  length: number; // Length in minutes
};


const columns: ColumnDef<Session>[] = [
  {
    accessorKey: "title",
    header: "Session Name",
    cell: ({ row }) => <div>{row.getValue("title")}</div>,
  },
  {
    accessorKey: "length",
    header: () => <div className="text-right">Session Length (min)</div>,
    cell: ({ row }) => {
      const length = row.getValue("length");
      return <div className="text-right">{length}</div>;
    },
    footer: (info) => {
      const totalLength = info.table.getFilteredRowModel().rows.reduce(
        (sum, row) => sum + parseInt(row.getValue("length")),
        0
      );
      return <div className="text-right">{totalLength} min</div>;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const date = new Date(row.getValue("date"));
      const status = isBefore(date, new Date()) ? "completed" : "upcoming"; // Determine status based on date
      return <div className={`inline capitalize rounded-md px-2 py-1.5 ${status === 'completed' ? 'bg-black text-white' : 'bg-gray-200 text-black'}`}>{status}</div>;
    },
  },
  {
    accessorKey: "date",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Date
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const date = new Date(row.getValue("date")); // Parse the date correctly
      const displayTime = formatDistanceToNow(date, { addSuffix: true });

      return <div>{displayTime}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const session = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(session.id.toString())}
            >
              Copy session ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href={`/authed/session/${session.id}`}>
                <Button className="block w-full text-left"> View session </Button>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];


interface SessionProps {
  studentId: string;
  userType: "Teacher" | "Student";
}


export default function SessionsWithProposals({ studentId, userType }: SessionProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [columnVisibility, setColumnVisibility] = useState({});

  const { data: sessions, error } = useSWR(`fetchSessions-${studentId}`, () =>
    action__getSessions({ studentId })
  );

  const filteredData = useMemo(() => {
    if (!sessions) return [];
    return sessions.filter((session: Session) => {
      const matchesGlobalFilter = session.title.toLowerCase().includes(globalFilter.toLowerCase());
      const matchesDateFilter = dateFilter ? new Date(session.date) <= new Date(dateFilter) : true;
      return matchesGlobalFilter && matchesDateFilter;
    });
  }, [sessions, globalFilter, dateFilter]);

  const table = useReactTable({
    data: filteredData,
    columns,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnVisibility,
    },
  });

  const totalLength = useMemo(() => {
    return filteredData.reduce((total, session) => total + session.length, 0);
  }, [filteredData]);

  if (error) return <div>Error loading sessions.</div>;

  return (
    <>
      <SessionProposedDisplay studentId={studentId} userType={userType} />

      <div className="w-full flex flex-col my-5">
        <Title variant="heading" title={"Sessions booked"} noMargin={false} />

        <div className="flex items-center py-4">
          <Input
            placeholder="Filter by session name..."
            value={globalFilter}
            onChange={(event) => setGlobalFilter(event.target.value)}
            className="max-w-sm"
          />
          <Input
            placeholder="Filter by date (YYYY-MM-DD)..."
            value={dateFilter}
            onChange={(event) => setDateFilter(event.target.value)}
            className="max-w-sm ml-4"
            type="date"
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                Columns <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) => column.toggleVisibility(!!value)}
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center">
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                {table.getFooterGroups().map((footerGroup) =>
                  footerGroup.headers.map((footer) => (
                    <TableCell key={footer.id}>
                      {footer.isPlaceholder
                        ? null
                        : flexRender(footer.column.columnDef.footer, footer.getContext())}
                    </TableCell>
                  ))
                )}
              </TableRow>
            </TableFooter>
          </Table>
        </div>

        <div className="flex items-center justify-end space-x-2 py-4">
          <div className="flex-1 text-sm text-muted-foreground">
            Total: {table.getFilteredRowModel().rows.length} sessions 🔥
          </div>
          <div className="space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </Button>
          </div>
        </div>

        <div className="flex space-x-12 mt-4">
          <Card className="flex-1">
            <CardHeader>
              <CardTitle>Total Session Length</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{totalLength} min</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
