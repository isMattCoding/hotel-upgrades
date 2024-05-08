import axios from "axios";
import { useEffect, useState } from "react";

type HotelUpgradesType = {
  id: number;
  price: number;
  type: string;
  hotel_id: number
}

export default function HotelUpgrades({hotel_id}: {hotel_id:number}) {
  const [hotelUpgrades, setHotelUpgrades] = useState<Array<HotelUpgradesType> | null>(null);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/hotels/hotel_upgrades/${hotel_id}`)
      .then((response) => {
        setHotelUpgrades(response.data);
      })
      .catch((error) => {
        console.error('Error fetching hotelUpgrades:', error);
      });
  }, [hotel_id]);

  if (!hotelUpgrades) {
    return <>Loading...</>
  }

  return <div className="flow-root">
    <ul className="divide-y divide-gray-200 dark:divide-gray-700">
      {hotelUpgrades.map((hotelUpgrade) => {
        return <li key={`hotel-${hotel_id}-${hotelUpgrade.id}`}className="py-3 sm:py-4">
          <div className="flex items-center">
            <div className="flex-1 min-w-0 ms-4">
              <p className="text-sm font-medium text-gray-900 truncate dark:text-white capitalize">
                {hotelUpgrade.type}
              </p>
            </div>
            <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
              ${hotelUpgrade.price}
            </div>
          </div>
        </li>
      })}

    </ul>
  </div>

}
