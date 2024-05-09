import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table"
import axios from "axios";
import { useEffect, useState } from "react"

export default function Products() {
  const [data, setData] = useState([])

  useEffect(() => {
    axios
      .get('http://localhost:8000/product/assignment/100')
      .then((response) => {
        console.log(response)
        const dataWithProductCount = response.data.map((reservation:Record<string, any>) => {
          return {...reservation, product_count: reservation.products.length, expanded: false}
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
          <div className="flex flex-col">
            <tr key={row.id} className="flex">
              <td onClick={() => console.log(values)}>{values["product_count"] > 0 ? '+' : '-'} </td>
              {row.getVisibleCells().map(cell => {
                return <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
              })}
            </tr>
            <div className={`{}`}>toto</div>
          </div>
        )})}
      </tbody>
    </table>
  </>
}
