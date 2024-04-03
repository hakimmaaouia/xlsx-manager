import {location} from '../data/location';
import {travel_class} from '../data/travel_class';
import {airports} from '../data/airports';
import { IRow } from '@/app/page';


export const isValidLocations=(item:string)=>{
return location.includes(item)
}
export const isValidTravelClass=(item:string)=>{
return travel_class.includes(item)
}

export const isValidTotalTravelers=(item:number)=>{
 return Number.isInteger(item) && item >= 1 && item <= 100;
}

export const isValidFlightDetails=(item:string)=>{
  console.log(item.split("/").every(detail => airports.includes(detail)),"teste",item)
    return item.split("/").every(detail => airports.includes(detail));
}

export const isValidData = (data: IRow[]): boolean => {
    return data.every((item) =>
      isValidLocations(item.Location) &&
      isValidTravelClass(item['Class of travel']) &&
      isValidTotalTravelers(item['Total Travelers']) &&
      isValidFlightDetails(item['Flight  Details'])
    );
  };