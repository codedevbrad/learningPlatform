'use client';

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  ColumnDef,
  SortingState,
  flexRender,
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableFooter,
} from "@/components/ui/table";
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuCheckboxItem } from "@/components/ui/dropdown-menu";
import { TabsContent } from "@radix-ui/react-tabs";
import { formatDistance, parseISO } from 'date-fns';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";

import SessionProposal from "./client.proposeSession";
import Title from "@/app/reusables/content/title";

const data = [
  { id: 1, title: 'Math Tutoring', amount: 50, status: 'upcoming', date: '2024-08-01T10:00:00Z', length: '60' },
  { id: 2, title: 'Science Tutoring', amount: 75, status: 'completed', date: '2024-07-28T14:00:00Z', length: '90' },
  { id: 3, title: 'English Tutoring', amount: 100, status: 'missed', date: '2024-07-20T11:00:00Z', length: '120' },
  { id: 4, title: 'History Tutoring', amount: 60, status: 'upcoming', date: '2024-08-02T10:00:00Z', length: '60' },
  { id: 5, title: 'Chemistry Tutoring', amount: 80, status: 'completed', date: '2024-07-15T15:00:00Z', length: '90' },
];

export type Session = {
  id: number;
  title: string;
  amount: number;
  status: "completed" | "upcoming" | "missed";
  date: string;
  length: string; // Length in minutes
};


const columns: ColumnDef<Session>[] = [
  {
    accessorKey: "title",
    header: 'Session Name',
    cell: ({ row }) => <div>{row.getValue("title")}</div>,
  },
  {
    accessorKey: "amount",
    header: () => <div className="text-right">Amount</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));
      const formatted = new Intl.NumberFormat("en-GB", {
        style: "currency",
        currency: "GBP",
      }).format(amount);

      return <div className="text-right font-medium">{formatted}</div>;
    },
    footer: (info) => {
      const total = info.table.getFilteredRowModel().rows.reduce(
        (sum, row) => sum + row.getValue("amount"),
        0
      );
      const formattedTotal = new Intl.NumberFormat("en-GB", {
        style: "currency",
        currency: "GBP",
      }).format(total);
      return <div className="text-right font-medium">{formattedTotal}</div>;
    }
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
    }
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div className={`capitalize rounded-md px-2 py-1`}>
        {row.getValue("status")}
      </div>
    ),
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
      const date = parseISO(row.getValue("date"));
      const displayTime = formatDistance(date, new Date(), { addSuffix: true });

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
              <Link href={`/sessions/${session.id}`}>
                <Button className="block w-full text-left"> View session </Button>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];



export default function DataTable({ studentId }) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [priceFilter, setPriceFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [columnVisibility, setColumnVisibility] = useState({});

  const filteredData = useMemo(() => {
    return data.filter((session) => {
      const matchesGlobalFilter = session.title.toLowerCase().includes(globalFilter.toLowerCase());
      const matchesPriceFilter = priceFilter ? session.amount <= parseFloat(priceFilter) : true;
      const matchesDateFilter = dateFilter ? new Date(session.date) <= new Date(dateFilter) : true;
      return matchesGlobalFilter && matchesPriceFilter && matchesDateFilter;
    });
  }, [globalFilter, priceFilter, dateFilter]);

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

  const totalAmount = useMemo(() => {
    return filteredData.reduce((total, session) => total + session.amount, 0);
  }, [filteredData]);

  const totalLength = useMemo(() => {
    return filteredData.reduce((total, session) => total + parseInt(session.length), 0);
  }, [filteredData]);

  return (

    <TabsContent value="tutoring" className="h-full">

      <SessionProposal studentId={studentId } />

      <div className="w-full flex flex-col my-5">

        <Title variant="heading" title="Sessions with Student" noMargin={false} />

        <div className="flex items-center py-4">
          <Input
            placeholder="Filter by session name..."
            value={globalFilter}
            onChange={(event) => setGlobalFilter(event.target.value)}
            className="max-w-sm"
          />
          <Input
            placeholder="Filter by price..."
            value={priceFilter}
            onChange={(event) => setPriceFilter(event.target.value)}
            className="max-w-sm ml-4"
            type="number"
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
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
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
                  <TableCell colSpan={columns.length} className="h-24 text-center">
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                {table.getFooterGroups().map((footerGroup) => (
                  footerGroup.headers.map((footer) => (
                    <TableCell key={footer.id}>
                      {footer.isPlaceholder
                        ? null
                        : flexRender(
                            footer.column.columnDef.footer,
                            footer.getContext()
                          )}
                    </TableCell>
                  ))
                ))}
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
                <CardTitle>Total Amount</CardTitle>
                </CardHeader>
                <CardContent>
                <p>{new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP" }).format(totalAmount)}</p>
                </CardContent>
            </Card>

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
    </TabsContent>
  );
}
