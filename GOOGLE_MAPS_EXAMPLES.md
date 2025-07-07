# Google Maps API Examples

## Test Cases và Examples

### 1. Geocoding Examples

#### Example 1: Địa chỉ đơn giản
```bash
curl -X POST http://localhost:3000/google-maps/geocode \
  -H "Content-Type: application/json" \
  -d '{
    "address": "123 Main St, New York, NY"
  }'
```

**Expected Response:**
```json
{
  "latitude": 40.7128,
  "longitude": -74.0060,
  "formatted_address": "123 Main St, New York, NY 10001, USA",
  "city": "New York",
  "state": "NY",
  "country": "USA",
  "zipcode": "10001"
}
```

#### Example 2: Địa chỉ Việt Nam
```bash
curl -X POST http://localhost:3000/google-maps/geocode \
  -H "Content-Type: application/json" \
  -d '{
    "address": "123 Nguyễn Huệ, Quận 1, TP.HCM"
  }'
```

**Expected Response:**
```json
{
  "latitude": 10.7769,
  "longitude": 106.7009,
  "formatted_address": "123 Nguyễn Huệ, Bến Nghé, Quận 1, Thành phố Hồ Chí Minh, Vietnam",
  "city": "Thành phố Hồ Chí Minh",
  "state": "Thành phố Hồ Chí Minh",
  "country": "Vietnam",
  "zipcode": null
}
```

### 2. Reverse Geocoding Examples

#### Example 1: Tọa độ New York
```bash
curl -X POST http://localhost:3000/google-maps/reverse-geocode \
  -H "Content-Type: application/json" \
  -d '{
    "latitude": 40.7128,
    "longitude": -74.0060
  }'
```

**Expected Response:**
```json
{
  "address": "123 Main St, New York, NY 10001, USA",
  "city": "New York",
  "state": "NY",
  "country": "USA",
  "zipcode": "10001"
}
```

### 3. Nearby Places Examples

#### Example 1: Tìm nhà hàng gần Times Square
```bash
curl "http://localhost:3000/google-maps/nearby-places?latitude=40.7580&longitude=-73.9855&radius=1000&type=restaurant"
```

**Expected Response:**
```json
{
  "places": [
    {
      "name": "Carmine's Italian Restaurant",
      "address": "200 W 44th St",
      "latitude": 40.7582,
      "longitude": -73.9857,
      "distance": 45,
      "place_type": "restaurant",
      "icon_url": "https://maps.googleapis.com/maps/api/place/icon",
      "place_id": "ChIJ..."
    },
    {
      "name": "Sardi's Restaurant",
      "address": "234 W 44th St",
      "latitude": 40.7585,
      "longitude": -73.9859,
      "distance": 78,
      "place_type": "restaurant",
      "icon_url": "https://maps.googleapis.com/maps/api/place/icon",
      "place_id": "ChIJ..."
    }
  ]
}
```

#### Example 2: Tìm trường học gần Central Park
```bash
curl "http://localhost:3000/google-maps/nearby-places?latitude=40.7829&longitude=-73.9654&radius=2000&type=school"
```

### 4. Autocomplete Examples

#### Example 1: Gợi ý địa chỉ
```bash
curl "http://localhost:3000/google-maps/autocomplete?input=New York&types=address"
```

**Expected Response:**
```json
{
  "predictions": [
    {
      "description": "New York, NY, USA",
      "place_id": "ChIJOwg_06VPwokRYv534QaPC8g",
      "types": ["locality", "political", "geocode"]
    },
    {
      "description": "New York, NY 10001, USA",
      "place_id": "ChIJaXQRs6lZwokRY6EFpJnhNNE",
      "types": ["postal_code"]
    }
  ]
}
```

### 5. Distance Matrix Examples

#### Example 1: Tính khoảng cách từ Times Square đến Central Park
```bash
curl -X POST http://localhost:3000/google-maps/distance-matrix \
  -H "Content-Type: application/json" \
  -d '{
    "origins": ["40.7580,-73.9855"],
    "destinations": ["40.7829,-73.9654"],
    "mode": "driving"
  }'
```

**Expected Response:**
```json
{
  "distances": [
    {
      "origin": "40.7580,-73.9855",
      "destination": "40.7829,-73.9654",
      "distance": "3.2 km",
      "duration": "12 mins"
    }
  ]
}
```

