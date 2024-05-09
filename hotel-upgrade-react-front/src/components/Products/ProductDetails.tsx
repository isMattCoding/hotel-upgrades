import axios from "axios";
import { useState } from "react";

export default function ProductDetails({reservation_uuid}: {reservation_uuid: string}) {
  const [data, setData] = useState<any>([])
  const [expanded, setExpanded] = useState<boolean>(false);
  if (data.length > 0) {console.log(data)}

  function onClick() {
    if(data.length < 1) {
      axios
        .get('http://localhost:8000/reservations')
        .then((response) => {
          const dataWithProductCount = response.data.map((reservation:Record<string, any>) => {
            return {...reservation, expanded: false}
          }).find((item:any ) => item.reservation_uuid === reservation_uuid)
          setData(dataWithProductCount);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    }
    setExpanded(expanded => !expanded)
  }

  if (!expanded) return <div onClick={onClick}>+</div>;

  return <div>
    <div>-</div>
    <table>
      <thead>
        <tr>
          <th>Product ID</th>
          <th>Product Name</th>
          <th>Active</th>
          <th>Amount</th>
        </tr>
      </thead>
      <tbody>
        {data.products && data.products.map((product: any) => {
          console.log(product)
            return <tr className={product.active ? 'bg-green-400' : product.active === null ? undefined : 'bg-red-800'}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.active ? "Active" : product.active === null ? "-" : "Cancelled"}</td>
              <td>{product.amount}</td>
            </tr>
          })
        }

      </tbody>
    </table>
  </div>
}
