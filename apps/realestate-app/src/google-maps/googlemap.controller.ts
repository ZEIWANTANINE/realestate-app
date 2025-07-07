import { Body, Controller, Get, Post, Query, Param } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { GooglemapService } from '@app/googlemap';
import {
  GeocodeRequestDto,
  GeocodeResponseDto,
  ReverseGeocodeRequestDto,
  ReverseGeocodeResponseDto,
  NearbyPlacesRequestDto,
  NearbyPlacesResponseDto,
  AutocompleteRequestDto,
  AutocompleteResponseDto,
  DistanceMatrixRequestDto,
  DistanceMatrixResponseDto,
  PlaceDetailsRequestDto,
  PlaceDetailsResponseDto,
  PropertyLocationDto,
  PropertyNearbyPlacesDto,
  PropertyDistanceDto,
  PlaceType,
} from './googlemap.dto';

@Controller('google-maps')
export class GooglemapController {
  constructor(
    private readonly googlemapService: GooglemapService
  ) {}

  /**
   * Convert address to coordinates
   * POST /google-maps/geocode
   */
  @Post('geocode')
  async geocode(@Body() body: GeocodeRequestDto): Promise<GeocodeResponseDto> {
    const result = await this.googlemapService.geocode(body.address);
    return plainToInstance(GeocodeResponseDto, result, { excludeExtraneousValues: true });
  }

  /**
   * Convert coordinates to address
   * POST /google-maps/reverse-geocode
   */
  @Post('reverse-geocode')
  async reverseGeocode(@Body() body: ReverseGeocodeRequestDto): Promise<ReverseGeocodeResponseDto> {
    const result = await this.googlemapService.reverseGeocode(body.latitude, body.longitude);
    return plainToInstance(ReverseGeocodeResponseDto, result, { excludeExtraneousValues: true });
  }

  /**
   * Find nearby places
   * GET /google-maps/nearby-places?latitude=40.7128&longitude=-74.0060&radius=1000&type=restaurant
   */
  @Get('nearby-places')
  async findNearbyPlaces(@Query() query: NearbyPlacesRequestDto): Promise<NearbyPlacesResponseDto> {
    const places = await this.googlemapService.findNearbyPlaces(
      query.latitude,
      query.longitude,
      query.radius,
      query.type,
    );
    return plainToInstance(NearbyPlacesResponseDto, { places }, { excludeExtraneousValues: true });
  }

  /**
   * Get autocomplete suggestions
   * GET /google-maps/autocomplete?input=New York&types=address
   */
  @Get('autocomplete')
  async getAutocompleteSuggestions(@Query() query: AutocompleteRequestDto): Promise<AutocompleteResponseDto> {
    const predictions = await this.googlemapService.getAutocompleteSuggestions(
      query.input,
      query.types,
      query.sessionToken,
    );
    return plainToInstance(AutocompleteResponseDto, { predictions }, { excludeExtraneousValues: true });
  }

  /**
   * Calculate distance matrix
   * POST /google-maps/distance-matrix
   */
  @Post('distance-matrix')
  async getDistanceMatrix(@Body() body: DistanceMatrixRequestDto): Promise<DistanceMatrixResponseDto> {
    const distances = await this.googlemapService.getDistanceMatrix(
      body.origins,
      body.destinations,
      body.mode,
    );
    return plainToInstance(DistanceMatrixResponseDto, { distances }, { excludeExtraneousValues: true });
  }

  /**
   * Get place details
   * GET /google-maps/place-details/:placeId
   */
  @Get('place-details/:placeId')
  async getPlaceDetails(@Param('placeId') placeId: string): Promise<PlaceDetailsResponseDto> {
    const result = await this.googlemapService.getPlaceDetails(placeId);
    return plainToInstance(PlaceDetailsResponseDto, result, { excludeExtraneousValues: true });
  }