#### Example 2: So sánh các chế độ di chuyển
```bash
# Driving
curl -X POST http://localhost:3000/google-maps/distance-matrix \
  -H "Content-Type: application/json" \
  -d '{
    "origins": ["40.7580,-73.9855"],
    "destinations": ["40.7829,-73.9654"],
    "mode": "driving"
  }'

# Walking
curl -X POST http://localhost:3000/google-maps/distance-matrix \
  -H "Content-Type: application/json" \
  -d '{
    "origins": ["40.7580,-73.9855"],
    "destinations": ["40.7829,-73.9654"],
    "mode": "walking"
  }'

# Transit
curl -X POST http://localhost:3000/google-maps/distance-matrix \
  -H "Content-Type: application/json" \
  -d '{
    "origins": ["40.7580,-73.9855"],
    "destinations": ["40.7829,-73.9654"],
    "mode": "transit"
  }'
```

### 6. Property-Specific Examples

#### Example 1: Tạo property với tự động geocoding
```bash
curl -X POST http://localhost:3000/property/create \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Beautiful Apartment in Manhattan",
    "address": "350 5th Ave, New York, NY",
    "price": 850000,
    "bedrooms": 2,
    "bathrooms": 2,
    "area_size": 1200,
    "property_type": "APARTMENT"
  }'
```

**Expected Response:**
```json
{
  "id": 1,
  "title": "Beautiful Apartment in Manhattan",
  "address": "350 5th Ave, New York, NY",
  "latitude": 40.7484,
  "longitude": -73.9857,
  "city": "New York",
  "state": "NY",
  "country": "USA",
  "zipcode": "10118",
  "price": 850000,
  "bedrooms": 2,
  "bathrooms": 2,
  "area_size": 1200,
  "property_type": "APARTMENT",
  "created_at": "2024-01-15T10:30:00Z"
}
```

#### Example 2: Lấy tiện ích lân cận cho property
```bash
curl "http://localhost:3000/google-maps/property/1/amenities?latitude=40.7484&longitude=-73.9857&radius=2000"
```

**Expected Response:**
```json
{
  "property_id": 1,
  "nearby_places": [
    {
      "name": "Empire State Building",
      "address": "350 5th Ave",
      "latitude": 40.7484,
      "longitude": -73.9857,
      "distance": 0,
      "place_type": "tourist_attraction",
      "icon_url": "https://maps.googleapis.com/maps/api/place/icon",
      "place_id": "ChIJaXQRs6lZwokRY6EFpJnhNNE"
    },
    {
      "name": "Madison Square Garden",
      "address": "4 Pennsylvania Plaza",
      "latitude": 40.7505,
      "longitude": -73.9934,
      "distance": 450,
      "place_type": "stadium",
      "icon_url": "https://maps.googleapis.com/maps/api/place/icon",
      "place_id": "ChIJ..."
    }
  ]
}
```

#### Example 3: Tìm trường học gần property
```bash
curl "http://localhost:3000/google-maps/property/1/nearby-schools?latitude=40.7484&longitude=-73.9857&radius=2000"
```

#### Example 4: Tìm bệnh viện gần property
```bash
curl "http://localhost:3000/google-maps/property/1/nearby-hospitals?latitude=40.7484&longitude=-73.9857&radius=3000"
```

### 7. Place Details Examples

#### Example 1: Lấy chi tiết địa điểm
```bash
curl "http://localhost:3000/google-maps/place-details/ChIJN1t_tDeuEmsRUsoyG83frY4"
```

**Expected Response:**
```json
{
  "name": "Empire State Building",
  "formatted_address": "350 5th Ave, New York, NY 10118, USA",
  "geometry": {
    "location": {
      "lat": 40.7484,
      "lng": -73.9857
    }
  },
  "types": ["tourist_attraction", "establishment"],
  "rating": 4.6,
  "user_ratings_total": 125000,
  "website": "https://www.esbnyc.com",
  "formatted_phone_number": "+1 212-736-3100"
}
```

## Test Scenarios cho Frontend

