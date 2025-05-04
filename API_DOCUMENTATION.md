# CSE Fest 2025 API Documentation

## Base URL

- Production: `https://csefest.srejon.com`
- Local: `http://localhost:3000`

## Authentication

Currently, no authentication is required to access the API endpoints.

## Endpoints

### 1. Get Nearby Marathons

Returns a list of marathons near the specified location.

**Endpoint:** `GET /api/v1/marathon`

**Query Parameters:**

- `lat` (required): Latitude of the user's location
- `lon` (required): Longitude of the user's location

**Example Request:**

```bash
curl "https://csefest.srejon.com/api/v1/marathon?lat=23.8103&lon=90.4125"
```

**Example Response:**

```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Dhaka City Marathon 2025",
      "date": "2025-03-15",
      "location": "Dhaka University Campus",
      "distance": "10km",
      "coordinates": {
        "lat": 23.8103,
        "lon": 90.4125
      },
      "participants": [
        {
          "name": "Rahim Ali",
          "time": "45:30",
          "rank": 1,
          "age": 25,
          "gender": "Male",
          "category": "Professional",
          "nationality": "Bangladesh"
        }
      ],
      "registrationFee": 1000,
      "prizeMoney": 50000,
      "registrationDeadline": "2025-03-01",
      "categories": ["Professional", "Amateur", "Beginner"],
      "facilities": ["Water Stations", "Medical Support", "Timing Chip", "Medal", "T-Shirt", "Refreshments"],
      "route": {
        "startPoint": "Dhaka University Central Library",
        "endPoint": "Dhaka University Gymnasium",
        "checkpoints": ["Curzon Hall", "TSC", "Shahbagh"]
      }
    }
  ]
}
```

### 2. Get Nearby Gyms

Returns a list of gyms near the specified location.

**Endpoint:** `GET /api/v1/gyms`

**Query Parameters:**

- `lat` (required): Latitude of the user's location
- `lon` (required): Longitude of the user's location

**Example Request:**

```bash
curl "https://csefest.srejon.com/api/v1/gyms?lat=23.8103&lon=90.4125"
```

**Example Response:**

```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Power House Gym",
      "location": "Dhanmondi, Road 27",
      "rating": 4.5,
      "monthlyFee": 3000,
      "facilities": ["Cardio", "Weights", "Yoga", "Personal Training"],
      "coordinates": {
        "lat": 23.8103,
        "lon": 90.4125
      },
      "openingHours": "6:00 AM - 10:00 PM",
      "membershipTypes": ["Basic", "Premium", "Student"],
      "trainers": [
        {
          "name": "John Doe",
          "specialty": "Weight Training",
          "experience": "5 years"
        }
      ],
      "amenities": ["Parking", "Locker Room", "Shower Facilities", "WiFi"],
      "socialMedia": {
        "facebook": "https://facebook.com/powerhousegym",
        "instagram": "https://instagram.com/powerhousegym",
        "website": "https://powerhousegym.com"
      }
    }
  ]
}
```

### 3. Get Nearby Gym Buddies

Returns a list of potential gym buddies near the specified location.

**Endpoint:** `GET /api/v1/gymbros`

**Query Parameters:**

- `lat` (required): Latitude of the user's location
- `lon` (required): Longitude of the user's location

**Example Request:**

```bash
curl "https://csefest.srejon.com/api/v1/gymbros?lat=23.8103&lon=90.4125"
```

**Example Response:**

```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Shahriar Rahman",
      "age": 24,
      "experience": "3 years",
      "specialties": ["Weight Training", "Nutrition"],
      "availability": ["Morning", "Evening"],
      "coordinates": {
        "lat": 23.8103,
        "lon": 90.4125
      },
      "bio": "Passionate about fitness and helping others achieve their goals",
      "preferredGym": "Power House Gym",
      "fitnessGoals": ["Muscle Gain", "Strength"],
      "experienceLevel": "Intermediate",
      "achievements": [
        {
          "title": "Regional Powerlifting Champion",
          "date": "2023-12-15",
          "description": "Won first place in the regional powerlifting competition"
        }
      ],
      "socialMedia": {
        "instagram": "https://instagram.com/shahriar",
        "facebook": "https://facebook.com/shahriar",
        "linkedin": "https://linkedin.com/in/shahriar"
      },
      "languages": ["Bengali", "English"],
      "certifications": [
        {
          "name": "Advanced Personal Training",
          "issuer": "Fitness Academy",
          "year": 2023
        }
      ]
    }
  ]
}
```

## Error Responses

### 400 Bad Request

```json
{
  "error": "Latitude and longitude are required"
}
```

### 500 Internal Server Error

```json
{
  "success": false,
  "error": "Something went wrong!"
}
```

## Notes

- All coordinates are in decimal degrees format
- The API returns results within a 10km radius of the specified location
- All dates are in ISO 8601 format (YYYY-MM-DD)
- All times are in 24-hour format (HH:MM)
- Prices are in Bangladeshi Taka (BDT)
