"use client"

import { Suspense, useEffect, useState } from 'react';
import CustomSelect from './CustomSelect';
import axios from 'axios';
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { icon } from '@fortawesome/fontawesome-svg-core';
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
  options: Option[];
  selected: string
}

export default function DestinationSelect  ({className="",  placeholder="", icon, onChange, options, selected=""}:Props)  {
  return (
      <CustomSelect options={options} icon={icon} onChange={onChange} className={className} selected={selected}/>
  );
};