### 1. Property Search với Location Filter
```javascript
// Tìm property trong bán kính 5km từ một địa điểm
const searchProperties = async (centerAddress, radius = 5000) => {
  // 1. Geocode địa chỉ trung tâm
  const geocodeResponse = await fetch('/google-maps/geocode', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ address: centerAddress })
  });
  const { latitude, longitude } = await geocodeResponse.json();

  // 2. Tìm properties trong bán kính
  const propertiesResponse = await fetch(`/property?latitude=${latitude}&longitude=${longitude}&radius=${radius}`);
  return propertiesResponse.json();
};
```

### 2. Property Detail với Nearby Amenities
```javascript
// Hiển thị property detail với tiện ích lân cận
const loadPropertyDetails = async (propertyId, latitude, longitude) => {
  const [property, amenities] = await Promise.all([
    fetch(`/property/detail/${propertyId}`).then(r => r.json()),
    fetch(`/google-maps/property/${propertyId}/amenities?latitude=${latitude}&longitude=${longitude}`).then(r => r.json())
  ]);

  return { property, amenities };
};
```

### 3. Property Creation với Address Autocomplete
```javascript
// Tạo property form với autocomplete
const setupAddressAutocomplete = () => {
  const addressInput = document.getElementById('address-input');
  
  addressInput.addEventListener('input', async (e) => {
    const input = e.target.value;
    if (input.length > 2) {
      const response = await fetch(`/google-maps/autocomplete?input=${encodeURIComponent(input)}&types=address`);
      const { predictions } = await response.json();
      
      // Hiển thị suggestions
      showSuggestions(predictions);
    }
  });
};

const selectAddress = async (placeId) => {
  const response = await fetch(`/google-maps/place-details/${placeId}`);
  const place = await response.json();
  
  // Fill form fields
  document.getElementById('address').value = place.formatted_address;
  document.getElementById('latitude').value = place.geometry.location.lat;
  document.getElementById('longitude').value = place.geometry.location.lng;
};
```

### 4. Interactive Map với Property Markers
```javascript
// Hiển thị bản đồ với properties
const displayPropertiesOnMap = async (properties) => {
  const map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: 40.7128, lng: -74.0060 },
    zoom: 12
  });

  properties.forEach(property => {
    const marker = new google.maps.Marker({
      position: { lat: property.latitude, lng: property.longitude },
      map: map,
      title: property.title
    });

    // Info window với property details
    const infoWindow = new google.maps.InfoWindow({
      content: `
        <div>
          <h3>${property.title}</h3>
          <p>${property.address}</p>
          <p>$${property.price.toLocaleString()}</p>
          <p>${property.bedrooms} beds, ${property.bathrooms} baths</p>
        </div>
      `
    });

    marker.addListener('click', () => {
      infoWindow.open(map, marker);
    });
  });
};
```

## Error Handling Examples

### 1. Geocoding Error
```javascript
try {
  const response = await fetch('/google-maps/geocode', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ address: 'Invalid Address' })
  });
  
  if (!response.ok) {
    const error = await response.json();
    console.error('Geocoding failed:', error.message);
    // Show user-friendly error message
    showError('Không thể tìm thấy địa chỉ này. Vui lòng thử lại.');
  }
} catch (error) {
  console.error('Network error:', error);
  showError('Lỗi kết nối. Vui lòng thử lại sau.');
}
```

### 2. Rate Limiting
```javascript
const geocodeWithRetry = async (address, maxRetries = 3) => {
  for (let i = 0; i < maxRetries; i++) {
    try {
      const response = await fetch('/google-maps/geocode', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ address })
      });
      
      if (response.status === 429) { // Rate limited
        const delay = Math.pow(2, i) * 1000; // Exponential backoff
        await new Promise(resolve => setTimeout(resolve, delay));
        continue;
      }
      
      return await response.json();
    } catch (error) {
      if (i === maxRetries - 1) throw error;
    }
  }
};
```

## Performance Optimization

### 1. Caching Geocoding Results
```javascript
const geocodeCache = new Map();

const geocodeWithCache = async (address) => {
  if (geocodeCache.has(address)) {
    return geocodeCache.get(address);
  }
  
  const result = await fetch('/google-maps/geocode', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ address })
  }).then(r => r.json());
  
  geocodeCache.set(address, result);
  return result;
};
```

### 2. Batch Geocoding
```javascript
const batchGeocode = async (addresses) => {
  const promises = addresses.map(address => 
    fetch('/google-maps/geocode', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ address })
    }).then(r => r.json())
  );
  
  return Promise.all(promises);
};
``` 