  /**
   * Get property location with geocoding
   * POST /google-maps/property-location
   */
  @Post('property-location')
  async getPropertyLocation(@Body() body: GeocodeRequestDto): Promise<PropertyLocationDto> {
    const result = await this.googlemapService.geocode(body.address);
    return plainToInstance(PropertyLocationDto, {
      address: body.address,
      latitude: result.latitude,
      longitude: result.longitude,
      city: result.city,
      state: result.state,
      country: result.country,
      zipcode: result.zipcode,
    }, { excludeExtraneousValues: true });
  }

  /**
   * Get nearby places for a property
   * GET /google-maps/property/:propertyId/nearby-places?radius=1000&type=restaurant
   */
  @Get('property/:propertyId/nearby-places')
  async getPropertyNearbyPlaces(
    @Param('propertyId') propertyId: number,
    @Query('latitude') latitude: number,
    @Query('longitude') longitude: number,
    @Query('radius') radius: number = 1000,
    @Query('type') type?: PlaceType,
  ): Promise<PropertyNearbyPlacesDto> {
    const places = await this.googlemapService.findNearbyPlaces(latitude, longitude, radius, type);
    return plainToInstance(PropertyNearbyPlacesDto, {
      property_id: propertyId,
      nearby_places: places,
    }, { excludeExtraneousValues: true });
  }

  /**
   * Calculate distances from property to destinations
   * POST /google-maps/property/:propertyId/distances
   */
  @Post('property/:propertyId/distances')
  async getPropertyDistances(
    @Param('propertyId') propertyId: number,
    @Body() body: { origin: string; destinations: string[]; mode?: string },
  ): Promise<PropertyDistanceDto> {
    const distances = await this.googlemapService.getDistanceMatrix(
      [body.origin],
      body.destinations,
      body.mode as any,
    );
    return plainToInstance(PropertyDistanceDto, {
      property_id: propertyId,
      distances,
    }, { excludeExtraneousValues: true });
  }

  /**
   * Get nearby schools for a property
   * GET /google-maps/property/:propertyId/nearby-schools
   */
  @Get('property/:propertyId/nearby-schools')
  async getPropertyNearbySchools(
    @Param('propertyId') propertyId: number,
    @Query('latitude') latitude: number,
    @Query('longitude') longitude: number,
    @Query('radius') radius: number = 2000,
  ): Promise<PropertyNearbyPlacesDto> {
    const schools = await this.googlemapService.findNearbyPlaces(
      latitude,
      longitude,
      radius,
      PlaceType.SCHOOL,
    );
    return plainToInstance(PropertyNearbyPlacesDto, {
      property_id: propertyId,
      nearby_places: schools,
    }, { excludeExtraneousValues: true });
  }

  /**
   * Get nearby hospitals for a property
   * GET /google-maps/property/:propertyId/nearby-hospitals
   */
  @Get('property/:propertyId/nearby-hospitals')
  async getPropertyNearbyHospitals(
    @Param('propertyId') propertyId: number,
    @Query('latitude') latitude: number,
    @Query('longitude') longitude: number,
    @Query('radius') radius: number = 3000,
  ): Promise<PropertyNearbyPlacesDto> {
    const hospitals = await this.googlemapService.findNearbyPlaces(
      latitude,
      longitude,
      radius,
      PlaceType.HOSPITAL,
    );
    return plainToInstance(PropertyNearbyPlacesDto, {
      property_id: propertyId,
      nearby_places: hospitals,
    }, { excludeExtraneousValues: true });
  }

  /**
   * Get nearby shopping malls for a property
   * GET /google-maps/property/:propertyId/nearby-shopping
   */
  @Get('property/:propertyId/nearby-shopping')
  async getPropertyNearbyShopping(
    @Param('propertyId') propertyId: number,
    @Query('latitude') latitude: number,
    @Query('longitude') longitude: number,
    @Query('radius') radius: number = 2000,
  ): Promise<PropertyNearbyPlacesDto> {
    const shopping = await this.googlemapService.findNearbyPlaces(
      latitude,
      longitude,
      radius,
      PlaceType.SHOPPING_MALL,
    );
    return plainToInstance(PropertyNearbyPlacesDto, {
      property_id: propertyId,
      nearby_places: shopping,
    }, { excludeExtraneousValues: true });
  }

