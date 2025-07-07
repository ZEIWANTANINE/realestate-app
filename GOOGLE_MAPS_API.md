# Google Maps API Documentation

## Tổng quan
Dự án bất động sản đã tích hợp Google Maps API để cung cấp các tính năng địa lý và bản đồ. Các API này giúp tự động hóa việc chuyển đổi địa chỉ thành tọa độ và ngược lại, tìm kiếm địa điểm lân cận, và tính toán khoảng cách.

## Cấu hình

### 1. Thêm API Key
Thêm biến môi trường vào file `.env`:
```env
GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
```

### 2. Kích hoạt các API cần thiết trong Google Cloud Console:
- Geocoding API
- Places API
- Distance Matrix API

## Các API Endpoints

### 1. Geocoding API

#### Chuyển đổi địa chỉ thành tọa độ
```http
POST /google-maps/geocode
Content-Type: application/json

{
  "address": "123 Main St, New York, NY"
}
```

**Response:**
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

### 2. Reverse Geocoding API

#### Chuyển đổi tọa độ thành địa chỉ
```http
POST /google-maps/reverse-geocode
Content-Type: application/json

{
  "latitude": 40.7128,
  "longitude": -74.0060
}
```

**Response:**
```json
{
  "address": "123 Main St, New York, NY 10001, USA",
  "city": "New York",
  "state": "NY",
  "country": "USA",
  "zipcode": "10001"
}
```

### 3. Nearby Places API

#### Tìm địa điểm lân cận
```http
GET /google-maps/nearby-places?latitude=40.7128&longitude=-74.0060&radius=1000&type=restaurant
```

**Parameters:**
- `latitude`: Vĩ độ (bắt buộc)
- `longitude`: Kinh độ (bắt buộc)
- `radius`: Bán kính tìm kiếm (mặc định: 1000m)
- `type`: Loại địa điểm (tùy chọn)

**Response:**
```json
{
  "places": [
    {
      "name": "Restaurant ABC",
      "address": "456 Oak St",
      "latitude": 40.7130,
      "longitude": -74.0050,
      "distance": 150,
      "place_type": "restaurant",
      "icon_url": "https://maps.googleapis.com/maps/api/place/icon",
      "place_id": "ChIJ..."
    }
  ]
}
```

### 4. Autocomplete API

#### Gợi ý địa chỉ khi nhập
```http
GET /google-maps/autocomplete?input=New York&types=address
```

**Parameters:**
- `input`: Chuỗi nhập (bắt buộc)
- `types`: Loại gợi ý (tùy chọn)
- `sessionToken`: Token phiên (tùy chọn)

**Response:**
```json
{
  "predictions": [
    {
      "description": "New York, NY, USA",
      "place_id": "ChIJOwg_06VPwokRYv534QaPC8g",
      "types": ["locality", "political", "geocode"]
    }
  ]
}
```

### 5. Distance Matrix API

#### Tính khoảng cách giữa các địa điểm
```http
POST /google-maps/distance-matrix
Content-Type: application/json

{
  "origins": ["40.7128,-74.0060"],
  "destinations": ["40.7589,-73.9851"],
  "mode": "driving"
}
```

**Response:**
```json
{
  "distances": [
    {
      "origin": "40.7128,-74.0060",
      "destination": "40.7589,-73.9851",
      "distance": "2.3 km",
      "duration": "8 mins"
    }
  ]
}
```

### 6. Place Details API

#### Lấy chi tiết địa điểm
```http
GET /google-maps/place-details/ChIJ...
```

**Response:**
```json
{
  "name": "Restaurant ABC",
  "formatted_address": "456 Oak St, New York, NY",
  "geometry": {
    "location": {
      "lat": 40.7130,
      "lng": -74.0050
    }
  },
  "types": ["restaurant", "food", "establishment"],
  "rating": 4.5,
  "user_ratings_total": 150,
  "website": "https://restaurant-abc.com",
  "formatted_phone_number": "+1 555-123-4567"
}
```

## Property-Specific APIs

### 1. Property Location API

#### Lấy thông tin vị trí bất động sản
```http
POST /google-maps/property-location
Content-Type: application/json

{
  "address": "123 Main St, New York, NY"
}
```

### 2. Property Nearby Places API

#### Tìm địa điểm lân cận cho bất động sản
```http
GET /google-maps/property/123/nearby-places?latitude=40.7128&longitude=-74.0060&radius=1000&type=restaurant
```

