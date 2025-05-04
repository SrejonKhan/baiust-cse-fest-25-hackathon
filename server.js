const express = require("express");
const cors = require("cors");
const { faker } = require("@faker-js/faker");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
const path = require("path");
const app = express();

// CORS configuration
const corsOptions = {
  origin: "*", // Allow all origins
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Allow all methods
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "Accept", "Origin"],
  credentials: true, // Allow credentials
  maxAge: 86400, // Cache preflight request for 24 hours
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

// Serve Swagger UI assets
const swaggerUiAssetPath = path.join(__dirname, "node_modules", "swagger-ui-dist");
app.use("/api-docs", express.static(swaggerUiAssetPath));

// Swagger UI setup
app.use("/api-docs", swaggerUi.serve);
app.get(
  "/api-docs",
  swaggerUi.setup(swaggerDocument, {
    explorer: true,
    customCss: ".swagger-ui .topbar { display: none }",
    customSiteTitle: "CSE Fest 2025 API Documentation",
    customfavIcon: "/favicon.ico",
    swaggerOptions: {
      persistAuthorization: true,
      docExpansion: "list",
      filter: true,
      showExtensions: true,
      showCommonExtensions: true,
      defaultModelsExpandDepth: 3,
      defaultModelExpandDepth: 3,
      displayRequestDuration: true,
      syntaxHighlight: {
        activate: true,
        theme: "monokai",
      },
    },
  })
);

// Fixed coordinates for consistent data
const FIXED_COORDINATES = [
  { lat: 23.8103, lon: 90.4125 }, // Dhaka University
  { lat: 23.7937, lon: 90.4066 }, // Dhanmondi
  { lat: 23.7467, lon: 90.3717 }, // Mirpur
  { lat: 23.8159, lon: 90.4255 }, // Shahbagh
  { lat: 23.75, lon: 90.3667 }, // Uttara
];

// Generate fixed mock data
const generateFixedMockData = () => {
  const marathons = [];
  const cities = ["Dhaka", "Chittagong", "Sylhet", "Rajshahi", "Khulna"];
  const marathonTypes = ["City", "Coastal", "Hill", "Heritage", "Charity"];
  const distances = [5, 10, 21, 42];

  FIXED_COORDINATES.forEach((coords, index) => {
    const city = cities[index % cities.length];
    const marathonType = marathonTypes[index % marathonTypes.length];
    const distance = distances[index % distances.length];

    marathons.push({
      id: index + 1,
      name: `${city} ${marathonType} Marathon 2025`,
      date: "2025-03-15",
      location: `${city} ${faker.location.streetAddress()}`,
      distance: `${distance}km`,
      coordinates: coords,
      participants: Array(5)
        .fill()
        .map((_, i) => ({
          name: faker.person.fullName(),
          time: `${45 + i}:${30 + i}`,
          rank: i + 1,
          age: 20 + i,
          gender: ["Male", "Female"][i % 2],
          category: ["Professional", "Amateur", "Beginner"][i % 3],
          nationality: "Bangladesh",
        })),
      registrationFee: 1000 + index * 100,
      prizeMoney: 50000 + index * 5000,
      registrationDeadline: "2025-03-01",
      categories: ["Professional", "Amateur", "Beginner"],
      facilities: ["Water Stations", "Medical Support", "Timing Chip", "Medal", "T-Shirt", "Refreshments"],
      route: {
        startPoint: faker.location.streetAddress(),
        endPoint: faker.location.streetAddress(),
        checkpoints: ["Checkpoint 1", "Checkpoint 2", "Checkpoint 3"],
      },
    });
  });

  return marathons;
};

// Generate fixed mock data once
const mockMarathons = generateFixedMockData();
const mockGyms = generateFixedMockData().map((marathon) => ({
  id: marathon.id,
  name: `Power House Gym ${marathon.id}`,
  location: marathon.location,
  rating: 4.0 + marathon.id * 0.1,
  monthlyFee: 2000 + marathon.id * 500,
  facilities: ["Cardio", "Weights", "Yoga", "Personal Training"],
  coordinates: marathon.coordinates,
  openingHours: "6:00 AM - 10:00 PM",
  membershipTypes: ["Basic", "Premium", "Student"],
  trainers: Array(3)
    .fill()
    .map((_, i) => ({
      name: faker.person.fullName(),
      specialty: ["Weight Training", "Cardio", "Yoga"][i],
      experience: `${i + 2} years`,
    })),
  amenities: ["Parking", "Locker Room", "Shower Facilities", "WiFi"],
  socialMedia: {
    facebook: "https://facebook.com/powerhousegym",
    instagram: "https://instagram.com/powerhousegym",
    website: "https://powerhousegym.com",
  },
}));