  /**
   * Get nearby restaurants for a property
   * GET /google-maps/property/:propertyId/nearby-restaurants
   */
  @Get('property/:propertyId/nearby-restaurants')
  async getPropertyNearbyRestaurants(
    @Param('propertyId') propertyId: number,
    @Query('latitude') latitude: number,
    @Query('longitude') longitude: number,
    @Query('radius') radius: number = 1500,
  ): Promise<PropertyNearbyPlacesDto> {
    const restaurants = await this.googlemapService.findNearbyPlaces(
      latitude,
      longitude,
      radius,
      PlaceType.RESTAURANT,
    );
    return plainToInstance(PropertyNearbyPlacesDto, {
      property_id: propertyId,
      nearby_places: restaurants,
    }, { excludeExtraneousValues: true });
  }

  /**
   * Get nearby public transport for a property
   * GET /google-maps/property/:propertyId/nearby-transport
   */
  @Get('property/:propertyId/nearby-transport')
  async getPropertyNearbyTransport(
    @Param('propertyId') propertyId: number,
    @Query('latitude') latitude: number,
    @Query('longitude') longitude: number,
    @Query('radius') radius: number = 1000,
  ): Promise<PropertyNearbyPlacesDto> {
    // Get multiple transport types
    const [busStations, trainStations, subwayStations] = await Promise.all([
      this.googlemapService.findNearbyPlaces(latitude, longitude, radius, PlaceType.BUS_STATION),
      this.googlemapService.findNearbyPlaces(latitude, longitude, radius, PlaceType.TRAIN_STATION),
      this.googlemapService.findNearbyPlaces(latitude, longitude, radius, PlaceType.SUBWAY_STATION),
    ]);

    const allTransport = [...busStations, ...trainStations, ...subwayStations];
    return plainToInstance(PropertyNearbyPlacesDto, {
      property_id: propertyId,
      nearby_places: allTransport,
    }, { excludeExtraneousValues: true });
  }

  /**
   * Get comprehensive nearby amenities for a property
   * GET /google-maps/property/:propertyId/amenities
   */
  @Get('property/:propertyId/amenities')
  async getPropertyAmenities(
    @Param('propertyId') propertyId: number,
    @Query('latitude') latitude: number,
    @Query('longitude') longitude: number,
    @Query('radius') radius: number = 2000,
  ): Promise<PropertyNearbyPlacesDto> {
    // Get multiple amenity types
    const [schools, hospitals, shopping, restaurants, banks, pharmacies] = await Promise.all([
      this.googlemapService.findNearbyPlaces(latitude, longitude, radius, PlaceType.SCHOOL),
      this.googlemapService.findNearbyPlaces(latitude, longitude, radius, PlaceType.HOSPITAL),
      this.googlemapService.findNearbyPlaces(latitude, longitude, radius, PlaceType.SHOPPING_MALL),
      this.googlemapService.findNearbyPlaces(latitude, longitude, radius, PlaceType.RESTAURANT),
      this.googlemapService.findNearbyPlaces(latitude, longitude, radius, PlaceType.BANK),
      this.googlemapService.findNearbyPlaces(latitude, longitude, radius, PlaceType.PHARMACY),
    ]);

    const allAmenities = [...schools, ...hospitals, ...shopping, ...restaurants, ...banks, ...pharmacies];
    return plainToInstance(PropertyNearbyPlacesDto, {
      property_id: propertyId,
      nearby_places: allAmenities,
    }, { excludeExtraneousValues: true });
  }
}
