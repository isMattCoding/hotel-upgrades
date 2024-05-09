import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table"
import axios from "axios";
import React from "react";
import { useEffect, useState } from "react"
import ProductDetails from "./Products/ProductDetails";

export default function Products() {
  const [data, setData] = useState<any>([])

  useEffect(() => {
    axios
      .get('http://localhost:8000/reservations')
      .then((response) => {
        const dataWithProductCount = response.data.map((reservation:Record<string, any>) => {
          return {...reservation, expanded: false}
        })

        setData(dataWithProductCount);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const columns = [
    {
      header: 'Reservation UUID',
      accessorKey: 'reservation_uuid',
    },
    {
      header: 'Number of Active Purchases',
      accessorKey: 'product_count',
    }
  ]

  const table = useReactTable({ columns, data, getCoreRowModel: getCoreRowModel() })

  return <>
    <table>
      <thead>
        {table.getHeaderGroups().map(headerGroup => {
          return (
            <tr key={headerGroup.id}>
              <th>Expand</th>
              {headerGroup.headers.map(header => {
                return ( // map over the headerGroup headers array
                  <th key={header.id} colSpan={header.colSpan}>
                    {header.column.columnDef.header ? `${header.column.columnDef.header}` : header.id}
                  </th>
                )
              })}
            </tr>
          )
        })}
      </thead>
      <tbody>
        {table.getRowModel().rows.map(row => {
          const values = row.original
          return (
            <React.Fragment key={row.id}>
              <tr className="">
                {row.getVisibleCells().map(cell => {
                  return <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                })}
              </tr>
              <ProductDetails reservation_uuid={values["reservation_uuid"] as string}/>
            </React.Fragment>
          )}
        )}
      </tbody>
    </table>
  </>
}
