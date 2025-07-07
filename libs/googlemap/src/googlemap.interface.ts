export interface GeocodeResult {
    latitude: number;
    longitude: number;
    formatted_address: string;
    city?: string;
    state?: string;
    country?: string;
    zipcode?: string;
  }
  
  export interface ReverseGeocodeResult {
    address: string;
    city?: string;
    state?: string;
    country?: string;
    zipcode?: string;
  }
  
  export interface NearbyPlace {
    name: string;
    address: string;
    latitude: number;
    longitude: number;
    distance: number;
    place_type: string;
    icon_url: string;
    place_id: string;
  }
  
  export interface AutocompletePrediction {
    description: string;
    place_id: string;
    types: string[];
  }
  
  export interface DistanceMatrixResult {
    origin: string;
    destination: string;
    distance: string;
    duration: string;
  }