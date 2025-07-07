import { Expose, Type } from 'class-transformer';
import {
  IsString,
  IsNumber,
  IsOptional,
  IsEnum,
  IsArray,
  IsPositive,
  Min,
  Max,
} from 'class-validator';

export enum TravelMode {
  DRIVING = 'driving',
  WALKING = 'walking',
  BICYCLING = 'bicycling',
  TRANSIT = 'transit',
}

export enum PlaceType {
  RESTAURANT = 'restaurant',
  HOSPITAL = 'hospital',
  SCHOOL = 'school',
  SHOPPING_MALL = 'shopping_mall',
  BANK = 'bank',
  GAS_STATION = 'gas_station',
  PHARMACY = 'pharmacy',
  POST_OFFICE = 'post_office',
  POLICE = 'police',
  FIRE_STATION = 'fire_station',
  LIBRARY = 'library',
  PARK = 'park',
  GYM = 'gym',
  MOVIE_THEATER = 'movie_theater',
  MUSEUM = 'museum',
  ZOO = 'zoo',
  AIRPORT = 'airport',
  TRAIN_STATION = 'train_station',
  BUS_STATION = 'bus_station',
  SUBWAY_STATION = 'subway_station',
}

export class GeocodeRequestDto {
  @Expose()
  @IsString()
  address: string;
}

export class GeocodeResponseDto {
  @Expose()
  latitude: number;

  @Expose()
  longitude: number;

  @Expose()
  formatted_address: string;

  @Expose()
  @IsOptional()
  city?: string;

  @Expose()
  @IsOptional()
  state?: string;

  @Expose()
  @IsOptional()
  country?: string;

  @Expose()
  @IsOptional()
  zipcode?: string;
}

export class ReverseGeocodeRequestDto {
  @Expose()
  @Type(() => Number)
  @IsNumber()
  @Min(-90)
  @Max(90)
  latitude: number;

  @Expose()
  @Type(() => Number)
  @IsNumber()
  @Min(-180)
  @Max(180)
  longitude: number;
}

export class ReverseGeocodeResponseDto {
  @Expose()
  address: string;

  @Expose()
  @IsOptional()
  city?: string;

  @Expose()
  @IsOptional()
  state?: string;

  @Expose()
  @IsOptional()
  country?: string;

  @Expose()
  @IsOptional()
  zipcode?: string;
}

export class NearbyPlacesRequestDto {
  @Expose()
  @Type(() => Number)
  @IsNumber()
  @Min(-90)
  @Max(90)
  latitude: number;

  @Expose()
  @Type(() => Number)
  @IsNumber()
  @Min(-180)
  @Max(180)
  longitude: number;

  @Expose()
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  @Min(1)
  @Max(50000)
  radius?: number = 1000;

  @Expose()
  @IsOptional()
  @IsEnum(PlaceType)
  type?: PlaceType;
}

export class NearbyPlaceDto {
  @Expose()
  name: string;

  @Expose()
  address: string;

  @Expose()
  latitude: number;

  @Expose()
  longitude: number;

  @Expose()
  distance: number;

  @Expose()
  place_type: string;

  @Expose()
  icon_url: string;

  @Expose()
  place_id: string;
}

export class NearbyPlacesResponseDto {
  @Expose()
  @Type(() => NearbyPlaceDto)
  places: NearbyPlaceDto[];
}

export class AutocompleteRequestDto {
  @Expose()
  @IsString()
  input: string;

  @Expose()
  @IsOptional()
  @IsString()
  types?: string;

  @Expose()
  @IsOptional()
  @IsString()
  sessionToken?: string;
}

export class AutocompletePredictionDto {
  @Expose()
  description: string;

  @Expose()
  place_id: string;

  @Expose()
  @IsArray()
  types: string[];
}

export class AutocompleteResponseDto {
  @Expose()
  @Type(() => AutocompletePredictionDto)
  predictions: AutocompletePredictionDto[];
}

export class DistanceMatrixRequestDto {
  @Expose()
  @IsArray()
  @IsString({ each: true })
  origins: string[];

  @Expose()
  @IsArray()
  @IsString({ each: true })
  destinations: string[];

  @Expose()
  @IsOptional()
  @IsEnum(TravelMode)
  mode?: TravelMode = TravelMode.DRIVING;
}

export class DistanceMatrixResultDto {
  @Expose()
  origin: string;

  @Expose()
  destination: string;

  @Expose()
  distance: string;

  @Expose()
  duration: string;
}

export class DistanceMatrixResponseDto {
  @Expose()
  @Type(() => DistanceMatrixResultDto)
  distances: DistanceMatrixResultDto[];
}

export class PlaceDetailsRequestDto {
  @Expose()
  @IsString()
  place_id: string;
}

export class PlaceDetailsResponseDto {
  @Expose()
  name: string;

  @Expose()
  formatted_address: string;

  @Expose()
  geometry: any;

  @Expose()
  types: string[];

  @Expose()
  @IsOptional()
  photos?: any[];

  @Expose()
  @IsOptional()
  rating?: number;

  @Expose()
  @IsOptional()
  user_ratings_total?: number;

  @Expose()
  @IsOptional()
  opening_hours?: any;

  @Expose()
  @IsOptional()
  website?: string;

  @Expose()
  @IsOptional()
  formatted_phone_number?: string;
}

// Property-specific DTOs for real estate features
export class PropertyLocationDto {
  @Expose()
  @IsString()
  address: string;

  @Expose()
  @Type(() => Number)
  @IsNumber()
  @Min(-90)
  @Max(90)
  latitude: number;

  @Expose()
  @Type(() => Number)
  @IsNumber()
  @Min(-180)
  @Max(180)
  longitude: number;

  @Expose()
  @IsOptional()
  @IsString()
  city?: string;

  @Expose()
  @IsOptional()
  @IsString()
  state?: string;

  @Expose()
  @IsOptional()
  @IsString()
  country?: string;

  @Expose()
  @IsOptional()
  @IsString()
  zipcode?: string;
}

export class PropertyNearbyPlacesDto {
  @Expose()
  property_id: number;

  @Expose()
  @Type(() => NearbyPlaceDto)
  nearby_places: NearbyPlaceDto[];
}

export class PropertyDistanceDto {
  @Expose()
  property_id: number;

  @Expose()
  @Type(() => DistanceMatrixResultDto)
  distances: DistanceMatrixResultDto[];
}
