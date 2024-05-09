import HotelUpgrades from "./HotelUpgrades"
import { type HotelType } from "./HotelsList"

export default function HotelCard({hotel}: {hotel:HotelType}) {

  return <div className="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
    <div className="flex items-center justify-between mb-4">
      <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">{hotel.name}, {hotel.city}</h5>
      <a href="/dashboard" className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">
        View all
      </a>
    </div>
    <HotelUpgrades hotel_id={hotel.id} />
  </div>

}
