import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AutocompletePrediction, DistanceMatrixResult, GeocodeResult, NearbyPlace, ReverseGeocodeResult } from './googlemap.interface';


@Injectable()
export class GooglemapService {
  private readonly apiKey: string;
  private readonly baseUrl = 'https://maps.googleapis.com/maps/api';

  constructor(private readonly configService: ConfigService) {
    const apiKey = this.configService.get<string>('GOOGLE_MAPS_API_KEY');
    if (!apiKey) {
      throw new Error('GOOGLE_MAPS_API_KEY is required');
    }
    this.apiKey = apiKey;
  }

  /**
   * Convert address to coordinates
   */
  async geocode(address: string): Promise<GeocodeResult> {
    try {
      const url = `${this.baseUrl}/geocode/json?address=${encodeURIComponent(address)}&key=${this.apiKey}`;
      const response = await fetch(url);
      const data = await response.json();

      if (data.status !== 'OK') {
        throw new HttpException(
          `Geocoding failed: ${data.status}`,
          HttpStatus.BAD_REQUEST,
        );
      }

      const result = data.results[0];
      const location = result.geometry.location;
      const addressComponents = result.address_components;

      // Extract address components
      const city = this.getAddressComponent(addressComponents, 'locality');
      const state = this.getAddressComponent(addressComponents, 'administrative_area_level_1');
      const country = this.getAddressComponent(addressComponents, 'country');
      const zipcode = this.getAddressComponent(addressComponents, 'postal_code');

      return {
        latitude: location.lat,
        longitude: location.lng,
        formatted_address: result.formatted_address,
        city,
        state,
        country,
        zipcode,
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Geocoding service unavailable',
        HttpStatus.SERVICE_UNAVAILABLE,
      );
    }
  }

  /**
   * Convert coordinates to address
   */
  async reverseGeocode(latitude: number, longitude: number): Promise<ReverseGeocodeResult> {
    try {
      const url = `${this.baseUrl}/geocode/json?latlng=${latitude},${longitude}&key=${this.apiKey}`;
      const response = await fetch(url);
      const data = await response.json();

      if (data.status !== 'OK') {
        throw new HttpException(
          `Reverse geocoding failed: ${data.status}`,
          HttpStatus.BAD_REQUEST,
        );
      }

      const result = data.results[0];
      const addressComponents = result.address_components;

      const city = this.getAddressComponent(addressComponents, 'locality');
      const state = this.getAddressComponent(addressComponents, 'administrative_area_level_1');
      const country = this.getAddressComponent(addressComponents, 'country');
      const zipcode = this.getAddressComponent(addressComponents, 'postal_code');

      return {
        address: result.formatted_address,
        city,
        state,
        country,
        zipcode,
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Reverse geocoding service unavailable',
        HttpStatus.SERVICE_UNAVAILABLE,
      );
    }
  }

  /**
   * Find nearby places
   */
  async findNearbyPlaces(
    latitude: number,
    longitude: number,
    radius: number = 1000,
    type?: string,
  ): Promise<NearbyPlace[]> {
    try {
      let url = `${this.baseUrl}/place/nearbysearch/json?location=${latitude},${longitude}&radius=${radius}&key=${this.apiKey}`;
      if (type) {
        url += `&type=${type}`;
      }

      const response = await fetch(url);
      const data = await response.json();

      if (data.status !== 'OK' && data.status !== 'ZERO_RESULTS') {
        throw new HttpException(
          `Places search failed: ${data.status}`,
          HttpStatus.BAD_REQUEST,
        );
      }

      return data.results.map((place: any) => ({
        name: place.name,
        address: place.vicinity,
        latitude: place.geometry.location.lat,
        longitude: place.geometry.location.lng,
        distance: this.calculateDistance(
          latitude,
          longitude,
          place.geometry.location.lat,
          place.geometry.location.lng,
        ),
        place_type: type || 'unknown',
        icon_url: place.icon,
        place_id: place.place_id,
      }));
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Places search service unavailable',
        HttpStatus.SERVICE_UNAVAILABLE,
      );
    }
  }

  /**
   * Get place autocomplete suggestions
   */
  async getAutocompleteSuggestions(
    input: string,
    types?: string,
    sessionToken?: string,
  ): Promise<AutocompletePrediction[]> {
    try {
      let url = `${this.baseUrl}/place/autocomplete/json?input=${encodeURIComponent(input)}&key=${this.apiKey}`;
      if (types) {
        url += `&types=${types}`;
      }
      if (sessionToken) {
        url += `&sessiontoken=${sessionToken}`;
      }

      const response = await fetch(url);
      const data = await response.json();

      if (data.status !== 'OK' && data.status !== 'ZERO_RESULTS') {
        throw new HttpException(
          `Autocomplete failed: ${data.status}`,
          HttpStatus.BAD_REQUEST,
        );
      }

      return data.predictions.map((prediction: any) => ({
        description: prediction.description,
        place_id: prediction.place_id,
        types: prediction.types,
      }));
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Autocomplete service unavailable',
        HttpStatus.SERVICE_UNAVAILABLE,
      );
    }
  }

  /**
   * Calculate distance and duration between locations
   */
  async getDistanceMatrix(
    origins: string[],
    destinations: string[],
    mode: 'driving' | 'walking' | 'bicycling' | 'transit' = 'driving',
  ): Promise<DistanceMatrixResult[]> {
    try {
      const url = `${this.baseUrl}/distancematrix/json?origins=${origins.join('|')}&destinations=${destinations.join('|')}&mode=${mode}&key=${this.apiKey}`;
      const response = await fetch(url);
      const data = await response.json();

      if (data.status !== 'OK') {
        throw new HttpException(
          `Distance matrix failed: ${data.status}`,
          HttpStatus.BAD_REQUEST,
        );
      }

      const results: DistanceMatrixResult[] = [];
      const rows = data.rows;

      for (let i = 0; i < rows.length; i++) {
        const elements = rows[i].elements;
        for (let j = 0; j < elements.length; j++) {
          const element = elements[j];
          if (element.status === 'OK') {
            results.push({
              origin: origins[i],
              destination: destinations[j],
              distance: element.distance.text,
              duration: element.duration.text,
            });
          }
        }
      }

      return results;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Distance matrix service unavailable',
        HttpStatus.SERVICE_UNAVAILABLE,
      );
    }
  }

  /**
   * Get place details by place_id
   */
  async getPlaceDetails(placeId: string): Promise<any> {
    try {
      const url = `${this.baseUrl}/place/details/json?place_id=${placeId}&fields=name,formatted_address,geometry,types,photos,rating,user_ratings_total,opening_hours,website,formatted_phone_number&key=${this.apiKey}`;
      const response = await fetch(url);
      const data = await response.json();

      if (data.status !== 'OK') {
        throw new HttpException(
          `Place details failed: ${data.status}`,
          HttpStatus.BAD_REQUEST,
        );
      }

      return data.result;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Place details service unavailable',
        HttpStatus.SERVICE_UNAVAILABLE,
      );
    }
  }

  /**
   * Helper method to extract address components
   */
  private getAddressComponent(components: any[], type: string): string | undefined {
    const component = components.find(comp => comp.types.includes(type));
    return component ? component.long_name : undefined;
  }

  /**
   * Helper method to calculate distance between two points using Haversine formula
   */
  private calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = this.deg2rad(lat2 - lat1);
    const dLon = this.deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in kilometers
    return Math.round(distance * 1000); // Convert to meters
  }

  private deg2rad(deg: number): number {
    return deg * (Math.PI / 180);
  }
}
