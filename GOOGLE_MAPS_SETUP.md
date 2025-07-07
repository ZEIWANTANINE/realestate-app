# Google Maps API Setup Guide

## Cấu hình cần thiết

### 1. Tạo file .env

Tạo file `.env` trong thư mục gốc của dự án với nội dung:

```env
# Database Configuration
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=password
DB_DATABASE=realestate_db

# JWT Configuration
JWT_SECRET=your_jwt_secret_here
JWT_EXPIRES_IN=7d

# Google Maps API Configuration
GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here

# Server Configuration
PORT=3000
NODE_ENV=development
```

### 2. Lấy Google Maps API Key

1. Truy cập [Google Cloud Console](https://console.cloud.google.com/)
2. Tạo project mới hoặc chọn project có sẵn
3. Kích hoạt các API sau:
   - **Geocoding API**
   - **Places API**
   - **Distance Matrix API**
   - **Maps JavaScript API** (cho frontend)

4. Tạo API Key:
   - Vào "Credentials" > "Create Credentials" > "API Key"
   - Copy API key và thêm vào file `.env`

### 3. Cấu hình API Key (Tùy chọn)

Để bảo mật hơn, bạn có thể giới hạn API key:

1. **Application restrictions**: Chọn "HTTP referrers" và thêm domain của bạn
2. **API restrictions**: Chọn "Restrict key" và chỉ chọn các API cần thiết

### 4. Kiểm tra cấu hình

Sau khi cấu hình xong, chạy lệnh test:

```bash
# Test geocoding API
curl -X POST http://localhost:3000/google-maps/geocode \
  -H "Content-Type: application/json" \
  -d '{"address": "123 Main St, New York, NY"}'
```

### 5. Troubleshooting

#### Lỗi "GOOGLE_MAPS_API_KEY is required"
- Kiểm tra file `.env` có tồn tại không
- Kiểm tra biến `GOOGLE_MAPS_API_KEY` có được set đúng không

#### Lỗi "REQUEST_DENIED"
- Kiểm tra API key có hợp lệ không
- Kiểm tra các API đã được kích hoạt chưa
- Kiểm tra billing đã được enable chưa

#### Lỗi "OVER_QUERY_LIMIT"
- Kiểm tra quota usage trong Google Cloud Console
- Cân nhắc upgrade billing plan

### 6. Billing

Google Maps API có free tier:
- Geocoding: 2,500 requests/month
- Places: 28,500 requests/month
- Distance Matrix: 100,000 requests/month

Vượt quá free tier sẽ tính phí theo usage.

### 7. Production Deployment

Khi deploy lên production:

1. Sử dụng environment variables thay vì hardcode API key
2. Cấu hình API key restrictions cho domain production
3. Monitor API usage để tránh chi phí phát sinh
4. Implement caching để giảm API calls

### 8. Security Best Practices

1. **Không commit API key vào git**
2. **Sử dụng environment variables**
3. **Restrict API key theo domain**
4. **Monitor API usage**
5. **Implement rate limiting**
6. **Cache results khi có thể**

### 9. Testing

Sau khi setup xong, test các API:

```bash
# Test tất cả endpoints
npm run test:e2e

# Hoặc test từng endpoint
curl -X POST http://localhost:3000/google-maps/geocode \
  -H "Content-Type: application/json" \
  -d '{"address": "123 Main St, New York, NY"}'

curl -X POST http://localhost:3000/google-maps/reverse-geocode \
  -H "Content-Type: application/json" \
  -d '{"latitude": 40.7128, "longitude": -74.0060}'

curl "http://localhost:3000/google-maps/nearby-places?latitude=40.7128&longitude=-74.0060&radius=1000&type=restaurant"
``` 