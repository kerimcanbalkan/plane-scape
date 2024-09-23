"use client"

import { useEffect, useState } from 'react';
import CustomSelect from './CustomSelect';
import axios from 'axios';
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { Option } from './CustomSelect';

export interface Destination {
  city: string;
  country: string;
  iata: string;
  publicName: {
    english: string
  }
}

type Props = {
  className?: string;
  placeholder?: string;
  icon?: IconDefinition;
  onChange: (label:string, value: string) => void;
  selected: string
}

export default function DestinationSelect  ({className="",  placeholder="", icon, onChange, selected=""}:Props)  {
    const [destinations, setDestinations] = useState<Option[]>([]);
    // Fetch the destinations
    useEffect(() => {
        const fetchDestinations = async () => {
            try {
                const response = await axios.get('/api/destinations');
                const data = response.data.data;
                const destinations = data
                .filter((val: Destination) => (val.city || val.publicName.english) && val.country && val.iata) // Exclude items without city or iata
                .map((val: Destination) => ({
                    label: `${val.city ? val.city+", " : ""}${val.publicName.english}, ${val.country}`,
                    value: val.iata,
                }));
                setDestinations(destinations)
            } catch (error) {
                console.error('Error fetching destinations:', error);
            }
        };

        fetchDestinations();
    }, []);

  return (
      <CustomSelect options={destinations} icon={icon} onChange={onChange} className={className} selected={selected}/>
  );
};