const mockGymBros = generateFixedMockData().map((marathon) => ({
  id: marathon.id,
  name: faker.person.fullName(),
  age: 20 + marathon.id,
  experience: `${marathon.id} years`,
  specialties: ["Weight Training", "Nutrition"],
  availability: ["Morning", "Evening"],
  coordinates: marathon.coordinates,
  bio: "Passionate about fitness and helping others achieve their goals",
  preferredGym: `Power House Gym ${marathon.id}`,
  fitnessGoals: ["Muscle Gain", "Strength"],
  experienceLevel: ["Beginner", "Intermediate", "Advanced"][marathon.id % 3],
  achievements: [
    {
      title: "Regional Powerlifting Champion",
      date: "2023-12-15",
      description: "Won first place in the regional powerlifting competition",
    },
  ],
  socialMedia: {
    instagram: "https://instagram.com/gymbro",
    facebook: "https://facebook.com/gymbro",
    linkedin: "https://linkedin.com/in/gymbro",
  },
  languages: ["Bengali", "English"],
  certifications: [
    {
      name: "Advanced Personal Training",
      issuer: "Fitness Academy",
      year: 2023,
    },
  ],
}));

// Helper function to calculate distance between two points
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth's radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// Helper function to filter by distance
function filterByDistance(items, userLat, userLon, maxDistance = 10) {
  return items.filter((item) => {
    const distance = calculateDistance(userLat, userLon, item.coordinates.lat, item.coordinates.lon);
    return distance <= maxDistance;
  });
}

// Endpoints
app.get("/api/v1/marathon", (req, res) => {
  const { lat, lon } = req.query;
  if (!lat || !lon) {
    return res.status(400).json({ error: "Latitude and longitude are required" });
  }

  const nearbyMarathons = filterByDistance(mockMarathons, parseFloat(lat), parseFloat(lon));
  res.json({
    success: true,
    data: nearbyMarathons,
  });
});

app.get("/api/v1/gyms", (req, res) => {
  const { lat, lon } = req.query;
  if (!lat || !lon) {
    return res.status(400).json({ error: "Latitude and longitude are required" });
  }

  const nearbyGyms = filterByDistance(mockGyms, parseFloat(lat), parseFloat(lon));
  res.json({
    success: true,
    data: nearbyGyms,
  });
});

app.get("/api/v1/gymbros", (req, res) => {
  const { lat, lon } = req.query;
  if (!lat || !lon) {
    return res.status(400).json({ error: "Latitude and longitude are required" });
  }

  const nearbyGymBros = filterByDistance(mockGymBros, parseFloat(lat), parseFloat(lon));
  res.json({
    success: true,
    data: nearbyGymBros,
  });
});

// Root endpoint
app.get("/", (req, res) => {
  const greetings = [
    "Hi! I'm Srejon Khan, core organizer of CSE Fest Hackathon! 👨‍💻",
    "Hey there! Srejon Khan here, ready to make this hackathon amazing! 🚀",
    "Hello! Srejon Khan at your service! Let's build something incredible! 💡",
    "Greetings! Srejon Khan here, your hackathon guide! 🌟",
    "Welcome! Srejon Khan here, let's make this hackathon unforgettable! 🎯",
    "Hey! Srejon Khan here, turning innovative ideas into reality! ⚡",
    "Hi there! Srejon Khan here, making hackathons accessible for everyone! 🎉",
    "Hello! Srejon Khan here, your partner in innovation! 💻",
    "Hey! Srejon Khan here, let's code the future together! 🖥️",
    "Greetings! Srejon Khan here, your hackathon motivation buddy! ⭐",
  ];

  const randomGreeting = faker.helpers.arrayElement(greetings);
  res.json({
    success: true,
    message: randomGreeting,
    timestamp: new Date().toISOString(),
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    error: "Something went wrong!",
  });
});

// For local development
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

// Export the Express API
module.exports = app;
