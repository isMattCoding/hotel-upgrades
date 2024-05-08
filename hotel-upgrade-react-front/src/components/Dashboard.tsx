import React, { useEffect, useState } from 'react';
import axios from 'axios';
import HotelsList, { type HotelType } from './Dashboard/HotelsList';

export function Dashboard() {
  const [hotels, setHotels] = useState<Array<HotelType> | null>(null);

  useEffect(() => {
    axios
      .get('http://localhost:8000/api/hotels')
      .then((response) => {
        setHotels(response.data);
      })
      .catch((error) => {
        console.error('Error fetching hotels:', error);
      });
  }, []);

  if (!hotels) {
    return <>Loading...</>
  }

  return <>
    <HotelsList hotels={hotels} />
  </>
}
