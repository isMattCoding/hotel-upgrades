import HotelCard from "./HotelCard";

export type HotelType = {
  id: number;
  name: string;
  city: string;
}

export default function HotelsList({hotels}: {hotels:HotelType[]}) {

  return <div className="grid grid-cols-2 grid-rows-2 grid-flow-col gap-4">
    {hotels.map((hotel) => {
      return <HotelCard key={hotel.id} hotel={hotel} />
    })}
  </div>
}