### 3. Property Nearby Schools API

#### Tìm trường học lân cận
```http
GET /google-maps/property/123/nearby-schools?latitude=40.7128&longitude=-74.0060&radius=2000
```

### 4. Property Nearby Hospitals API

#### Tìm bệnh viện lân cận
```http
GET /google-maps/property/123/nearby-hospitals?latitude=40.7128&longitude=-74.0060&radius=3000
```

### 5. Property Nearby Shopping API

#### Tìm trung tâm mua sắm lân cận
```http
GET /google-maps/property/123/nearby-shopping?latitude=40.7128&longitude=-74.0060&radius=2000
```

### 6. Property Nearby Restaurants API

#### Tìm nhà hàng lân cận
```http
GET /google-maps/property/123/nearby-restaurants?latitude=40.7128&longitude=-74.0060&radius=1500
```

### 7. Property Nearby Transport API

#### Tìm phương tiện công cộng lân cận
```http
GET /google-maps/property/123/nearby-transport?latitude=40.7128&longitude=-74.0060&radius=1000
```

### 8. Property Amenities API

#### Tìm tất cả tiện ích lân cận
```http
GET /google-maps/property/123/amenities?latitude=40.7128&longitude=-74.0060&radius=2000
```

## Các loại địa điểm được hỗ trợ

```typescript
enum PlaceType {
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
```

## Các chế độ di chuyển

```typescript
enum TravelMode {
  DRIVING = 'driving',
  WALKING = 'walking',
  BICYCLING = 'bicycling',
  TRANSIT = 'transit',
}
```

## Tích hợp với Property API

### Tự động geocoding khi tạo/cập nhật bất động sản

Khi tạo hoặc cập nhật bất động sản, hệ thống sẽ tự động:
1. Chuyển đổi địa chỉ thành tọa độ nếu chưa có
2. Điền thông tin thành phố, tiểu bang, quốc gia, mã bưu điện

```http
POST /property/create
Content-Type: application/json

{
  "title": "Beautiful House",
  "address": "123 Main St, New York, NY",
  "price": 500000,
  "bedrooms": 3,
  "bathrooms": 2
}
```

Hệ thống sẽ tự động thêm:
```json
{
  "latitude": 40.7128,
  "longitude": -74.0060,
  "city": "New York",
  "state": "NY",
  "country": "USA",
  "zipcode": "10001"
}
```

## Sử dụng trong Frontend

### 1. Tích hợp Google Maps JavaScript API
```html
<script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places"></script>
```

### 2. Autocomplete cho input địa chỉ
```javascript
const input = document.getElementById('address-input');
const autocomplete = new google.maps.places.Autocomplete(input, {
  types: ['address'],
  componentRestrictions: { country: 'VN' }
});

autocomplete.addListener('place_changed', function() {
  const place = autocomplete.getPlace();
  if (place.geometry) {
    document.getElementById('latitude').value = place.geometry.location.lat();
    document.getElementById('longitude').value = place.geometry.location.lng();
  }
});
```

### 3. Hiển thị bản đồ với marker
```javascript
const map = new google.maps.Map(document.getElementById('map'), {
  center: { lat: 40.7128, lng: -74.0060 },
  zoom: 15
});

const marker = new google.maps.Marker({
  position: { lat: 40.7128, lng: -74.0060 },
  map: map,
  title: 'Property Location'
});
```

## Lưu ý quan trọng

1. **API Quotas**: Google Maps API có giới hạn số lượng request. Theo dõi usage trong Google Cloud Console.

2. **Caching**: Nên cache kết quả geocoding để giảm API calls.

3. **Error Handling**: Luôn xử lý lỗi khi API không khả dụng.

4. **Rate Limiting**: Implement rate limiting để tránh vượt quá quota.

5. **Security**: Không expose API key trong frontend code.

## Troubleshooting

### Lỗi thường gặp:
1. **INVALID_REQUEST**: Kiểm tra format của request
2. **OVER_QUERY_LIMIT**: Đã vượt quá quota
3. **REQUEST_DENIED**: API key không hợp lệ hoặc chưa kích hoạt API
4. **ZERO_RESULTS**: Không tìm thấy kết quả

### Debug:
```javascript
// Kiểm tra response status
if (response.data.status !== 'OK') {
  console.error('Google Maps API Error:', response.data.status);
}
``` 