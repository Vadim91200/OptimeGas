import { useState } from "react";
import { GasStation } from "./GasStation";

type FuelType = 'Gazole' | 'SP95' | 'SP98' | 'E85' | 'GPLc';

type FormValues = {
    fuelType: FuelType;
    maxDistance: number;
};
function correspondance(searchFuel: string, station :GasStation): number {
    switch (searchFuel) {
        case 'Gazole':
            return station.fields.gazole_prix;
        case 'SP95':
            return station.fields.sp95_prix;
        case 'SP98':
            return station.fields.sp98_prix;
        case 'E85':
            return station.fields.e85_prix;
        case 'GPLc':
            return station.fields.gplc_prix;
        default:
            return 0;
  }
}

export { FormValues, FuelType, correspondance};